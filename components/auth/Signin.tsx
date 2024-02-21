import css from './Signin.module.scss';
import { signIn, getSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, userSelector } from "@recoilStore/index";
import { useEffect, useState } from 'react';
import Link from "next/link";
import Loading from '@components/Loading';

export default function Signin({ setLoginArea, setSignupArea }) {
  const getUser:any = useRecoilValue(user);
  const setUser = useSetRecoilState(userSelector);

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [password, setPassword] = useState('');

  const login = function(e){
    e.preventDefault();
    setLoading(true);
    signIn('credentials', {
      email,
      password,
      callbackUrl: window.location.href,
      redirect: false
    }).then( async({ok, error})=>{
      const session = await getSession();
      if(ok && session){
        if(agree) localStorage.setItem("login", email);
        setUser(session.user);

      }else{
        setErrorMessage(error);
      }

      setLoading(false);
    })
  }

  useEffect(():any=>{
    if(getUser.user_key){
      setLoginArea(false)
      return false;
    }
    if(localStorage.getItem("login")) setEmail(localStorage.getItem("login")) ;
  }, [getUser])

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <h1 className={css.title}>
          <span>
            <i></i>
            환영해요!
          </span>
          <button className={css.cancel} onClick={()=>{ setLoginArea(false)} }>
            <i></i>
          </button>
        </h1>

        <div className={css.credential}>
          <form>
            <div className={css.email}>
              <input type="text" value={email} maxLength={50} onChange={(e) => { setEmail(e.target.value) }} placeholder="이메일을 입력해주세요" />
            </div>
            <div className={css.password}>
              <input type="password" value={password} maxLength={20} onChange={(e) => { setPassword(e.target.value) }} required placeholder="비밀번호" />
            </div>
            {errorMessage && (
              <div className={css.error_message}>{errorMessage}</div>
            )}
            <button className={css.login} onClick={(e) => { login(e); }}>
              로그인
            </button>
          </form>

          <div className={css.util_box}>
            <label className={css.agree_label}>
              <input type="checkbox" checked={agree} onChange={()=>{setAgree(!agree)}} />
              <span>아이디 기억</span>
            </label>
            
            <button className={css.signup} onClick={(e) => setSignupArea(true)}>
              간편 회원가입
            </button>
            <Link href="/auth/forgotpassword" className={css.forgot_password}>
              비밀번호 찾기
            </Link>
          </div>

        </div>
        <div className={css.sns_login}>
          {/* <h1>사용하는 SNS 계정으로 바로 로그인 하실 수 있습니다</h1> */}
          <h1>SNS 계정 으로 로그인</h1>
          <div className={css.sns_list}>
            <div className={css.google_login}>
              <button
                className={css.google}
                onClick={() =>
                  signIn("google", {
                    callbackUrl: window.location.href + "?fromSNS"
                  })
                }></button>
            </div>
            <div className={css.naver_login}>
              <button
                className={css.naver}
                onClick={() =>
                  signIn("naver", {
                    callbackUrl: window.location.href + "?fromSNS"
                  })
                }></button>
            </div>
            <div className={css.kakao_login}>
              <button
                className={css.kakao}
                onClick={() =>
                  signIn("kakao", {
                    callbackUrl: window.location.href  + "?fromSNS"
                  })
                }></button>
            </div>
          </div>
         
        </div>
      </div>
      
      {loading && <div className={css.loading}>
        <Loading />
      </div>}

    </div>
  );
}

