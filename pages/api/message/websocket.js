import { executeQuery } from '#database/index';
import { Server } from "socket.io";
import { getTime } from '#utils/getTime';
import { randomUUID } from "#utils/randomUUID";
const fs = require('fs');
import UAParser from "ua-parser-js";
let todayImageFolder = false;

const SocketHandler = (req, res) => {

  if(res.socket.server.io){
    const userInfo = UAParser(req.headers["user-agent"]);
    const ip = req.clientIp;
    console.log("Socket is already running", ip, userInfo.os, userInfo.browser, userInfo.device);
  } else {
    const userInfo = UAParser(req.headers["user-agent"]);
    const ip = req.clientIp;
    console.log("Socket is conncet :", ip, userInfo.os, userInfo.browser, userInfo.device);
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    
    io.of(req.query.namespace).on('connection', socket => {
      const count = io.of("/").sockets.size;
      console.log("count :", count)
      io.of(req.query.namespace).emit('count', count);

      socket.on('privateConnect', function(user_key){
        socket.join(user_key);

      })

      socket.on('joinRoom', async function(roomId){
        socket.join(roomId);

        await executeQuery("SELECT * FROM room WHERE room_id = ?", [roomId]).then((resultRoomInfo) => {
          io.to(roomId).emit('roomInfo', resultRoomInfo[0]);
        })
      })

      socket.on('joinPrivateRoom', function(roomId){
        socket.join(roomId);
      })

      socket.on('reJoinPrivateRoom', async function(data){
        await executeQuery("SELECT count(*) count FROM private_room WHERE create_nickname = ? OR target_nickname = ? ",
        [data.nickname, data.nickname]).then( async (result)=>{
          if(result[0].count < 5){
            if(data.target === "target"){
              await executeQuery("UPDATE private_room SET target_nickname = ? WHERE room_id = ?", [data.nickname, data.room_id]).then(async function(result){
                if(typeof result.affectedRows === "number"){
                  await executeQuery("SELECT * FROM private_message WHERE room_id = ?", [data.room_id]).then((list)=>{
                    socket.join(data.room_id);
                    data.messageList = list
                    io.to(data.room_id).emit("reJoinPrivateRoom", data)
                  })
                }
              })
            } else {
              await executeQuery("UPDATE private_room SET create_nickname = ? WHERE room_id = ?", [data.nickname, data.room_id]).then(async function(result){
                if(typeof result.affectedRows === "number"){
                  await executeQuery("SELECT * FROM private_message WHERE room_id = ?", [data.room_id]).then((list)=>{
                    socket.join(data.room_id);
                    data.messageList = list
                    io.to(data.room_id).emit("reJoinPrivateRoom", data)
                  })
                }
              })
            }
            
          } else {
            io.to(data.user_key).emit("createPrivateRoomResult", {
              status:false,
              message : "[⚠️1:1 채팅방 개설 오류] 1:1 채팅방 참여 개수(5) 를 초과하였습니다."
            });
          }
        })
      })

      socket.on('deleteRoom', async function(data){
        await executeQuery("SELECT * FROM room WHERE room_id = ?", [data.roomId]).then( async(result) => {
          if(result[0].create_user_key === data.user_key ){
            await executeQuery("DELETE FROM room, message USING room INNER JOIN message ON room.room_id = message.room_id WHERE room.room_id = ?", [result[0].room_id]).then( async (deleteResult)=>{
              if(deleteResult.affectedRows){
                io.to(data.roomId).emit('deleteRoom', result);
              }
            })
        
          } else {
            io.to(data.nickname).emit('deleteRoom', {
              user_key : data.user_key,
              message:"삭제 권한이 없습니다."
            });
          }
        })
      })

      socket.on('deletePrivateRoom', async function(data){
        await executeQuery("UPDATE private_room SET create_nickname = REPLACE(create_nickname, ?, ''), target_nickname = REPLACE(target_nickname, ?, '') WHERE room_id = ?", [data.nickname, data.nickname, data.room_id]).then(async function(result){
          if(typeof result.affectedRows === "number"){
            io.to(data.room_id).emit('deletePrivateRoom', data);
            io.to(data.user_key).emit('deletePrivateRoom', data);

            await executeQuery("SELECT room_id, create_nickname, target_nickname FROM private_room WHERE room_id = ?", [data.room_id]).then( async function(result){
              if(result[0].create_nickname === "" && result[0].target_nickname === ""){
                await executeQuery("DELETE FROM private_room, private_message USING private_room INNER JOIN private_message ON private_room.room_id = private_message.room_id WHERE private_room.room_id = ?", [result[0].room_id]).then(()=>{
                  console.log("[private data delete complete when room_id] =", result[0].room_id)
                })
              }
            })
          }
        })
      })

      socket.on('lobbyMessage', async function(data){
        data.send_date = getTime();

        io.of(req.query.namespace).emit('getLobbyMessage', data);
      })

      socket.on("roomMessageSend", async function(data){
        if(!data.image && !data.text) return false;
        data.send_date = getTime();

        await executeQuery('INSERT INTO message(room_id, nickname, user_key, text, image, send_date) values (?, ?, ?, ?, ?, ?)', 
        [data.room_id, data.nickname, data.user_key, data.text, data.image, data.send_date]).then(async function(result){
          if(result.affectedRows){
            io.to(data.room_id).emit('roomMessage', data);
          }
        })
      })

      socket.on("privateMessageSend", async function(data){
        if(!data.image && !data.text) return false;
        data.send_date = getTime();
        await executeQuery('INSERT INTO private_message(room_id, nickname, user_key, text, image, send_date) values (?, ?, ?, ?, ?, ?)', 
        [data.room_id, data.nickname, data.user_key, data.text, data.image, data.send_date]
        ).then(async function(result){
          if(result.affectedRows){
            if(data.isCreateUser){
              await executeQuery('UPDATE private_room SET last_date=?, last_nickname=?, last_text=?, last_create_user =? WHERE room_id=?', 
              [data.send_date, data.nickname, data.text, data.send_date, data.room_id]).then(function(result){
                if(result.affectedRows){

                  io.to(data.room_id).emit('privateMessage', data);
                  io.to(data.target_user_key).emit("updateNewMessage", {
                    data,
                    user_key : data.user_key
                  });
                  io.to(data.user_key).emit("updateNewMessage", {
                    data,
                    user_key : data.user_key
                  });
                }
              })
            }else{
              await executeQuery('UPDATE private_room SET last_date=?, last_nickname=?, last_text=?, last_target_user =? WHERE room_id=?', 
              [data.send_date, data.nickname, data.text, data.send_date, data.room_id]).then(function(result){
                if(result.affectedRows){
                  io.to(data.room_id).emit('privateMessage', data);
                  io.to(data.target_user_key).emit("updateNewMessage", {
                    data,
                    user_key : data.user_key
                  });
                  io.to(data.user_key).emit("updateNewMessage", {
                    data,
                    user_key : data.user_key
                  });

                }
              })
            }
          }
        })
      })
            
      socket.on("updateLastCheck", async function(roomInfo, user_key){
        let date = getTime();
        
        if(roomInfo.create_user_key === user_key){
          await executeQuery("UPDATE private_room SET last_create_user = ? WHERE room_id = ?", [date, roomInfo.room_id]).then(()=>{
            io.to(user_key).emit("updateNewMessage", {
              data : roomInfo,
              user_key
            })
          })

        }else{
          await executeQuery("UPDATE private_room SET last_target_user = ? WHERE room_id = ?", [date, roomInfo.room_id]).then(()=>{
            io.to(user_key).emit("updateNewMessage", {
              data : roomInfo,
              user_key
            })
          })
        }
      })
      
      socket.on("updateMessageCheck", async function(message, user_key){
        let date = getTime();
        
        if(message.isCreateUser){
          await executeQuery("UPDATE private_room SET last_create_user = ? WHERE room_id = ?", [date, message.room_id]).then(()=>{
            io.to(user_key).emit("updateNewMessage", {
              data : message,
              user_key
            })
          })

        }else{
          await executeQuery("UPDATE private_room SET last_target_user = ? WHERE room_id = ?", [date, message.room_id]).then(()=>{
            io.to(user_key).emit("updateNewMessage", {
              data : message,
              user_key
            })
          })
        }
      })

      socket.on('createPrivateRoom', async function(data){
        await executeQuery("SELECT * FROM private_room WHERE (create_user_key = ? AND target_user_key = ?) OR (create_user_key = ? AND target_user_key = ?)",
        [data.user_key, data.target_user_key, data.target_user_key, data.user_key]).then( async (result)=>{
          
          if(!result[0]){
            await executeQuery("SELECT count(*) count FROM private_room WHERE create_nickname = ? OR target_nickname = ? ",
            [data.nickname, data.nickname]).then( async (result)=>{
              if(result[0].count < 5){
                const roomId = randomUUID(5);
                data.room_id = roomId;
                let date = getTime();
                await executeQuery(
                  "INSERT INTO private_room (room_id, create_user_key, create_nickname, target_user_key, target_nickname, last_nickname, last_text, create_date, last_date, last_create_user) values (?,?,?,?,?,?,?,?,?,?)",
                  [roomId, data.user_key, data.nickname, data.target_user_key, data.target_nickname, data.nickname, "채팅방이 생성되었습니다.", date, date, date]).then((result)=>{
                  if(result.insertId){
                    console.log("[개인채팅 생성(로비)] : ", data)
                    io.to(data.user_key).emit("createPrivateRoomResult", data);
                  } else {
                    console.log("[개인채팅 생성(로비) 실패]", result)
                  }
    
                }, function(err){
                  res.send(err);
                });
              } else {
                io.to(data.user_key).emit("createPrivateRoomResult", {
                  status:false,
                  message : "[⚠️]참여중인 1:1 대화방이 (5)개 이상입니다. 대화를 먼저 걸 수 없습니다."
                });
              }
            })
          } else {
            io.to(data.user_key).emit("openPrivateRoom", result[0]);
          }
        })
      })

      socket.on('fromRoomCreatePrivateRoom', async function(data){
        await executeQuery("SELECT * FROM private_room WHERE (create_user_key = ? AND target_user_key = ?) OR (create_user_key = ? AND target_user_key = ?)",
        [data.user_key, data.target_user_key, data.target_user_key, data.user_key]).then( async (result)=>{
          
          if(!result[0]){
            await executeQuery("SELECT count(*) count FROM private_room WHERE create_nickname = ? OR target_nickname = ? ",
            [data.nickname, data.nickname]).then( async (result)=>{
              if(result[0].count < 5){
                const roomId = randomUUID(5);
                data.room_id = roomId;
                let date = getTime();
                await executeQuery(
                  "INSERT INTO private_room (room_id, create_user_key, create_nickname, target_user_key, target_nickname, last_nickname, last_text, create_date, last_date, last_create_user) values (?,?,?,?,?,?,?,?,?,?)",
                  [roomId, data.user_key, data.nickname, data.target_user_key, data.target_nickname, data.nickname, "채팅방이 생성되었습니다.", date, date, date]).then((result)=>{
                  if(result.insertId){
                    console.log("[개인채팅 생성(룸)] : ", data)

                    io.to(data.user_key).emit("fromRoomCreatePrivateRoomResult", data);
                  } else {
                    console.log("[개인채팅 생성 실패 (룸)] : ", result)
                  }
    
                }, function(err){
                  res.send(err);
                });
              } else {
                io.to(data.user_key).emit("fromRoomCreatePrivateRoomResult", {
                  status:false,
                  message : "[⚠️]참여중인 1:1 대화방이 (5)개 이상입니다. 대화를 먼저 걸 수 없습니다."
                });
              }
            })
          } else {
            io.to(data.user_key).emit("fromRoomOpenPrivateRoom", result[0]);
          }
        })
      })

      // socket.on('getPrivateMessageList', async function(roomId, user_key){
      //   await executeQuery("SELECT * FROM private_message WHERE room_id = ?", [roomId]).then((list)=>{
      //     io.to(user_key).emit('privateMessageList', list);
      //   })
      // })

      // socket.on("disconnect", function(){
      //   for (var [key, value] of io.sockets.adapter.rooms) {
      //     // console.log(io.sockets.adapter.rooms, key, value, "disconnect")
      //     // console.log(key, value, "disconnect")

      //     // socket.leave(key)
      //   }
      // })

              // if(!io.sockets.adapter.rooms.has(user_key)){
        //   socket.join(user_key)
          
        // }else{

        //   // for (var [key, value] of io.sockets.adapter.rooms) {
        //   //   if(key === user_key){
        //   //     socket.id = value.values().next().value
        //   //   }else{
  
        //   //     console.log(value.values().next().value)

        //   //   }
        //   // }
        // }
 
    });
  }
  res.send(200)

}

export default SocketHandler;
