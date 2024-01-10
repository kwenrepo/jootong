import css from './UserCard.module.scss';
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Loading from '#components/Loading'
import { openWindow } from '#utils/openwindow';
import { getDateDiff } from '#utils/date';

export default function UserCard({ setUserArea, setAlarm, privateRoomList, setPrivateRoomList, setAlertData }) {
  const {data: session} = useSession();
  const [loading, setLoading] = useState(false);

  function deleteRoom(room_id){
    setAlertData({
      isAlert:true,
      message:<span>채팅방에서 나가시겠습니까?</span>,
      confirm:<button onClick={()=>{
        let data = {
          room_id,
          nickname : session?.user.nickname,
          user_key : session?.user.user_key
        }
        socket.emit("deletePrivateRoom", data);

      }}>나가기</button>,
      cancel:<button onClick={()=>{
        setAlertData({
          isAlert:false
        })
      }}>취소</button>
    })
  }


  return session && session.user.nickname && (
    <div className={css.wrap}>
      <h1 className={css.title}>
        {/* JOOTONG */}
        <span className={css.nickname}>{session.user.nickname} 님</span>
        <button className={css.cancel} onClick={()=>{ setUserArea(false)} }></button>
      </h1>
      
      {/* <span className={css.nickname}>{session.user.nickname} 님</span> */}

      <div className={css.bridge}>
        <div>
          <Link className={css.mypage} href="/mypage">마이페이지</Link>
        </div>
        {/* <div>
          <Link className={css.market} href="/market">주통상점</Link>
        </div> */}
      </div>

      {privateRoomList.length > 0 && 
      <div className={css.message_list}>
        {privateRoomList.map((item) => (
         <div key={item.last_date}>
          <div className={css.room_title}>
            {item.create_nickname && item.target_nickname ?
            <span>
              { item.create_user_key === session.user.user_key ? item.target_nickname : item.create_nickname } 님 과의 채팅 방
            </span>
            :
            <span>
              상대방이 퇴장했습니다.
            </span>
            }
            
            <button className={css.delete} onClick={()=>{ deleteRoom(item.room_id) }}>
              나가기
            </button>
          </div>
          <div className={css.message} onClick={ ()=> {
            openWindow('/room/private/' + item.room_id);

          }}>
            <div className={css.text}>
              {item.last_nickname === session.user.nickname ? "나" : item.last_nickname} : { typeof item.image === "string" ? "[사진]" : (item.last_text || "[사진]")}
            </div>
            <div className={css.date}>
              {item.alarm && <span className={css.red_dot}></span>}
              <span>{getDateDiff(item.last_date)?.text}</span>
            </div>
          </div>
        </div> 
        ))}
      </div>}

      {loading && <div className={css.loading}>
        <Loading />
      </div>}
    </div>
  );
}

