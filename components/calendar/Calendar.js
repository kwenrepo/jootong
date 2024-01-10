import css from './Calendar.module.scss'
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { getToday } from '#utils/date';
import Alert from '#components/modal/Alert';

export default function Calendar({title, titleHandler}){
  const {data: session} = useSession();
  const router = useRouter();

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
  const [editDate, setEditDate] = useState(0);
  const [monthItemList, setMonthItemList] = useState([]);
  const [summaryList, setSummaryList] = useState([]);
  const [addItem, setAddItem] = useState({})

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
           key={(i - currentCalendar.startIndex) + new Date().getTime()}
           onClick={(e)=>{
            e.preventDefault()
            setEditDate((i - currentCalendar.startIndex) + 1)}}
           >
            <div className={css.day_number} >{(i - currentCalendar.startIndex) + 1}</div>
            {currentCalendar.monthItem[(i - currentCalendar.startIndex) + 1] && currentCalendar.monthItem[(i - currentCalendar.startIndex) + 1].map((item, index)=>{
              return(
                <div className={css.history_item} key={index + new Date()} onClick={(e)=>{ e.preventDefault(); addItemHandler['edit']((i - currentCalendar.startIndex) + 1, item)}}>
                  <div className={css.text}>
                    <span>{item.description ? item.description : item.key }</span>
                    <span>{item.value.toLocaleString('ko-KR')}</span>
                  </div>
                  <button className={css.delete} onClick={(e)=>{e.stopPropagation(); itemListManager['delete']((i - currentCalendar.startIndex) + 1, item)}}></button>
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

  function save(){
    if(title===""){
      setAlertData({
        isAlert:true,
        message:<span>제목을 작성해 주세요.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    }else if(monthItemList.length < 1){
      setAlertData({
        isAlert:true,
        message:<span>달력에 입력된 데이터가 없습니다.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    }
    let jsonArray = JSON.stringify(monthItemList);
    console.log('jsonArray', jsonArray)

    let data = {
      user_key : session ? session?.user?.user_key : 'empty',
      title,
      content : jsonArray,
      create_name : session ? session?.user?.user_name : 'empty'
    }

    fetch("/api/data?keyword=calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        console.log('return data', data)
        setAlertData({
          isAlert:true,
          message:<span>저장이 완료 되었습니다.</span>,
          confirm:<button onClick={()=>{ 

            router.push({
              pathname: '/' + data.boardID + '@' + data.title
            })
          
          }}>공유하러 가기</button>,
          cancel:<button onClick={()=>{ router.back(); }}>확인</button>
        })
      }

    });
    

  }
  const addItemHandler = {
    add : function(e){
      let {name, value} = e.target;
      if(name === 'value') value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

      setAddItem({
        ...addItem,
        [name]: name === "value" ? Number(value) : value,
        yearMonth: currentCalendar.yearMonth
      })
    
    },
    reset : function(){
      setAddItem({
        key:'',
        value:'',
        description:''
      })
    },
    edit: function(i, target){
      setEditDate(i)
      const found = monthItemList.findIndex((item) => item.date === i && item.description === target.description && item.yearMonth === target.yearMonth);
      
      setAddItem({
        key:target.key,
        value: target.value || 0,
        description: target.description || target.key,
        isEdit: true,
        editIndex : found
      })
    }
  }

  const itemListManager = {
    add : function(){
      if(!addItem.key){
        setAlertData({
          isAlert:true,
          message:<span>항목을 입력해주세요.</span>,
          cancel:<button onClick={()=>{
            setAlertData({
              isAlert:false
            })
          }}>확인</button>
        })
        return false;
      }

      const isCheckIndex = monthItemList.findIndex((item) => 
        item.date === editDate && 
        item.description === addItem.description &&
        item.key === addItem.key  &&
        item.yearMonth === addItem.yearMonth
      );
    
      if(isCheckIndex >= 0) monthItemList.splice(isCheckIndex, 1);
      setMonthItemList([...monthItemList, { 
        key : addItem.key || '', 
        value: addItem.value || 0,
        description: addItem.description ||  addItem.key,
        year:currentCalendar.year,
        month:currentCalendar.month,
        date:editDate,
        yearMonth: currentCalendar.yearMonth
      }]);
      setEditDate('');
      addItemHandler['reset']();
    },
    cancel : function(){
      setEditDate('');
      addItemHandler['reset']();
    },
    delete: function(date, target){
      let deleteList = monthItemList.filter((item)=>{
        return item.date !== date || item.description !== target.description || item.key !== target.key || item.yearMonth !== target.yearMonth ;
      })

      setMonthItemList(deleteList);
    },
    edit: function(){
      monthItemList[addItem.editIndex].key = addItem.key;
      monthItemList[addItem.editIndex].value = addItem.value || 0;
      monthItemList[addItem.editIndex].description = addItem.description || addItem.key;
      monthItemList[addItem.editIndex].yearMonth = addItem.yearMonth;

      setMonthItemList([...monthItemList])
      setEditDate("");
      addItemHandler['reset']();

    }
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


  return(
    <>
      <section className={css.wrap}>
                 
        <div className={`${css.set_title}`}>
          <input type="text" value={title || ""} onChange={(e)=> titleHandler(e)} placeholder="제목을 작성해 주세요." />
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
          {editDate > 0 && 
            <div className={css.edit_box}>
              <div className={css.inner}>
                <h1>{editDate}일</h1>
                <dl>
                  <dt>그룹(항목)</dt>
                  <dd>
                    <input type='text' placeholder='치킨' name='key' value={addItem.key || ''} onChange={(e)=>{addItemHandler['add'](e)}} />
                  </dd>
                </dl>
                <dl>
                  <dt>내역</dt>
                  <dd>
                    <input type='text' placeholder='0' name='value' value={(addItem.value || 0).toLocaleString()} onChange={(e)=>{addItemHandler['add'](e)}}  />
                  </dd>
                </dl>
                <dl>
                  <dt>설명</dt>
                  <dd>
                    <input type='text' placeholder='굽네치킨' name='description' value={addItem.description || ''} onChange={(e)=>{addItemHandler['add'](e)}}  />
                  </dd>
                </dl>
                <div className={css.button_wrap}>
                {addItem.isEdit
                  ? <button onClick={()=>{itemListManager['edit']()}}>수정</button>
                  : <button onClick={()=>{itemListManager['add']()}}>추가</button>
                } 
                  <button onClick={()=>{itemListManager['cancel']()}}>취소</button>
                </div>
              </div>
            </div>
          }
        </div>
        
        <div className={css.button_box}>
          <button className={css.confirm} onClick={()=> save()}>저장하고 공유하기</button>
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
