import css from './calendar.module.scss';
import { executeQuery } from '#database/index';
import { useEffect, useState } from 'react';
import { useRecoilValue} from 'recoil';
import { user } from "#recoilStore/index";
import { useRouter } from 'next/router';
import {Layout, Alert} from '#components/index';
import { CalendarEditor, CalendarViewer }from "#components/calendar";

export default function calendar(props){
  const getUser = useRecoilValue(user);
  const router = useRouter();
  const [title, setTitle] = useState(props.title);
  const [monthItemList, setMonthItemList] = useState(JSON.parse(props.content));
  const [isEdit, setIsEdit] = useState({
    user_key:'',
    status:false
  });
  
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });

  useEffect(()=>{
    setIsEdit({...isEdit, user_key: getUser.user_key})

  }, [getUser.user_key])
  return(
    <Layout title={title}>
      <section className={css.wrap}>
        <div className={css.inner}>
          {isEdit.status 
            ? <CalendarEditor title={title} setTitle={setTitle} isEdit={isEdit} setIsEdit={setIsEdit} monthItemList={monthItemList} setMonthItemList={setMonthItemList} isOpen={props.is_open}/> 
            : <CalendarViewer title={title} setTitle={setTitle} isEdit={isEdit} setIsEdit={setIsEdit} monthItemList={monthItemList}/>
          }
        </div>   
      </section>

      
      {alertData.isAlert && <Alert
        props={{
          message: <span>{alertData.message}</span>,
          confirm: alertData.confirm,
          cancel: alertData.cancel,
        }}
      />}
    </Layout>
  )
}

export async function getStaticPaths() {
  const getDataResult = await executeQuery("SELECT * FROM data").then((data)=>{
    return {
      status:true,
      data
    }
  }, function(err){
    return {
      status:false,
      err
    }
  });

  const paths = getDataResult.data.map((item) => ({
    params: { calendar:[item.id, item.title] },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const getMonthItemList = await executeQuery("SELECT * FROM data WHERE id = ?", [params.calendar[0]]).then((data)=>{
    return {
      status:true,
      data
    }
  }, function(err){
    return {
      status:false,
      err
    }
  });

  if (!getMonthItemList.status) {
    return {
      notFound: true,
    }
  }
  
  return { 
    props: getMonthItemList.data[0]
  };
}