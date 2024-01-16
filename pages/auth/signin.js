import css from './signin.module.scss';
import { signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, userSelector } from "#recoilStore/index";
import { useRouter } from 'next/router';
import Link from "next/link";
import SnsSignup from "#components/auth/SnsSignup";
import {Layout, Alert, Loading} from '#components/index';

export default function signin() {
  const getUser = useRecoilValue(user);
  const setUser = useSetRecoilState(userSelector);

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [snsSignup, setSnsSignup] = useState(false);
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });

  
  const login = function(e){
    e.preventDefault()
    signIn('credentials', {
      email,
      password,
      redirect: false
    }).then( async({ok, error})=>{
      const session = await getSession();

      if(ok && session){
        if(agree) localStorage.setItem("login", email);
        setUser(session.user);

      }else{
        setErrorMessage(error);
      }
    })
  }
  
  useEffect(()=>{
    if(getUser.user_key) {
      if(!getUser.user_key){
        setSnsSignup(true);
      }else{
        if(window.location.href.includes("callback")){
          router.back()
        }else{
          router.push("/");
        }
      }
    }else{
      setLoading(false);
      if(localStorage.getItem("login")) setEmail(localStorage.getItem("login")) 

    }
  }, [getUser])


  return (
    <Layout title={"🔑로그인"}>
      {loading ? 
        <div className={css.loading}>
          <Loading />
        </div>
        :
        <div className={css.wrap}>
          <div className={css.inner}>
            <h1 className={css.title}>환영해요!</h1>

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
                
                <Link href="/auth/signup" className={css.signup}>간편 회원가입</Link>
                <Link href="/auth/forgotpassword" className={css.forgot_password}>비밀번호 찾기</Link>
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
                        callbackUrl: window.location.href + "?fromSNS",
                      })
                    }></button>
                </div>
              </div>
            
            </div>
          </div>
          {(snsSignup && router.query.callbackURL) && <SnsSignup setAlertData={setAlertData} setSnsSignup={setSnsSignup} callbackURL={router.query.callbackURL}/> }

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
      }
    </Layout>
  );
}
