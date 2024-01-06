import css from './Room.module.scss';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';

import { openWindow } from '#utils/openwindow';
export default function Room({room, getList, page}) {
  const [popup, setPopup] = useState("");
  const router = useRouter();

  useEffect(()=>{
    if(popup){
      window.parentCallback = ({method}) =>{
        if(method === "mypage"){
          router.push('/mypage');
          popup.close();
        } else if(method === "getList"){
          getList(page.current.page);
          popup.close();
        } 
         
      }
    }
  }, [popup])
  return(
    room.room_id && <div className={css.room} onClick={ ()=> setPopup(openWindow('/room/' + room.room_id)) }>
       
      <div className={css.title}>
        <div className={css.text}>
          {room?.title}
       
          {room.use_image ? <span className={css.image} key={Math.random()}></span> : ""}
         
        </div>
        <div className={css.metadata}>
          <span className={css.reply}>[{room.reply}]</span>
        </div>
      </div>
      
    </div>
  )
}