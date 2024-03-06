import css from './support.module.scss'
import {useState, useEffect, useRef, useCallback } from "react";
import { useRecoilValue } from 'recoil';
import { user } from "@recoilStore/index";
import { useRouter } from 'next/router';
import { Layout, Navigator, Alert } from '@components/index';
import { openWindow } from '@utils/openwindow';

export default function support(){
  const getUser:GetUser = useRecoilValue(user);
  const router = useRouter();
  const [alertData, setAlertData] = useState<Alert>();

  const question = useRef({
    title: "",
    content: ""
  })

  function setTitle(e){
    if(!getUser.user_key) {
      openWindow('/auth/signin', '로그인', '_blank')
      return false;
    }
    question.current.title = e.target.value;
  }

  function setContent(e){
    if(!getUser.user_key) {
      openWindow('/auth/signin', '로그인', '_blank')
      return false;
    }
    question.current.content = e.target.value;
  }

  function confirm(){
    if(!getUser.user_key) {
      openWindow('/auth/signin', '로그인', '_blank')
      return false;
    }
    if(question.current.title === ""){
      setAlertData({
        isAlert:true,
        message:<span>문의 제목을 입력 해주세요.</span>,
        confirm:<button onClick={()=>(setAlertData({isAlert:false}))}>확인</button>,
      })
      return false;
    }else if(question.current.content === ""){
      setAlertData({
        isAlert:true,
        message:<span>문의 내용을 입력 해주세요.</span>,
        confirm:<button onClick={()=>(setAlertData({isAlert:false}))}>확인</button>,
      })
      
      return false;
    }

    let data = {
      user_key : getUser.user_key,
      question : question.current
    }

    fetch("/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){

        setAlertData({
          isAlert:true,
          message:<span>1:1 문의가 완료되었습니다. <br /> 빠르게 답변 드리겠습니다.</span>,
          confirm:<button onClick={()=>{ router.back(); }}>확인</button>
        })
      }
      question.current.title = ""
      question.current.content = ""
    });
  }

  return(
    <Layout title={"문의하기"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <Navigator text={"문의하기"}/>

          <div className={`${css.title} ${css.box}`}>
            <i></i>
            <input type="text" onChange={(e)=> setTitle(e)} placeholder="필요하신 문의 제목을 작성해 주세요." />
          </div>
          <div className={`${css.content} ${css.box}`}>
            <textarea onChange={(e)=> setContent(e)} placeholder="문의 내용을 작성해 주세요."></textarea>
          </div>

          <div className={css.button_box}>
            <button className={css.confirm} onClick={()=>confirm()}>완료</button>
            <button onClick={()=> router.back()}>취소</button>
          </div>
        </div>
      </div>

      {alertData.isAlert && 
        <Alert props={{
          message:<span>{alertData.message}</span>,
          confirm:alertData.confirm,
          cancel:alertData.cancel
        }}
      />}
    </Layout>
  )
}