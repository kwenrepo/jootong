import css from './signup.module.scss';
import { signIn, getSession} from "next-auth/react"
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, userSelector } from "@recoilStore/index";
import { isEmail } from "@utils/regexp/isEmail";
import { isPassword } from "@utils/regexp/isPassword";
import { Layout, Alert, Loading } from '@components/index';
import Link from "next/link";

export default function signup({}) {
  const getUser:GetUser = useRecoilValue(user);
  const setUser = useSetRecoilState(userSelector);
  const router = useRouter()
  const email = useRef(null);
  const password = useRef(null);
  const checkedPassword = useRef(null);
  const agree = useRef(null);
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState<Alert>();


  const changeEmail = function(e){
    if(getUser.user_key){
      setAlertData({
        isAlert:true,
        message:<span>이미 로그인 하셨습니다.</span>,
        confirm:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
          router.push("/")
        }}>확인</button>
      })
      return false
    } else if(!isEmail.test(e.target.value)){
      setErrorMessage('* 올바른 이메일 형식이 아닙니다')
    }else{
      setErrorMessage('')
      email.current.value = e.target.value
    }
  }

  const changePassword = function(e){
    password.current = e.target.value;
      
    if(password.current || checkedPassword.current){
      if(password.current.length < 8  ){
        setErrorMessage('* 비밀번호는 8글자 이상 입니다.')
      }else if(!isPassword.test(password.current)){
        setErrorMessage('* 비밀번호는 (필수)문자+숫자 조합입니다.')
      }else if(checkedPassword.current && (password.current !== checkedPassword.current)){
        setErrorMessage('* 비밀번호를 확인해주세요')
      }else{
        setErrorMessage('')
        
      }
    }else{
      setErrorMessage('')
    }
  }

  const passwordCheck = function(e){
    checkedPassword.current = e.target.value;
    if(password.current.length < 8 ){
      setErrorMessage('* 비밀번호는 8글자 이상 입니다.')
    }else if(!isPassword.test(password.current)){
      setErrorMessage('* 비밀번호는 문자+숫자 조합입니다.')
    }else if(password.current !== checkedPassword.current){
      setErrorMessage('* 비밀번호를 확인해주세요')
    }else{
      setErrorMessage('')
    }
  }

  function checkAgree(){
    agree.current.checked = true;
  }

  const startSignUp = function(){
    if( email.current.value && checkedPassword.current && agree.current.checked && (checkedPassword.current === password.current)){
      setLoading(true);
      setErrorMessage('');
      let user = {
        email : email.current.value,
        password : password.current,
        provider : 'credential'
      }
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status){
          signIn('credentials', {
            email:data.email,
            password:password.current,
            redirect:false
          }).then( async ({ok, error})=>{
            const session = await getSession();

            if(ok && session){
              setUser(session.user);
              setAlertData({
                isAlert:true,
                message:<span>🎉회원가입을 축하합니다!🔥🔥 <br /> [기념선물지급 - 닉네임변경권] <br /> 마이페이지에서 사용 가능합니다</span>,
                confirm:<button onClick={()=>{
                  setAlertData({
                    isAlert:false
                  })
                  router.push("/mypage")
                }}>마이페이지</button>,
                cancel:<button onClick={()=>{
                  setAlertData({
                    isAlert:false
                  })
                  router.push("/")
                  
                }}>확인</button>
              })
            }else{
              setErrorMessage(error)
            }
            })

        } else {
          setErrorMessage(data.code || data.message || "일시적인 에러, 다시 시도해 주세요.")
        }
        setLoading(false);
      });
    } else if(!email.current.value){
      setErrorMessage('* 이메일을 확인해 주세요')
    } else if(password.current !== checkedPassword.current || !password.current){
      setErrorMessage('* 비밀번호를 다시 확인해주세요')
    } else if(!agree.current.checked){
      setErrorMessage('* 이용약관에 동의해주세요')
    }
  }
  
  return (
    <Layout title={"⚡ 회원가입"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <h1>JOOTONG 회원가입</h1>
          <div className={css.credential}>
            <div className={`${css.email} ${css.box}`}>
              <input ref={email} type="text" maxLength={50} onBlur={(e)=>{changeEmail(e)}} placeholder="이메일@exam.com"/>
            </div>
            <div className={`${css.password} ${css.box}`}>
              { passwordHidden 
              ? <>
                  <input type="password" maxLength={20} onBlur={(e)=>{changePassword(e)}} placeholder="비밀번호 8자리 이상"/>
                  <button className={css.password_hidden} onClick={()=>{setPasswordHidden(!passwordHidden)}}></button>
                </>
              : <>
                  <input  type="text" maxLength={20} onBlur={(e)=>{changePassword(e)}} placeholder="비밀번호 8자리 이상"/> 
                  <button className={css.password_on} onClick={()=>{setPasswordHidden(!passwordHidden)}}></button>
                </>
              } 
            </div>
            <div className={`${css.password_confirm} ${css.box}`}>
            { passwordHidden 
              ? <input type="password" maxLength={20} onBlur={(e)=>{passwordCheck(e)}} placeholder="비밀번호 확인"/>
              : <input type="text" maxLength={20} onBlur={(e)=>{passwordCheck(e)}} placeholder="비밀번호 확인"/>
            }
            </div>
            {errorMessage && <div className={css.error_message}>
              {errorMessage}
            </div>}
          </div>

          <label className={css.agree_label}>
            <input type="checkbox" ref={agree}/>
            <Link onClick={()=>{ checkAgree() }} href="/policy/service" target='_blank'>[필수]이용약관 동의하기</Link>
          </label>
          <button className={css.signup} onClick={()=>{ startSignUp() }}>가입하기</button>

          {loading && <div className={css.loading}>
            <Loading />
          </div>}
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
      </div>
    </Layout>
  )
}