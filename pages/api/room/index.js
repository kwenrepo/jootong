import { executeQuery } from '#database/index';
import { randomUUID } from "#utils/randomUUID";
import { getTime } from "#utils/getTime";

export default async function handler(req, res) {
  if(req.method === "GET"){
    if(req.query.page === "allCount"){
      let totalCount = await getRoomCountTotal();
      res.send({
        status:true,
        count:totalCount,
        message:"방 전체 개수 : " + data[0].count
      });
    } else if(req.query.page === "all"){
      await executeQuery("SELECT * FROM room ORDER BY create_date DESC", []).then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"방 전체 조회 : " + data.length
        });
      }, function(err){
        res.send(err);
      });
    } else if(req.query.search){
      console.log("[방 검색] : ", req.query.search)

      let query = "%" + req.query.search + "%";
      await executeQuery("SELECT * FROM room WHERE title LIKE ? ORDER BY create_date DESC", [query] ).then((data)=>{
        res.send({
          status:true,
          data,
          message:"게시방 검색 성공"
        });
      })
    } else if (req.query.room){
      console.log("[방 조회] : ", req.query.room)

      await executeQuery("SELECT * FROM message WHERE room_id = ?", [ req.query.room ]).then( async (list)=>{
        if(list[0]){
          res.send({
            status:true,
            messageList : list,
            message:"채팅방 방 조회 성공"
          });
        }else{
          res.send({
            status:false,
            message:"존재하지 않는 방입니다."
          });
        }
       
      })
    } else if(req.query.privateRoomUserKey){
      await executeQuery("SELECT * FROM private_room WHERE create_user_key = ? OR target_user_key = ? ORDER BY create_date DESC", [req.query.privateRoomUserKey, req.query.privateRoomUserKey]).then((data)=>{
        res.send({
          status:true,
          data,
          message:"private 방 조회 성공"
        });
      })
    } else if(req.query.privateRoom){
      await executeQuery("SELECT * FROM private_room WHERE room_id = ?", [ req.query.privateRoom ]).then( async (room)=>{
        if(room[0]){
          await executeQuery("SELECT * FROM private_message WHERE room_id = ?", [req.query.privateRoom]).then((list)=>{
            res.send({
              status:true,
              room : room[0],
              messageList : list,
              message:"private 방 검색 성공"
            });
          })
          
        }else{
          res.send({
            status:false,
            message:"존재하지 않는 방입니다."
          });
        }
       
      })
    } else {
      let totalCount = await getRoomCountTotal();
      let totalPage = Math.ceil( totalCount / req.query.viewCount );
      let offset =  (Number(req.query.page) * Number(req.query.viewCount)) - Number(req.query.viewCount);

      await executeQuery("SELECT * FROM room ORDER BY idx DESC LIMIT ?, ?", [offset, 10] ).then((data)=>{
        res.send({
          status:true,
          data:{
            list : data,
            totalCount,
            totalPage
          },
          message:"방 조회 offset:" + offset
        });
      })
    }
   
  } else if (req.method === "POST"){

    if(req.query.type === "private"){
      const roomId = randomUUID(5);
      const date = getTime();
      console.log("[create private room 시도]", req.body)

      await executeQuery("SELECT user_key, nickname FROM user WHERE nickname = ?", [req.body.target] ).then( async (key)=>{
        if(key[0].user_key){
          await executeQuery(
            "INSERT INTO private_room (room_id, create_user, create_nickname, target_user, target_nickname, create_date, last_date, last_nickname, last_text) values (?,?,?,?,?,?,?,?,?)",
            [roomId, req.body.key, req.body.nickname, key[0].user_key, key[0].nickname, date, date, req.body.nickname, req.body.text]).then((data)=>{
            if(data.insertId){
              res.send({
                status:true,
                data:{
                  roomId
                },
                message:"방생성 성공"
              });
            } else {
              res.send({
                status:false,
                message:"방생성 실패"
              });
            }
          }, function(err){
            res.send(err);
          });
        }
      })
      
    }else{
      console.log("[방 생성", req.body)
      const roomId = randomUUID(5);
      const date = getTime();
      await executeQuery(
        "INSERT INTO room (room_id, title, create_user_key, create_nickname, create_date) values (?,?,?,?,?)",
        [roomId, req.body.title, req.body.user_key, req.body.create_nickname, date]).then(async (data)=>{
        if(data.insertId){
          await executeQuery('INSERT INTO message(room_id, nickname, user_key, text, send_date) values (?, ?, ?, ?, ?)',
           [roomId, req.body.create_nickname, req.body.user_key, req.body.title, date]).then(async function(result){
            if(result.affectedRows){
              res.send({
                status:true,
                data:{
                  title:req.body.title,
                  roomId
                },
                message:"방생성 성공"
              });
            }
          })

        } else {
          res.send({
            status:false,
            message:"방생성 실패"
          });
        }
      }, function(err){
        res.send(err);
      });
    }
  }
}

async function getRoomCountTotal(){
  return await executeQuery("SELECT COUNT(*) count FROM room", []).then((data)=>{
    return data[0].count
  }, function(err){
    return err
  });
}