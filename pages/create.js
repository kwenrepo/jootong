import css from "./create.module.scss";
import Header from '#components/Header';
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import Alert from '#components/modal/Alert';
import { openWindow } from '#utils/openwindow'
import Calendar from "#components/calendar/Calendar";


export default function create() {
  const {data: session} = useSession();
  const router = useRouter();
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  

  return (
    <div className={css.wrap}>
      <Header />
      <div className={css.inner}>
        <nav>
          <h1>나만의 데이터를 만들어 보세요.</h1>
          <button onClick={()=>{router.back()}}></button>
        </nav>
         
        <Calendar />

      </div>

      {alertData.isAlert && 
        <Alert props={{
          message:<span>{alertData.message}</span>,
          confirm:alertData.confirm,
          cancel:alertData.cancel
        }}
      />}
    </div>
  );
}
