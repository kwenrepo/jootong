import css from './CreateRoom.module.scss';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { openWindow } from '#utils/openwindow';

export default function CreateRoom({setIsCreateRoom, getList}){
  const {data: session} = useSession();
  const router = useRouter();
  const title = useRef('');

  function createRoom(){
    if(!session) {
      router.push('/auth/signin')
      return false;
    } else if ( title.current.value === ''){
      alert('주제를 입력해주세요.');
      return false;
    }

    let data = {
      user_key : session.user.user_key,
      create_nickname : session?.user.nickname,
      title : title.current.value
    }
  
    fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        getList(1);
        openWindow('/room/'+ data.data.roomId);
        setIsCreateRoom(false);
      }
    });
  }

  function close(){
    setIsCreateRoom(false)
  }

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <label className={css.title}>
          {/* <div>제목</div> */}
          <input placeholder="주제를 입력해주세요" ref={title} maxLength={50} />
        </label>
        <div className={css.button_group}>
          <button css={css.confirm}  onClick={() => { createRoom(); }}>
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