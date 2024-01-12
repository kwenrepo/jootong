
import css from './Viewer.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index";
import { getToday } from '#utils/date';
import Alert from '#components/modal/Alert';

export default function Viewer({title, setTitle, viewList=[]}){
  const getUser = useRecoilValue(user);
  const router = useRouter();
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const [selectMonth, setSelectMonth] = useState(new Date(getToday()));
  const [currentCalendar, setCurrentCalendar] = useState({
    year : '',
    month : '',
    yearMonth : '',
    list:[]
  });
  const [monthItemList, setMonthItemList] = useState([]);
  const [summaryList, setSummaryList] = useState([]);
  const [editDate, setEditDate] = useState(0);
  const [addItem, setAddItem] = useState({})

  function updateCurrentCalendar(){
    console.log('monthItemList', monthItemList)
    const year = selectMonth.getFullYear();
    const month = selectMonth.getMonth();
    const yearMonth = String(year) + String(month);
    const startIndex = new Date(year, month, 0).getDay() + 1;
    const totalIndex = new Date(year, month + 1, 0).getDate() + startIndex;
    const monthItem = monthItemList?.reduce((acc, current) => {
      if(yearMonth === current.yearMonth){
        acc[current.date] = acc[current.date] || [];
        acc[current.date].push({
          key : current.key,
          value : current.value,
          explain : current.explain,
          yearMonth 
        });
      }

      return acc;
    }, {});

    let tempCalendar = [];

    for(let i = 0; i < totalIndex; i++){

      if(i < startIndex){
        tempCalendar.push(null);
       
      }else{
        tempCalendar.push({
          start : i === startIndex ? true : false,
          number : (i - startIndex) + 1,
          item : monthItem[(i - startIndex) + 1],
        })
      }
    }

    setCurrentCalendar({
      year,
      month,
      yearMonth,
      list: tempCalendar
    })
  }

  function updateSummary(){
    const getKeyValues = monthItemList.reduce((acc, current) => {
      if(currentCalendar.yearMonth === current.yearMonth){
        acc[current.key] = acc[current.key] || [];
        acc[current.key].push({
          value : current.value,
          explain : current.explain
        });

      }
      return acc;
    }, {});

    const getKeyValueArray = Object.keys(getKeyValues).map((key) => {
      return {
        key,
        total:getKeyValues[key].reduce((acc, current) => {
          acc += current.value;
          return acc;
        }, 0),
        detailList:[],
        detailValues: getKeyValues[key].reduce((acc, current) => {
          acc[current.explain] = acc[current.explain] || [];
          acc[current.explain].push({
            value : current.value,
            explain : current.explain
          });

          return acc;
        }, {})
      }
    });

    getKeyValueArray.map((item)=>{
      item.detailList = Object.keys(item.detailValues).map((key) => {
        return {
          key,
          total:item.detailValues[key].reduce((acc, current) => {
            acc += current.value;
            return acc;
          }, 0)
        }
      });
    })
    console.log('getKeyValueArray', getKeyValueArray)
    setSummaryList(getKeyValueArray);
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
    updateCurrentCalendar();
  }, [monthItemList])

  useEffect(()=>{
    if(selectMonth){
      updateCurrentCalendar();
    }
  }, [selectMonth])

  useEffect(()=>{
    updateSummary();
  }, [currentCalendar])

  useEffect(()=>{
    if(viewList.length){
      setTitle(title)
      setMonthItemList(viewList);
    }
  }, [viewList])
  return(
    <>
      <section className={css.wrap}>
                 
        <div className={`${css.set_title}`}>
          <input type="text" value={title || ""} onChange={(e)=> setTitle(e.target.value)} placeholder="" />
        </div>

        <div className={css.calendar_wrap}>
          <div className={css.calendar_header}>
            <h1>{currentCalendar.year}. {currentCalendar.month + 1}월</h1>
            <div className={css.button_wrap}>
              <button className={css.prev} onClick={()=>{changeCalendar['prev']()}}>prev</button>
              <button className={css.next} onClick={()=>{changeCalendar['next']()}}>next</button>
            </div>
          </div>
          
          {summaryList?.length > 0 && <div className={css.summary_list}>
            <div className={css.title}>이번달 간추린 내역</div>
            <ul className={css.item_list}>
              {summaryList.map((item)=>{
                return (
                  <li key={item.key + new Date().getTime()}>
                    <div className={css.group_name} onClick={(e)=>{ 
                      let height = e.target.closest('li').getBoundingClientRect().height;
                      let scrollHeight = e.target.closest('li').scrollHeight;
                      height === scrollHeight ? e.target.closest('li').style.height = `24px` : e.target.closest('li').style.height = `${scrollHeight}px`
                    }}>
                      <span>{item.key}</span>
                      <span>{(item.total).toLocaleString('ko-KR')}</span>
                      <button>+</button>
                    </div>
                    <div className={css.detail_list}>
                      
                      {item.detailList.map((detail)=>{
                        return(
                        <div key={detail.key + new Date().getTime()} >
                          <span>{detail.key}</span>
                          <span>{(detail.total).toLocaleString('ko-KR')}</span>
                        </div>
                        )
                      })}
                    </div>
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
          
          {currentCalendar.list.length > 0 &&
            <div className={css.calendar_date}>
              {currentCalendar.list.map((day, index)=>{
                return(
                  day ? <div className={day.start ? `${css.able} ${css.start}` : css.able}
                    key={day.number}
                    onClick={(e)=>{
                    e.preventDefault()
                    setEditDate(day.number)}}>
                    <div className={css.day_number} >{day.number}</div>
                    {day.item?.map((item, index)=>{
                      return(
                        <div className={css.history_item} key={index + new Date()}>
                          <div className={css.key}>[{item.key}]</div>
                          <div className={css.value}>
                            <span>{item.explain ? item.explain : '' }</span>
                            <span>{item.value.toLocaleString('ko-KR')}</span>
                          </div>
                        </div>
                      )
                    })}

                  </div>
                  : <div key={index + new Date().getTime()}></div>
                )
              })}
            </div>
          }
          
        </div>
        
        <div className={css.button_box}>
          <button className={css.confirm} onClick={()=> save()}>rhddb 하기</button>
          {/* <button className={css.capture} onClick={()=> capture()}>캡쳐하기</button> */}
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
