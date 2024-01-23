import css from './UserStatus.module.scss';
import { signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, userSelector } from "#recoilStore/index";
import { useRouter } from 'next/router';
import { Alert, Signin, Signup, SnsSignup, UserCard } from '#components/index';

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
  const [myDataList, setMyDataList] = useState([]);

  useEffect(()=>{
    async function session(){
      return await getSession();
    }
    if(!getUser.user_key){
      session().then((session)=>{
        if(session){
          setUser(session.user);
        }
      })
    }
  }, [])

  useEffect(()=>{
    if(getUser.user_key){
      fetch('/api/data?user_key='+getUser.user_key, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.status){
          let {data} = result;
          setMyDataList(data);
        }
      });
    }else if(getUser.email){
      setSnsSignup(true);
    }
    
  }, [getUser.user_key])
  return (
    <>
      {getUser?.user_key ? (
        <div className={css.user_status}>
          <button onClick={()=>{ setUserArea(!userArea)}} className={css.user}>
            <i></i>
          </button>
     
          {userArea && <UserCard setAlarm={setAlarm} setUserArea={setUserArea} myDataList={myDataList} setMyDataList={setMyDataList} setAlertData={setAlertData}/>}
        </div>
      ) : (
        <div className={css.user_status}>
          <button onClick={() => setLoginArea(true)}  className={css.login}>로그인</button>

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
