import css from './mypage.module.scss';
import {useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index"
import { useRouter } from 'next/router';
import { Layout, Navigator, Alert, Loading } from '#components/index';
import Profile from "#components/mypage/Profile";
import SupportHistory  from "#components/mypage/SupportHistory"
export default function mypage(){
  const getUser = useRecoilValue(user);

  const router = useRouter();
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });

  const password = useRef("")
  const [isPassword, setIsPassword] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function checkPassword(){
    if(password.current.value){
      let userData = {
        password : password.current.value,
        user_key : getUser.user_key,
        nickname : getUser.nickname
      }

      fetch("/api/user?checkPassword", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status){
          setAlertData({
            isAlert:true,
            message:<span>탈퇴 하시면 회원 정보가 모두 삭제됩니다. <br /> 정말 탈퇴 하시겠습니까?</span>,
            // message:<span>회원탈퇴 후 7일내 재가입 불가합니다.<br /> 자세한 사항은 이용약관 을 확인해 주세요. <br/> 정말 탈퇴 하시겠습니까?</span>,
            confirm:<button onClick={()=>(withdraw())}>계속탈퇴진행하기</button>,
            cancel:<button onClick={()=>(setAlertData({isAlert:false}))}>취소</button>
          })
        }else{
          setAlertData({
            isAlert:true,
            message:<span>{data.message}</span>,
            confirm:<button onClick={()=>{
              setAlertData({
                isAlert:false
              })
            }}>확인</button>,
          })
        }
      });
    }
  }
  
  function withdraw(){
    setIsLoading(true);

    let userData = {
      user_key : getUser.user_key,
      nickname : getUser.nickname
    }
    fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        setAlertData({
          isAlert:true,
          message:<span>회원탈퇴 가 완료 되었습니다!😭 <br /> 그동안 이용해 주셔서 감사합니다.🙇</span>,
          confirm:<button onClick={()=>{
            signOut({
              callbackUrl:`${window.location.origin}`
            });
          }}>확인</button>,
        })

      }else{
        setAlertData({
          isAlert:true,
          message:<span>{data.message}</span>,
          confirm:<button onClick={()=>{
            setAlertData({
              isAlert:false
            })
          }}>확인</button>,
        })
      }

      setIsLoading(false);

    });
  }

  useEffect(()=>{
    if(getUser){
      setIsLoading(false);
    }
  }, [getUser])
  return (
    <Layout title={"👤" + getUser.nickname}>

      <div className={css.wrap}>

        <div className={css.inner}>
          <Navigator text="마이페이지" />

          <Profile setIsLoading={setIsLoading} setAlertData={setAlertData} />

          <div className={`${css.my_item} ${css.box}`}>
            <h2>
              <i></i>
              보유 아이템</h2>
            <ul>
              <li>
                <i></i>       
                닉네임 변경권 {getUser.item?.item_nickname || 0} 개</li>
            </ul>
          </div>

          <SupportHistory />

          {getUser.user_key && <div className={css.button_box}>
            <button className={css.withdraw} onClick={()=>{
              if(getUser.provider){
                setAlertData({
                  isAlert:true,
                  message:<span>탈퇴 하시면 회원 정보가 모두 삭제됩니다. <br /> 정말 탈퇴 하시겠습니까?</span>,
                  // message:<span>회원탈퇴 후 7일내 재가입 불가합니다.<br /> 자세한 사항은 이용약관 을 확인해 주세요. <br/> 정말 탈퇴 하시겠습니까?</span>,
                  confirm:<button onClick={()=>(withdraw())}>계속탈퇴진행하기</button>,
                  cancel:<button onClick={()=>(setAlertData({isAlert:false}))}>취소</button>
                })
              }else{
                setIsPassword(true);
              }
              
            }}>회원탈퇴</button>
          </div>}
          
          {isPassword && 
            <div className={css.password_check}>
              <div className={css.inner}>
                <div className={css.message}>
                  <span>비밀번호 확인</span> <br />
                  <input type="password" ref={password} placeholder="비밀번호를 입력해주세요" />
                </div>
                <div className={css.button_box}>
                  <button onClick={()=>(checkPassword())}>확인</button>
                </div> 
              </div>
            </div>
          }

          {alertData.isAlert && 
            <Alert props={{
              message:<span>{alertData.message}</span>,
              confirm:alertData.confirm,
              cancel:alertData.cancel
            }}
          />}

          {isLoading && <Loading />}
        </div>

      </div>
    </Layout>
  );
}