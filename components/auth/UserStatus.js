import css from './UserStatus.module.scss';
import { signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, userSelector } from "#recoilStore/index"
import { useRouter } from 'next/router';
import Signin from '#components/auth/Signin';
import Signup from '#components/auth/Signup';
import SnsSignup from "#components/auth/SnsSignup";
import UserCard from '#components/auth/UserCard';
import Alert from '#components/modal/Alert';

export default function UserStatus() {
  const getUser = useRecoilValue(user);
  const setUser = useSetRecoilState(userSelector);
 
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const [snsSignup, setSnsSignup] = useState(false);
  const [loginArea, setLoginArea] = useState(false);
  const [signupArea, setSignupArea] = useState(false);
  const [userArea, setUserArea] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [privateRoomList, setPrivateRoomList] = useState([])

  useEffect(()=>{
    async function session(){
      return await getSession();
    }
    session().then((session)=>{
      console.log("session?", session)
      if(session) setUser(session.user);
    })
  }, [])

  return (
    <>
      {getUser?.user_key ? (
        <div className={css.user_status}>
          <span onClick={()=>{ setUserArea(!userArea)}} className={`${ alarm ? css.alarm : ""}`}>
            {getUser.nickname} 님
          </span>
          
          <button onClick={() => {
              signOut({
                callbackUrl: `${window.location.origin}`,
              });
          }}>로그아웃
          </button>

          {userArea && <UserCard setAlarm={setAlarm} setUserArea={setUserArea} privateRoomList={privateRoomList} setPrivateRoomList={setPrivateRoomList} setAlertData={setAlertData}/>}
        </div>
      ) : (
        <div className={css.user_status}>
          <button onClick={() => setLoginArea(true)}>로그인</button>

          {loginArea && (
            <aside>
              {!signupArea ? (
                <Signin setLoginArea={setLoginArea} setSignupArea={setSignupArea} />
              ) : (
                <Signup setSignupArea={setSignupArea} setAlertData={setAlertData} />
              )}
            </aside>
          )}

          {snsSignup && <SnsSignup setAlertData={setAlertData} setSnsSignup={setSnsSignup}/> }
        </div>
      )}

      {alertData.isAlert && (
        <Alert
          props={{
            message: <span>{alertData.message}</span>,
            confirm: alertData.confirm,
            cancel: alertData.cancel,
          }}
        />
      )}
    </>
  )
}
