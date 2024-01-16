import css from './calendar.module.scss'
import { useEffect, useState } from 'react';
import { useRecoilValue} from 'recoil';
import { user } from "#recoilStore/index";
import { useRouter } from 'next/router';
import {Layout, Alert} from '#components/index';
import { CalendarEditor, CalendarViewer }from "#components/calendar";

export default function calendar(){
  const getUser = useRecoilValue(user);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [viewList, setViewList] = useState([]);
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
    if(router.isReady){
      let key = router.query.calendar.split("@");
      fetch(`/api/data?key=${key[0]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.status){
          let {data} = result;
          if(data[0]){
            let jsonParseData = JSON.parse(data[0].content);
            setTitle(data[0].title);
            setViewList(jsonParseData);
            setIsEdit({
              user_key:data[0].user_key,
              status:false
            })
          }
        }else{
          setAlertData({
            isAlert:true,
            message:<span>존재하지 않는 달력입니다.</span>,
            cancel:<button onClick={()=>{ router.push('/'); }}>확인</button>
          })
        }
  
      });
     
    }
  }, [router])

  return(
    <Layout title={title}>
      <section className={css.wrap}>
        <div className={css.inner}>
          {isEdit.status 
            ? <CalendarEditor title={title} setTitle={setTitle} isEdit={isEdit} setIsEdit={setIsEdit} editDataList={viewList} setViewList={setViewList}/> 
            : <CalendarViewer title={title} setTitle={setTitle} isEdit={isEdit} setIsEdit={setIsEdit} viewList={viewList}/>
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
