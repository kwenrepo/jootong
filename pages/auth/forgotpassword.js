import css from './forgotpassword.module.scss';
import { useState, useRef } from "react";
import { useRouter } from 'next/router';
import { Layout, Navigator, Alert, Loading } from '#components/index';

export default function forgetpassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChange, setIsChange] = useState(false)
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const user = useRef({
    email:"",
    password: ""
  })

  function changePassword(){
    if(user.current.email === "") {
      setErrorMessage("이메일을 입력해주세요.")
    } else {
      setIsLoading(true)
      setErrorMessage("")

      fetch('/api/user?forgot=password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.current.email)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status){
          setErrorMessage(data.message);
          setIsChange(true);
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
          setErrorMessage(data.message);
        }
        setIsLoading(false);
      
      });
    }
  }

  return (
    <Layout title={"비밀번호찾기😢"} isHeader={false}>

      <div className={css.wrap}>
        <Navigator />

        <div className={css.inner}>

          <h1>JOOTONG</h1>
          <div className={css.title}>비밀번호를 찾고자하는 이메일을 입력해주세요.</div>
          <div className={css.credential}>
            <div className={css.email}>
              <input type="text" maxLength={50} onChange={(e)=>{ user.current.email = e.target.value }} required placeholder="ex) youremail@email.com" />
            </div>

            { isChange ? 
              <a href="/auth/signin">로그인 하러 가기</a> : 
              <button onClick={(e)=>{changePassword(e)}}>비밀번호 찾기</button> 
            }

            <div className={css.error_message}>
              {isLoading 
                ?<Loading shape={{width:"20px",height:"20px",border:"2px dashed #7c25df"}} />
                :errorMessage
              }
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

        </div>
      </div>
    </Layout>
  );
}

