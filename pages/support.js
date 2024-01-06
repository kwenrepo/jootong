import css from './support.module.scss'
import Header from '#components/Header';
import {useState, useEffect, useRef, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import Alert from '#components/modal/Alert';
import { openWindow } from '#utils/openwindow'

export default function support(){
  const {data: session} = useSession();
  const router = useRouter();
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });

  const question = useRef({
    title: "",
    content: ""
  })

  function setTitle(e){
    if(!session) {
      openWindow('/auth/signin', '로그인', '_blank')
      return false;
    }
    question.current.title = e.target.value;
  }

  function setContent(e){
    if(!session) {
      openWindow('/auth/signin', '로그인', '_blank')
      return false;
    }
    question.current.content = e.target.value;
  }

  function confirm(){
    if(!session) {
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
      user_key : session.user.user_key,
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
    <div className={css.wrap}>
      <Header />

      <div className={css.inner}>
        <nav>
          <h2>1:1 문의하기</h2>
          <button onClick={()=>{router.back()}}></button>
        </nav>
         
        <div className={`${css.title} ${css.box}`}>
          <input type="text" onChange={(e)=> setTitle(e)} placeholder="필요하신 문의 제목을 작성해 주세요." />
        </div>
        <div className={`${css.content} ${css.box}`}>
          <textarea onChange={(e)=> setContent(e)} placeholder="상세한 문의 내용을 작성해 주세요."></textarea>
        </div>

        <div className={css.button_box}>
          <button className={css.confirm} onClick={()=>confirm()}>완료</button>
          <button onClick={()=> router.back()}>취소</button>
        </div>
      </div>

      {alertData.isAlert && 
        <Alert props={{
          message:<span>{alertData.message}</span>,
          confirm:alertData.confirm,
          cancel:alertData.cancel
        }}
      />}
    </div>
  )
}