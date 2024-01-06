import css from './ChatArea.module.scss';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef, useContext} from 'react';
import { useRouter } from 'next/router';
import { SocketContext } from '#context/SocketContext';
import { openWindow } from '#utils/openwindow';
import Alert from '#components/modal/Alert';
import Loading from '#components/Loading'

export default function ChatArea({style}) {
  const {data: session} = useSession();
  const {socket, socketConnect, chatArea, setChatArea} = useContext(SocketContext);
  const router = useRouter();
  const [messageList, setMessageList] = useState([]);
  const [userInfo, setUserInfo] = useState(false);

  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });

  const [area, setArea] = useState(true)
  
  const message = useRef('');
  const messageScroll = useRef('');

  function enterChat(e){
    e.preventDefault();
    if(!session) {
      router.push('/auth/signin')
      return false;
    }
    
    if(!(message.current.value === '')){
      let data = {
        message : message.current.value,
        nickname : session?.user.nickname,
        user_key : session.user.user_key
      }

      socket.emit("lobbyMessage", data)

      message.current.value = '';
    }
  }

  function createPrivateRoom(target){
    if(!session?.user.user_key) {
      router.push("/auth/signin")
      return false;
    } else if(!target.user_key || !target.nickname ){
      setAlertData({
        isAlert:true,
        message:<span>해당 유저와는 대화 할 수 없습니다.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    }

    let data = {
      user_key : session.user.user_key,
      nickname : session.user.nickname,
      target_user_key : target.user_key,
      target_nickname : target.nickname
    }

    socket.emit("createPrivateRoom", data);
  }

  function messageScrollUpdate(){
    if(messageScroll.current) messageScroll.current.scrollTop = messageScroll.current.scrollHeight
  }

  useEffect(() => {
    if(messageList.length) {
      messageScrollUpdate();
      sessionStorage.setItem('messageList', JSON.stringify(messageList));
    }
  }, [messageList, messageScroll.current])

  useEffect(() => {
    if(socketConnect){

      let list = JSON.parse(sessionStorage.getItem('messageList'));
      if(list) setMessageList(list);
  
      socket.on('getLobbyMessage', message => {
        setMessageList((previousMessages) => [...previousMessages, message]);
      })

      socket.on('createPrivateRoomResult', data => {
        if(data.message){
          setAlertData({
            isAlert:true,
            message:<span>{data.message}</span>,
            cancel:<button onClick={()=>{
              setAlertData({
                isAlert:false
              })
            }}>확인</button>
          })
        }else{
          openWindow('/room/private/' + data.room_id)
        }
        
      })

      socket.on('openPrivateRoom', data => {
        openWindow('/room/private/' + data.room_id)
      })
    }

    if(window.innerWidth <= 950){
      setChatArea(false);
    }

  }, [socketConnect])

  return (
    (chatArea) &&
    <div className={css.wrap} >
      <div className={css.inner}>
        <div className={css.chat_wrap}>
          
          <div className={css.chat_notice}>
            {socketConnect 
            ? `채팅서버에 연결되었습니다!`
            : <div className={css.loading}>
                <Loading shape={{width:"20px",height:"20px",border:"2px dashed #7c25df"}} />
              </div>}
          </div> 
          
          <button onClick={()=>{ setChatArea(!chatArea) }} className={css.close}></button>

          <div className={css.chat_list} ref={messageScroll}>
            {messageList.map((item) => {
              return (
                <div className={css.message_box} key={(new Date(item.send_date) + Math.random()).toString(36)} >
                  <div className={css.user_nickname} onClick={(e)=>{ 
                    if(userInfo === item || item.nickname === session?.user.nickname){
                      setUserInfo(false);
                    }else{
                      setUserInfo(item);
                    }
                    }}>
                    <span>{item?.nickname || ""}</span>
                    {userInfo === item && <div className={css.user_info}>
                      <button onClick={()=>{ 
                        createPrivateRoom({
                          user_key : item.user_key,
                          nickname : item.nickname
                        });
                         
                      }}>채팅하기</button> 
                    </div>}
                  </div>
                  <span className={css.message_text}>{item.message}</span>
                </div>
              );
            })}
          </div>
          <div className={css.input}>
            <form>
              <input type="text" ref={message} maxLength={100} placeholder='새 메시지 입력' />
              <button className={css.send} onClick={(e) => {
                enterChat(e);
              }}>입력</button>
            </form>
            {/* <div>
              <button className={css.setting} onClick={(e) => { }}></button>
            </div> */}
          </div>
        </div>
      </div>
          
      {alertData.isAlert && <Alert
        props={{
          message: <span>{alertData.message}</span>,
          confirm: alertData.confirm,
          cancel: alertData.cancel,
        }}
      />}

    </div> 
    
  );
}