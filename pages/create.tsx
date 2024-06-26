import css from "./create.module.scss";
import { useState } from "react";
import { Layout, Navigator, Alert } from '@components/index';
import { CalendarEditor } from "@components/calendar";

export default function create() {
  const [title, setTitle] = useState("");
  const [monthItemList, setMonthItemList] = useState([]);
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
          <Navigator text={"달력을 만들고 공유해보세요."}/>
          <CalendarEditor title={title} setTitle={setTitle} monthItemList={monthItemList} setMonthItemList={setMonthItemList} isEdit setIsEdit /> 
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
