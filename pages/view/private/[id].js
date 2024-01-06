import css from "../room.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, useContext } from "react";
import { SocketContext } from '#context/SocketContext';
import { getTime } from '#utils/getTime';
import { getTimeDiff } from '#utils/getTimeDiff';
import Alert from '#components/modal/Alert';
import ImageModal from '#components/modal/ImageModal';

import imageCompression from "browser-image-compression";
import Loading from '#components/Loading'

export default function Room() {
  const {data: session} = useSession();
  const {socket, socketConnect, user_key, reload, setReload} = useContext(SocketContext);

  const router = useRouter()
  const message = useRef("");
  const messageScroll = useRef("");
  const imageUpload = useRef("");
  const isCreateUser = useRef()
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const [imageData, setImageData] = useState({
    isOpen:false,
    message:"",
  });
  const [setting, setSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  function enterChat(e){
    e.preventDefault();
    if(!session) {
      setAlertData({
        isAlert:true,
        message:<span>로그인 후 이용해주세요.</span>,
        cancel:<button onClick={()=>{ setAlertData({ isAlert:false }) }}>확인</button>
      })
      return false;
    }else if(message.current.value === "" && imageUpload.current.value === ""){
      return false;
    }else if((room.create_nickname === "" || room.target_nickname === "")){
      setAlertData({
        isAlert:true,
        message:<span>상대방이 퇴장했습니다. <br /> 메시지를 보낼 수 없습니다.</span>,
        cancel:<button onClick={()=>{ setAlertData({ isAlert:false }) }}>확인</button>
      })
      return false;
    }

    if(message.current.value !== "" || imageUpload.current.value !== ""){
      setMessageLoading(true);

      let data = {
        room_id : router.query.id,
        user_key : session.user.user_key,
        nickname : session.user.nickname,
        target_user_key : isCreateUser.current ? room.target_user_key : room.create_user_key,   
        target_nickname: isCreateUser.current ? room.target_nickname : room.create_nickname,
        create_user_key: isCreateUser.current ? room.create_user_key : room.target_user_key,
        create_nickname: isCreateUser.current ? room.create_nickname : room.target_nickname,
        isCreateUser: isCreateUser.current,
        text: message.current.value || "",
        image: uploadFile
      }

      if(typeof uploadFile?.base64Image1 === "string"){
        startImageUpload(data)

      }else{
        socket.emit("privateMessageSend", data);

      }
      message.current.value = '';
      imageUploadReset();
    }
  }
  const imageUploadHandler = async (e) => {
    setMessageLoading(true);

    if (!e.currentTarget.files[0]) {
      return;
    }
    let imageFile = e.currentTarget.files[0];
    let extension = imageFile.name.split(".");
    const extensionReg = /jpg|jpeg|png|gif|heif|heic/;

    if(!extensionReg.test(extension[extension.length-1].toLowerCase())){
      setAlertData({
        isAlert:true,
        message:<span>해당 파일 형식은 업로드 할 수 없습니다😭</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      imageUploadReset();
      setMessageLoading(false);

      return false;
    } else if(imageFile.size >= 5000000){
      setAlertData({
        isAlert:true,
        message:<span>죄송합니다, 5MB 이하 파일 업로드 가능합니다😭</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      imageUploadReset();
      setMessageLoading(false);

      return false;
    } else if (extension[extension.length-1].toLowerCase() === "heic" || extension[extension.length-1].toLowerCase() === "heif") {
      if (typeof window !== 'undefined') {
        const heic2any = require('heic2any');
        await heic2any({ blob: imageFile, toType : "image/jpeg" }).then( async function(resultBlob) {
          resultBlob.name = imageFile.name
          resultBlob.lastModified = imageFile.lastModified
          const options = {
            maxSizeMB: 1, // 용량 제한
            maxWidthOrHeight: 1000, // 가로세로 크기 제한
          };

          try {
            const compressedFile = await imageCompression(resultBlob, options);

            // blob에서 file로 변환
            const convert = new File([compressedFile], imageFile.name, {
              type: `${resultBlob.type}`,
            });

            const reader = new FileReader();
            reader.readAsDataURL(convert);
            reader.onloadend = () => {
              let writeData = reader.result.replace(/^data:image\/(png|jpg|jpeg|gif|application);base64,/, "");
              let base64Image1 = writeData.slice(0, Math.ceil(writeData.length / 2))
              let base64Image2 = writeData.slice(Math.ceil(writeData.length / 2))
    
              setPreviewFile(reader.result.toString());
              setUploadFile({
                base64Image1,
                base64Image2,
                extension: "." + extension[extension.length-1].toLowerCase()
              });
              setMessageLoading(false);
            };
          } catch (error) {
            console.log(error);
          }
        });
      }
      
    } else {
      const options = {
        maxSizeMB: 1, // 용량 제한
        maxWidthOrHeight: 1000, // 가로세로 크기 제한
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);
     
        // blob에서 file로 변환
        const convert = new File([compressedFile], "convert", {
          type: imageFile.type || 'image/jpeg',
        });

        const reader = new FileReader();
        reader.readAsDataURL(convert);
        reader.onloadend = () => {
          let writeData = reader.result.replace(/^data:image\/(png|jpg|jpeg|gif|application);base64,/, "");
          let base64Image1 = writeData.slice(0, Math.ceil(writeData.length / 2))
          let base64Image2 = writeData.slice(Math.ceil(writeData.length / 2))

          setPreviewFile(reader.result.toString());
          setUploadFile({
            base64Image1,
            base64Image2,
            extension: "." + extension[extension.length-1].toLowerCase()
          });
          setMessageLoading(false);
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
  function startImageUpload(data){
    fetch("/api/message?preview=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.image)
    })
    .then((response) => response.json())
    .then((res) => {

      if(res.status){
        data.image = res.data;
        socket.emit("privateMessageSend", data);
      }
    
    })
  }
  function imageUploadReset(){
    setPreviewFile(null);
    setUploadFile(null)
    imageUpload.current.value = "";
  }
  function deleteRoom(){
    setAlertData({
      isAlert:true,
      message:<span>현재 채팅방에서 나가시겠습니까?</span>,
      confirm:<button onClick={()=>{
        setIsLoading(true);
        let data = {
          room_id : router.query.id,
          nickname : session.user.nickname,
          user_key : session.user.user_key,
          target_nickname : isCreateUser.current ? room.target_nickname : room.create_nickname
        }
        socket.emit("deletePrivateRoom", data);
      }}>확인</button>,
      cancel:<button onClick={()=>{
        setAlertData({
          isAlert:false
        })
      }}>취소</button>
    })
  }

  function shareUrl(){
    navigator.clipboard.writeText(window.location.href).then(() => {
      /* clipboard successfully set */
      setAlertData({
        isAlert:true,
        message:<span>URL 이 복사되었습니다.</span>,
        confirm:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
         }}>확인</button>,
      })
    }, () => {
      /* clipboard write failed */
    });
  }

  function messageScrollUpdate(){
    if(messageScroll.current) messageScroll.current.scrollTop = messageScroll.current.scrollHeight
  }

  useEffect(() => {
    if(messageList.length) messageScrollUpdate();
  }, [messageList, messageScroll.current])

  useEffect(()=>{
    if(reload){
      setPrivateRoom()

    }
  }, [reload])

  
  function setPrivateRoom(){
    setIsLoading(true);

    let roomId = router.query.id;

    fetch("/api/room?privateRoom=" + roomId, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        let roomInfo = data.room;
        if(roomInfo.create_user_key === user_key || roomInfo.target_user_key === user_key ){
          if(roomInfo.create_nickname === "" && (roomInfo.create_user_key === session.user.user_key)){
            setAlertData({
              isAlert:true,
              message:<span>이미 퇴장하신 채팅방입니다. <br /> 다시 참여하시겠습니까?</span>,
              confirm:<button onClick={()=>{ 
                let reJoinData = {
                  nickname : session.user.nickname,
                  user_key : session.user.user_key,
                  target : "create",
                  room_id : roomId
                } 
                socket.emit("reJoinPrivateRoom", reJoinData);
                
              }}>확인</button>
            })

          } else if(roomInfo.target_nickname === "" && (roomInfo.target_user_key === session.user.user_key)){
            setAlertData({
              isAlert:true,
              message:<span>이미 퇴장하신 채팅방입니다. <br /> 다시 참여하시겠습니까?</span>,
              confirm:<button onClick={()=>{
                let reJoinData = {
                  nickname : session.user.nickname,
                  user_key : session.user.user_key,
                  target : "target",
                  room_id : roomId
                } 
                socket.emit("reJoinPrivateRoom", reJoinData);
               
              }}>확인</button>
            })
          } else {
            if(roomInfo.create_user_key === user_key ){
              isCreateUser.current = true
            } else {
              isCreateUser.current = false
            }

            socket.emit("joinPrivateRoom", roomId );
            socket.emit("updateLastCheck", roomInfo, user_key );
            setRoom(roomInfo);

            data.messageList.unshift({
              type:"notice",
              send_date:getTime({format:"YYYY/MM/DD", date:roomInfo.create_date})
            })
          
            for(let i = 1; i <= data.messageList.length; i++){
              if((new Date(getTime({format:"YYYY/MM/DD"})) - new Date(getTime({format:"YYYY/MM/DD", date: data.messageList[data.messageList.length - (1 * i)].send_date})) >= 86400000)){
                data.messageList.splice(data.messageList.length - (1 * i - 1), 0,{
                  type:"notice",
                  send_date:getTime({format:"YYYY/MM/DD"})
                })
                break;
              }
            }
            
            setMessageList(data.messageList);

            setIsLoading(false);
            setReload(false)
          }
          
          socket.on("reJoinPrivateRoom", (reJoinData)=>{

            if(reJoinData.target === "create"){
              roomInfo.create_nickname = reJoinData.nickname;
              isCreateUser.current = true;
            } else{
              roomInfo.target_nickname = reJoinData.nickname;
              isCreateUser.current = false;
            }

            if(reJoinData.user_key === session.user.user_key){

              socket.emit("joinPrivateRoom", roomId );
              socket.emit("updateLastCheck", roomInfo, user_key );
              setRoom(roomInfo);
              setIsLoading(false);
              setReload(false)

              data.messageList.unshift({
                type:"notice",
                send_date:getTime({format:"YYYY/MM/DD", date:roomInfo.create_date})
              })
            
              for(let i = 1; i <= data.messageList.length; i++){
                if((new Date(getTime({format:"YYYY/MM/DD"})) - new Date(getTime({format:"YYYY/MM/DD", date :data.messageList[data.messageList.length - (1 * i)].send_date })) >= 86400000)){
                  data.messageList.splice(data.messageList.length - (1 * i - 1), 0,{
                    type:"notice",
                    send_date:getTime({format:"YYYY/MM/DD"})
                  })
                  break;
                }
              }

              data.messageList.push({
                type:"notice",
                text:reJoinData.nickname + "님 등장😎"
              })
      
              setMessageList(data.messageList);
              setAlertData({ isAlert:false })
            } else {
              setRoom(roomInfo);
              reJoinData.messageList.push({
                type:"notice",
                text:reJoinData.nickname + "님 등장😎"
              })
              setMessageList(reJoinData.messageList);
              setReload(false)

            }
          })

        } else {
          setIsLoading(false);
          setReload(false)

          setAlertData({
            isAlert:true,
            message:<span>채팅방에 참여한 사용자가 아닙니다.</span>,
            cancel:<button onClick={()=>{ 
              router.push('/'),
              window.close()
            }}>확인</button>
          })
        }
      } else {
        setIsLoading(false);
        setReload(false)

        setAlertData({
          isAlert:true,
          message:<span>{data.message}</span>,
          cancel:<button onClick={()=>{ 
            router.push('/'),
            window.close()
          }}>확인</button>
        })               
      }
    });
  }

  useEffect(()=>{ 
    if(router.isReady && socketConnect){
      if(user_key){
        setPrivateRoom()
  
        socket.on("deletePrivateRoom", (data) => {
          setIsLoading(false);

          if(data.nickname === session?.user.nickname) window.close();
        
          if(data.create_nickname === session.user.nickname){
            data.create_nickname = "";
          }else{
            data.target_nickname = "";
          }
          setRoom(data)
        })
  
        socket.on("privateMessage", message => {
          setMessageLoading(false);
          socket.emit("updateMessageCheck", message, user_key );
          setMessageList((previousMessages) => [...previousMessages, message]);
        })
  
        socket.on('createPrivateRoomResult', data => {
          if(!data.status) window.close();
        })
      }else if(!session){
        setIsLoading(false);

        setAlertData({
          isAlert:true,
          message:<span>로그인 후 이용 가능합니다.</span>,
          cancel:<button onClick={()=>{ 
            router.push('/'),
            window.close()
          }}>확인</button>
        })
      }
      
    }
  }, [router, socketConnect, user_key])

  return (
    <>
      <div className={css.room}>
        <div className={css.inner}>
          <div className={css.chat_wrap}>
            <button onClick={()=>{ window.close() }} className={css.close}></button>
            
            <div id="te" className={css.chat_list} ref={messageScroll}>

            {messageList.length && ( !isLoading)  ?
              messageList.map((item) => {
                return (
                  item.type==="notice" ? 
                  <div key={item.send_date} className={css.notice}>
                    {item.text ? item.text : item.send_date}
                  </div>
                  :
                  <div key={item.send_date + Math.random()} className={css.message_box}>
                    <span className={css.user_nickname}>
                      {item?.nickname || ""}
                    </span>
                    <div className={css.message_text}>
                      <div className={css.message}>
                        {item.image && <img onClick={()=>{
                          setImageData({
                            isOpen:true,
                            message:<img src={window.location.origin + process.env.NEXT_PUBLIC_PATH + item.image} alt=""/>
                          })
                        }} src={window.location.origin + process.env.NEXT_PUBLIC_PATH + item.image} alt=""/>}
                        <span>{item.text}</span>
                      </div>
                      <span className={css.date}>
                        {getTimeDiff(item.send_date).text}
                      </span>
                    </div>
                  </div>
                );
              })
              : <Loading /> }
              {(room.create_nickname === "" || room.target_nickname === "") && <div className={css.notice}>
                상대방이 퇴장했습니다.
              </div>}
            </div>
            <div className={css.send_message}>
              <form>
                <input type="text" ref={message} maxLength={200} placeholder="새 메시지" />
                {!messageLoading ? <button onClick={(e) => {
                  enterChat(e);
                }}
                ></button>: <Loading /> }
              </form>

              <div className={css.util}>
                <div className={css.left_area}>
                  <label className={css.image_upload}>
                    <span>사진</span>
                    <input ref={imageUpload} onChange={imageUploadHandler} type="file" multiple="" accept="image/*, .heic, .heif" />
                  </label>
                  
                  {
                    previewFile && 
                    <div className={css.preview} onClick={()=>{
                      imageUploadReset();
                    }}>
                      <img src={previewFile} alt="" />
                      <button className={css.delete}></button>
                    </div>
                  }
                </div>
                
                <div className={css.right_area}>
                  <div className={css.setting}>
                    <button  onClick={()=> setSetting(!setting)}></button>
                    {setting && <div className={css.setting_box}>
                      <button onClick={()=>{shareUrl()}} className={css.share_url}>URL공유</button> 
                      <button onClick={()=>{deleteRoom()}} className={css.room_delete}>나가기</button>
                    </div>}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {alertData.isAlert && (
        <Alert
          props={{
            message: <span>{alertData.message}</span>,
            confirm: alertData.confirm,
            cancel: alertData.cancel,
          }}
        />
      )}

      {imageData.isOpen && (
        <ImageModal props={{message: imageData.message, setImageData }} />
      )}
    </>
  );
}
