import css from "./create.module.scss";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index"
import { useRouter } from 'next/router';
import Layout from '#components/Layout';
import Alert from '#components/modal/Alert';
import { openWindow } from '#utils/openwindow';
import {Editor} from "#components/calendar";

export default function create() {
  const getUser = useRecoilValue(user);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  

  function titleHandler(e){
    setTitle(e.target.value);
  }

  return (
    <Layout title={title}>
      <div className={css.wrap}>
        <div className={css.inner}>
          <nav>
            <h1>나만의 데이터를 만들어 보세요.</h1>
            <button
              onClick={() => {
                router.back();
              }}
            ></button>
          </nav>

          <Editor title={title} setTitle={setTitle}/>
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
