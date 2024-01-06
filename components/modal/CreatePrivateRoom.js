import css from './CreatePrivateRoom.module.scss';
import { useRef, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'

export default function CreatePrivateRoom({privateChat, setPrivateChat}){
  const {data: session} = useSession();
  const router = useRouter();
  
  const message = useRef('');

  function createRoom(){
    if(!session) {
      router.push("/auth/signin")
      return false;
    } else if ( message.current.value === ''){
      alert('메시지를 입력해주세요.');
      return false;
    }

    let data = {
      key : session.user.key,
      nickname : session.user.nickname,
      target : privateChat.target,
      text: message.current.value
    }
    fetch('/api/room?type=private', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        openWindow('/room/private?id='+ data.data.roomId)
      }
    });

  }

  function close(){
    setPrivateChat((previous) => {
      return{
        target:"",
        isCreate:false
      }
    });
  }

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <label className={css.title}>
          {/* <div>제목</div> */}
          {privateChat.target}님과 대화하기
          <input placeholder="초대 메시지를 입력하세요" ref={message} maxLength={50} />
        </label>
        <div className={css.button_group}>
          <button css={css.confirm} onClick={() => { createRoom(); }}>
            완료
          </button>
          <button css={css.cancel} onClick={() => { close(); }}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}