import css from './SnsSignup.module.scss';
import { signOut } from "next-auth/react";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, userSelector } from "@recoilStore/index";
import Link from "next/link";
import Loading from '@components/Loading';

export default function SnsSignup({setAlertData, setSnsSignup, callbackURL }) {
  const getUser:GetUser = useRecoilValue(user);
  const setUser = useSetRecoilState(userSelector);
  const router = useRouter();
  const agree = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const startSignUp = function(){
    if(agree.current.checked && getUser.email){
      setLoading(true);
      setErrorMessage('');
    
      fetch("/api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getUser)
      })
      .then((response) => response.json())
      .then(async (data) => {
        if(data.status){
          setUser(data.data)

          setLoading(false);
          setAlertData({
            isAlert:true,
            message:<span>🎉회원가입을 축하합니다!🔥🔥 <br /> [기념선물지급 - 닉네임변경권] <br /> 마이페이지에서 사용 가능합니다</span>,
            confirm:<button onClick={()=>{
              if(callbackURL !== ''){
                window.opener.parentCallback({method:"mypage"});
              } else {
                router.push("/mypage")
              }
            }}>마이페이지</button>,
            cancel:<button onClick={()=>{
              if(callbackURL !== ''){
                router.push(callbackURL);
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
          <span><i></i>환영합니다!</span>
          <span className={css.highlight}>처음 오신 회원님!</span> 
          <span>이용약관 동의 가 필요합니다!</span>
        </div>
        
        <div className={css.credential}>
          
          로그인 하신 SNS 이메일
          <div className={css.email}>
            {getUser.email ? <input type="text" value={getUser.email || ""} readOnly/> : <Loading />} 
          </div>

          {errorMessage && <div className={css.error_message}>
            {errorMessage}
          </div>}
        </div>

        <label className={css.agree_label}>
          <input type="checkbox" ref={agree}/>
          <Link onClick={()=>{ checkAgree() }} href="/policy/service" target='_blank'>이용약관 동의하기</Link>
        </label>

        {getUser.email && 
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