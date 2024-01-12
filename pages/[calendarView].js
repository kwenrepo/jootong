import css from './calendarView.module.scss'
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user, calendarDataList, calendarDataListSelector  } from "#recoilStore/index";
import { useRouter } from 'next/router';
import Layout from '#components/Layout';
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { getToday } from '#utils/date';
import Alert from '#components/modal/Alert';
import { Editor, Viewer }from "#components/calendar";

export default function calendar(){
  const getUser = useRecoilValue(user);
  const router = useRouter();
  const [title, setTitle] = useState('')
  const captureRef = useRef(null);

  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const [selectMonth, setSelectMonth] = useState(new Date(getToday()));
  const [currentCalendar, setCurrentCalendar] = useState({
    year:0,
    month:0,
    todayDate:0,
    startIndex:0,
    totalIndex:0,
    yearMonth:0,
    monthItem:[]
  });
  const [summaryList, setSummaryList] = useState([]);
  const [monthItemList, setMonthItemList] = useState([]);

  function updateCurrentCalendar(){
    const year = selectMonth.getFullYear();
    const month = selectMonth.getMonth();
    const todayDate = selectMonth.getDate();
    const startIndex = new Date(year, month, 0).getDay() + 1;
    const totalIndex = new Date(year, month + 1, 0).getDate() + startIndex;
    const yearMonth = String(year) + String(month);

    const monthItem = monthItemList?.reduce((acc, current) => {
      if(yearMonth === current.yearMonth){
        acc[current.date] = acc[current.date] || [];
        acc[current.date].push({
          key : current.key,
          value : current.value,
          description : current.description,
          yearMonth 
        });
      }

      return acc;
    }, {});

    setCurrentCalendar({
      year,
      month,
      todayDate,
      startIndex,
      totalIndex,
      yearMonth,
      monthItem : monthItem || []
    })
  }

  function RenderDaysElement(){
    const days = [];
    for(let i = 0; i < currentCalendar.totalIndex; i++){
      if(i < currentCalendar.startIndex){
        days.push(
          <p key={i}></p>
        );
      }else{
        days.push(
          <div className={i === currentCalendar.startIndex ? `${css.able} ${css.start}` : `${css.able}`}
           key={(i - currentCalendar.startIndex) + new Date().getTime()}>
            <div className={css.day_number} >{(i - currentCalendar.startIndex) + 1}</div>
            {currentCalendar.monthItem[(i - currentCalendar.startIndex) + 1] && currentCalendar.monthItem[(i - currentCalendar.startIndex) + 1].map((item, index)=>{
              return(
                <div className={css.history_item} key={index + new Date()}>
                  <div className={css.text}>
                    <span>{item.description ? item.description : item.key }</span>
                    <span>{item.value.toLocaleString('ko-KR')}</span>
                  </div>
                </div>
              )
            })}

          </div>
        );
      }
    }

    return <div className={css.calendar_date}>{days}</div>
  }

  function updateSummary(){
    const groupValues = monthItemList.reduce((acc, current) => {
      if(currentCalendar.yearMonth === current.yearMonth){
        acc[current.key] = acc[current.key] || [];
        acc[current.key].push({
          value : current.value,
          description : current.description
        });

      }
      return acc;
    }, {});

    const groups = Object.keys(groupValues).map((key) => {
      return {
        key,
        total:groupValues[key].reduce((acc, current) => {
          acc += current.value;
          return acc;
        }, 0),
        itemList:groupValues[key],
      }
    });
    
    let temp = []; 
    temp['month' + currentCalendar.yearMonth] = [];
    temp['month' + currentCalendar.yearMonth]=groups;

    setSummaryList(temp);
  }

  function share(){
    navigator.clipboard.writeText(window.location.href).then(() => {
      /* clipboard successfully set */
      setAlertData({
        isAlert:true,
        message:<span>URL 이 복사되었습니다.</span>,
        confirm:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
         }}>확인</button>,
      })
    }, () => {
      /* clipboard write failed */
      setAlertData({
        isAlert:true,
        message:<span>죄송합니다 다시 시도해 주세요.</span>,
        confirm:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
         }}>확인</button>,
      })
    });
  }

  async function capture() {
    if (!captureRef.current) return;

    try {
      const target = captureRef.current;
      const canvas = await html2canvas(target, { scale: 1 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, `calendar_${currentCalendar.year}_${currentCalendar.month + 1}.png`);
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  const changeCalendar = {
    prev : function(){
      setSelectMonth(new Date(currentCalendar.year, currentCalendar.month - 1, 1));
    },
    next : function(){
      setSelectMonth(new Date(currentCalendar.year, currentCalendar.month + 1, 1));
    }
  }

  useEffect(()=>{
    if(monthItemList.length){
      console.log('monthItemList', monthItemList)
      updateCurrentCalendar();
    }
    
  }, [monthItemList])

  useEffect(()=>{
    if(selectMonth){
      updateCurrentCalendar();
    }
  }, [selectMonth])

  useEffect(()=>{
    console.log('currentCalendar', currentCalendar)
    if(currentCalendar.year){
      updateSummary();
    }
  }, [currentCalendar])

  useEffect(()=>{
    if(router.isReady){
      let key = router.query.calendarView.split("@");
      
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
          console.log(data)
          let jsonParseData = JSON.parse(data[0].content);
          setTitle(data[0].title)
          setMonthItemList(jsonParseData)
        }
  
      });
    }
  }, [router])

  return(
    <Layout title={title}>
      <section className={css.wrap} ref={captureRef}>
        <div className={css.inner}>
          {getUser.user_key && monthItemList.length > 0 
          ? <Editor title={title} setTitle={setTitle} viewList={monthItemList}/> 
          : <Viewer title={title} setTitle={setTitle} viewList={monthItemList}/>
          }
          
          <div className={css.button_box}>
            <button className={css.confirm} onClick={()=> share()}>공유하기</button>
            <button className={css.capture} onClick={()=> capture()}>캡쳐하기</button>
            {getUser.user_key && <button className={css.edit} onClick={()=> edit()}>수정하기</button> }
          </div>
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
