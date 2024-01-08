import css from './view.module.scss'
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { getToday } from '#utils/date';
import Alert from '#components/modal/Alert';

export default function calendar(){
  const {data: session} = useSession();
  const router = useRouter();

  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const [title, setTitle] = useState('')
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
  const [monthItemList, setMonthItemList] = useState([]);
  const [summaryList, setSummaryList] = useState([]);

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

  }

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
      let id = router.query.id.split("@");

      console.log(id[0])
      
      fetch(`/api/board?id=${id[0]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then((result) => {

        if(result.status){
          let {data} = result;
          let toJSONData = JSON.parse(data[0].content);
          setTitle(data[0].title)
          console.log(toJSONData,  title)
          setMonthItemList(toJSONData);
        }
  
      });
    }
  }, [router])

  return(
    <>
      <section className={css.wrap}>
                 
        <div className={`${css.set_title}`}>
          <input type="text" value={title} readOnly />
        </div>

        <div className={css.calendar_wrap}>
          <div className={css.calendar_header}>
            <h1>{currentCalendar.year}. {currentCalendar.month + 1}월</h1>
            <div className={css.button_wrap}>
              <button className={css.prev} onClick={()=>{changeCalendar['prev']()}}>prev</button>
              <button className={css.next} onClick={()=>{changeCalendar['next']()}}>next</button>
            </div>
          </div>
          
          {summaryList['month' + currentCalendar.yearMonth]?.length > 0 && <div className={css.summary_list}>
            <div className={css.title}>이번달 간추린 내역</div>
            <ul className={css.item_list}>
              {summaryList['month' + currentCalendar.yearMonth].map((item)=>{
                return (
                  <li key={item.key}>
                    <span>{item.key}</span>
                    <span>{(item.total).toLocaleString('ko-KR')}</span>
                  </li>
                )
              })}
            </ul>
         </div>}

          <ul className={css.calendar_days}>
            <li>일</li>
            <li>월</li>
            <li>화</li>
            <li>수</li>
            <li>목</li>
            <li>금</li>
            <li>토</li>
          </ul>
          <RenderDaysElement />

        </div>
        
        <div className={css.button_box}>
          <button className={css.confirm} onClick={()=> share()}>공유하기</button>
          <button className={css.capture} onClick={()=> capture()}>캡쳐하기</button>
        </div>
      </section>

      {alertData.isAlert && <Alert
        props={{
          message: <span>{alertData.message}</span>,
          confirm: alertData.confirm,
          cancel: alertData.cancel,
        }}
      />}
    </>
  )
}
