import css from "./create.module.scss";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index"
import { Layout, Navigator, Alert } from '#components/index';
import { CalendarEditor } from "#components/calendar";

export default function create() {
  const getUser = useRecoilValue(user);
  const [title, setTitle] = useState("");
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });

  return (
    <Layout title={title || "달력만들기"}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <Navigator text={"나만의 데이터를 만들어 보세요."}/>
          <CalendarEditor title={title} setTitle={setTitle}/>
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
  );
}
