import css from './admin.module.scss'
import Header from '@components/Header';
import {useState, useEffect, useRef, useContext} from "react"
import { useSession, signIn, getSession } from "next-auth/react"
import { useRecoilValue } from 'recoil';
import { user } from "@recoilStore/index";
import { useRouter } from 'next/router';
import Alert from '@components/modal/Alert';
import { getDateDiff } from '@utils/index';
import { openWindow } from '@utils/openwindow'

export default function admy(){
  const getUser:GetUser = useRecoilValue(user);
  const router = useRouter();
  const [alertData, setAlertData] = useState<Alert>();
  const [totalMember, setTotalMember] = useState(0);
  const [totalRoomList, setTotalRoomList] = useState([]);
  const [totalMessage, setTotalMessage] = useState([]);
  const [supportList, setSupportList] = useState([]);
  const [count, setCount] = useState(1);
  const answer = useRef({
    title:"",
    content: "",
    idx:""
  })
  const admin = useRef({
    email:"",
    password: "",
    nickname:""
  })
  const register = useRef({
    email:"",
    password: ""
  })
  const [isLogin, setIsLogin] = useState(false)
  const [isCreateAnswer, setIsCreateAnswer] = useState(false)

  const adminRegister = function(e){
    e.preventDefault();
    if(register.current.password){
      let data = {
        email : register.current.email,
        password: register.current.password,
      }
  
      fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(async (data) => {
        if(data.status){
          setAlertData({
            isAlert:true,
            message:<span>admin register complete</span>,
            confirm:<button onClick={()=>{
              setAlertData({
                isAlert:false
              })
            }}>확인</button>
          })
          
        } else {
  
          setAlertData({
            isAlert:true,
            message:<span>[{data.message}] </span>,
            confirm:<button onClick={()=>{
              setAlertData({
                isAlert:false
              })
            }}>확인</button>
          })
        }
      });
    }
  }

  const adminLogin = function(e){
    e.preventDefault();
    signIn('credentials', {
      email: admin.current.email,
      password: admin.current.password,
      callbackUrl: window.location.href,
      redirect: false
    }).then( async ({ ok, error }) => {
      const session = await getSession();

      if (ok && session) {
        setIsLogin(true);
        getTotalMember();
        getTotalRoomList();
        getTotalMessage();
        getSupportList();
      } else {
        console.log("error :", error )
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  function answerConfirm(){
    if(answer.current.content === ""){
      setAlertData({
        isAlert:true,
        message:<span>답변 내용을 입력 해주세요.</span>,
        confirm:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })

      return false;
    }
    console.log(answer.current)
    fetch("/api/support", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer.current)
    })
    .then((response) => response.json())
    .then(async (data) => {
      if(data.status){
        let list = supportList
        for(let i = 0; i< list.length; i++){
          if(list[i].idx === answer.current.idx){
            console.log("support data", list[i], answer)

            list[i].answer = answer.current.content;
          }
        }
        setSupportList(list);
        setAlertData({
          isAlert:true,
          message:<span>답변이 완료 되었습니다.</span>,
          confirm:<button onClick={()=>{
            setAlertData({
              isAlert:false
            })
            answer.current.title = ""
            setIsCreateAnswer(false)
          }}>확인</button>
        })
      }
    });
  }

  function setNewNickname(){
    if(admin.current.nickname === "") return false;

    let data = {
      newNickname : admin.current.nickname,
      nickname : getUser.nickname,
      user_key: getUser.user_key,
    }

    fetch("/api/user?target=nickname", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data)
      if(data.status){
        getUser.nickname = data.nickname;

        setAlertData({
          isAlert:true,
          message:<span>닉네임 [{data.nickname}] 으로 변경 되었습니다.</span>,
          confirm:<button onClick={()=>{
            setAlertData({
              isAlert:false
            })
          }}>확인</button>
        })
        
      } else {

        setAlertData({
          isAlert:true,
          message:<span>[{data.message}] </span>,
          confirm:<button onClick={()=>{
            setAlertData({
              isAlert:false
            })
          }}>확인</button>
        })
      }
      
    });
  }

  function getTotalMember(){
    fetch("/api/user", {
      method: "GET",
    })
    .then((response) => response.json())
    .then(async (data) => {
      if(data.status){
        console.log("getTotalMember", data)
        setTotalMember(data.data)
      }
    });
  }

  function getTotalRoomList(){
    fetch("/api/room?page=all", {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        console.log("getTotalRoom", data)

        let room = data.data;
        
        let roomIds = "";
        for(let i = 0; i<room.length; i++){
          roomIds += room[i].room_id + "|"
        }
        roomIds= roomIds.slice(0,-1)
        if(roomIds){
          fetch("/api/message?roomIds=" + roomIds, {
            method: "GET"
          })
          .then((response) => response.json())
          .then((data) => {
  
            let list = data.data;
            let tempMessage = {};
            let tempResult = {};
  
            list.forEach((i) => {
              if (!tempMessage[i.room_id]) {
                tempMessage[i.room_id] = [];
              }
  
              tempMessage[i.room_id].push(i);
            });
  
            for (const key in tempMessage) {
              if (tempMessage.hasOwnProperty(key)) {
                if (!tempResult[key]) {
                  tempResult[key] = {
                    count: tempMessage[key].length,
                    use_image:false,
                    person: 0,
                  };
                }
  
                let temp = tempMessage[key].filter( (arr, index, callback) =>
                  index === callback.findIndex((t) => t.user_key === arr.user_key)
                );
                tempResult[key].person = temp.length;
                
                for(let i = 0; i < tempMessage[key].length; i++){
                  if(tempMessage[key][i].image){
                    tempResult[key].use_image = true;
                    break;
                  }
                }
              }
            }

            for(let i = 0; i<room.length; i++){
              room[i].use_image = tempResult[room[i].room_id].use_image;
              room[i].reply = tempResult[room[i].room_id].count;
              room[i].person = tempResult[room[i].room_id].person;
            }

            setTotalRoomList(room);
          })
        } else {
          setTotalRoomList([]);
        }
      }
    });
  }

  function getTotalMessage(){
    fetch("/api/message?all=true", {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        console.log("getTotalmessage", data)
        setTotalMessage(data.data)
      }
      
    });
  }

  function getSupportList(){
    fetch("/api/support?all=true", {
      method: "GET",
    })
    .then((response) => response.json())
    .then(async (data) => {
      if(data.status){
        console.log("supportList", data)
        setSupportList(data.data)
      }
    });
  }

  useEffect(()=>{
    if(getUser.user_key === "8N2885B0883C" || 
      getUser.user_key === "XFD84427C21D" ||
      getUser.user_key === "O3E995E25F27" ){
      setIsLogin(true)
      getTotalMember();
      getTotalRoomList();
      getTotalMessage();
      getSupportList();
    }
    
  }, [getUser])

  return(
    <div className={css.wrap}>
      <Header />
  
      {isLogin ?
      
      <div className={css.inner}>
        <div className={css.admin_status}>
          <div className={css.nickname_change}>
            <input onChange={(e)=>{admin.current.nickname = e.target.value }} />
            <button onClick={()=>{setNewNickname()}}>변경</button>
          </div>
        </div>
        <div className={css.total_member}>
          <div>
            <h2>전체 회원</h2>
            
            
          </div>
          
          회원 수 : {totalMember} <br />
          접속 수 : {count}
        </div>

        <div className={css.total_room}>
          <h2>전체 방</h2>
          <div className={css.total_list}>
            {totalRoomList.length ? 
              totalRoomList.map((item) => {
                return(
                  <Room key={item.create_date} room={item} />
                )})
              :
                <div className={css.empty}>검색 결과가 없습니다.</div>  
            }
          </div>
        </div>

        <div className={css.total_message}>
          <h2>메시지</h2>
          <ul className={css.total_list}>
            {totalMessage.length ? 
              totalMessage.map((data) => {
                return(
                <li onClick={()=>{openWindow('/room/' + data.room_id)}} key={ (new Date(data.send_date) + Math.random()).toString(36) }>
                  <span className={css.room_id}>{data.room_id}</span>
                  <span className={css.message}>{data.text}</span>
                </li>
                )})
              :
                <li className={css.empty}>검색 결과가 없습니다.</li>  
            }
          </ul>
        </div>

        <div className={css.total_support}>
          <h2>문의</h2>
          <ul className={css.list}>
            {supportList.length ?

              supportList.map((data)=>{
                return(
                  <li className={css.list_data} key={data.create_date}>
                    <div className={css.meta}>
                      <div>
                        날짜:{getDateDiff(data.create_date).text}
                        {data.answer && <span className={css.answer_status}>[답변완료]</span> } 
                      </div>
           
                      <div>제목:{data.title}</div>
                      <div className={css.inquiry}>
                        문의 내용
                        <pre>{data.content}</pre>
                      </div>
                      {data.answer && <div className={css.answer}>
                        답변 내용
                        <pre>{data.answer}</pre>
                      </div>}
                    </div>

                    <button className={css.answer_button} onClick={()=>{ 
                      answer.current.title = data.title;
                      answer.current.idx = data.idx;
                      setIsCreateAnswer(!isCreateAnswer)
                    }}>답변쓰기</button>

                    {isCreateAnswer && <div className={css.answer_create}>
                      <textarea onChange={(e)=> answer.current.content = e.target.value} placeholder="친절하게 답변을 작성해 주세요."></textarea>
                      <div className={css.button_box}>
                        <button className={css.confirm} onClick={()=> answerConfirm()}>완료</button>
                        <button onClick={()=>{
                          answer.current.title = ""
                          setIsCreateAnswer(!isCreateAnswer)

                        }}>취소</button>
                      </div>
                    </div>}
                    
                  </li>
                )})

                       :
            <li className={css.empty}>검색 결과가 없습니다.</li>}
          </ul>
        </div>
      </div>
      : 
      <div className={css.admin_login}>
       <form>
         <label>
           아이디
           <input type="text" maxLength={50} onChange={(e)=>{ admin.current.email = e.target.value }}/>
         </label>
         <label>
           비밀번호
           <input type="password" maxLength={14} onChange={(e)=>{ admin.current.password = e.target.value }}/>
         </label>
         <button className={css.provider} onClick={(e) => adminLogin(e)}>
           로그인
         </button>
       </form>

       {/* <form>
        admin regist
         <label>
           아이디
           <input type="text" maxLength={50} onChange={(e)=>{ register.current.email = e.target.value }}/>
         </label>
         <label>
           비밀번호
           <input type="password" maxLength={14} onChange={(e)=>{ register.current.password = e.target.value }}/>
         </label>
         <button className={css.provider} onClick={(e) => adminRegister(e)}>
           register
         </button>
       </form> */}

     </div>}

     {alertData.isAlert && (
        <Alert
          props={{
            message: <span>{alertData.message}</span>,
            confirm: alertData.confirm,
            cancel: alertData.cancel,
          }}
        />
      )}
    </div>
  )
}