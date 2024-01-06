import css from './SnsSignup.module.scss';
import { useSession, getSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { SocketContext } from '#context/SocketContext';

import Link from "next/link";
import Loading from '#components/Loading';

export default function SnsSignup({setAlertData, setSnsSignup, callbackURL}) {
  const {data: session, update} = useSession();
  const {setUserKey} = useContext(SocketContext);

  const router = useRouter();
  const agree = useRef(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const startSignUp = function(){
    if(agree.current.checked && session){
      setLoading(true);
      setErrorMessage('');
    
      fetch("/api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session.user)
      })
      .then((response) => response.json())
      .then(async (data) => {
        if(data.status){
          session.user = data.data;
          await update({
            ...session,
            user:{
              ...session?.user
            }
          })

          setUserKey(session.user.user_key)
          setLoading(false);
          setAlertData({
            isAlert:true,
            message:<span>🎉회원가입을 축하합니다!🔥🔥 <br /> [기념선물지급 - 닉네임변경권] <br /> 마이페이지에서 사용 가능합니다</span>,
            confirm:<button onClick={()=>{
              if(callbackURL){
                window.opener.parentCallback({method:"mypage"});
              } else {
                router.push("/mypage")
              }
            }}>마이페이지</button>,
            cancel:<button onClick={()=>{
              if(callbackURL){
                router.push(callbackURL)
              } else {
                router.push("/");
                setSnsSignup(false);
                setAlertData({
                  isAlert:false
                })
              }
            }}>확인</button>
          })
         
        } else {
          setErrorMessage(data.message)
        }
      });
    } else if(!agree.current.checked){
      setErrorMessage('* 이용약관에 동의해주세요')
    }
  }

  function checkAgree(){
    agree.current.checked = true;
  }


  return(
    <div className={css.wrap}>
      <div className={css.inner}>

        <div className={css.greeting}>
          환영합니다, <span>처음 오신 회원님!</span> <br />
          이용약관 동의 가 필요합니다!
        </div>
        
        <div className={css.credential}>
          
          로그인 하신 SNS 이메일
          <div className={css.email}>
            {session?.user.email ? <input type="text" value={session?.user.email || ""} readOnly/> : <Loading />} 
          </div>

          {errorMessage && <div className={css.error_message}>
            {errorMessage}
          </div>}
        </div>

        <label className={css.agree_label}>
          <input type="checkbox" ref={agree}/>
          <Link onClick={()=>{ checkAgree() }} href="/policy/service" target='_blank'>이용약관 동의하기</Link>
        </label>

        {session && 
          <div className={css.button_group}>
            <button className={css.signup} onClick={()=>{ startSignUp() }}>동의 후 계속 이용하기</button>
            <button className={css.signout} onClick={()=>{ signOut() }}>취소</button>
          </div>
        }
      </div>

      {loading && <div className={css.loading}>
        <Loading />
      </div>}
    </div>
  )
}