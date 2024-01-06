import { useEffect, useRef, useState } from 'react'
import css from './Calendar.module.scss'
import { getToday } from '#utils/date';
export default function Calendar(){
  const title = useRef();
  const [selectMonth, setSelectMonth] = useState(new Date(getToday()));
  const [currentCalendar, setCurrentCalendar] = useState({
    year:0,
    month:0,
    todayDate:0,
    startDate:0,
    totalDate:0,
  });
  const [addButton, setAddButton] = useState(false);
  const [editDate, setEditDate] = useState(0);
  const [addItem, setAddItem] = useState('');
  const [itemList, setItemList] = useState([]);

  function calcCurrentCalendar(){
    const year = selectMonth.getFullYear();
    const month = selectMonth.getMonth();
    const todayDate = selectMonth.getDate();

    const startDate = new Date(year, month, 0).getDay() + 1;

    const totalDate = new Date(year, month + 1, 0).getDate();


    setCurrentCalendar({
      year,
      month,
      todayDate,
      startDate,
      totalDate
    })

    console.log(
      'year :', year,
      'month :', month,
      'todayDate :', todayDate,
      'startDate :', startDate,
      'totalDate :', totalDate
    )
  }

  function RenderDaysElement(){
    const days = [];
    for(let i = 0; i <= currentCalendar.totalDate; i++){
      if(i < currentCalendar.startDate){
        days.push(
          <div className={css.disable} key={i}></div>
        );
      }else{
        days.push(
          <div className={i === currentCalendar.startDate ? `${css.able} ${css.start}` : `${css.able}`} 
          key={i} 
          onClick={()=>{setEditDate(i)}}>
            <div className={css.day_number}>{i}</div>
            {editDate === i && <div className={css.edit_box}>
              {itemList.length > 0 
              ? <ul className={css.item_list}>
                {itemList.map((item)=>{
                  return (
                    <li key={item}>
                      {item.key && <span>{item.key}</span>}
                      {item.value && <span>{item.value}</span>}
                    </li>
                  )
                })}
              </ul>
              :<span className={css.empty}>
                 <input type='text' placeholder='추가할 항목을 입력해주세요.' value={addItem} onChange={(e)=>{addItemHandler(e)}} />
                <div className={css.button_wrap}>
                  <button onClick={()=>{itemListManager['add']()}}>추가</button>
                  <button onClick={()=>{itemListManager['cancel']()}}>취소</button>
                </div>
              </span> }
            </div>}
          </div>
        );
      }
    }

    return <div className={css.calendar_date}>{days}</div>
  }

  function setTitle(e){
    if(!session) {
      openWindow('/auth/signin', '로그인', '_blank')
      return false;
    }
    title.current = e.target.value;
  }

  function addItemHandler(e){
    setAddItem(e.target.value)
  }

  const itemListManager = {
    add : function(){
      if(addItem !== '') setItemList([...itemList, { key : addItem, value:0}]);
      setAddItem('');
      setAddButton(false);
    },
    cancel : function(){
      setAddItem('');
      setAddButton(false);
    }
  }

  useEffect(()=>{
    if(selectMonth) calcCurrentCalendar();
  }, [selectMonth])

  useEffect(()=>{
    console.log( currentCalendar.startDate)

  }, [currentCalendar])

  return(
    <>
      <section className={css.wrap}>
                 
        <div className={`${css.set_title}`}>
          <input type="text" onChange={(e)=> setTitle(e)} placeholder="제목을 작성해 주세요." />
        </div>

        <div className={css.calendar_wrap}>
          <div className={css.calendar_header}>2024년 1월</div>
          <div className={css.data_list}>
            <button className={css.add_button} onClick={()=>{setAddButton(!addButton)}}>항목 추가 +</button>

            {addButton && <div className={css.add_item_input}>
              <input type='text' placeholder='추가할 항목을 입력해주세요.' value={addItem} onChange={(e)=>{addItemHandler(e)}} />
              <div className={css.button_wrap}>
                <button onClick={()=>{itemListManager['add']()}}>추가</button>
                <button onClick={()=>{itemListManager['cancel']()}}>취소</button>
              </div>
            </div>}
            
            {itemList.length > 0 && <ul className={css.item_list}>
              {itemList.map((item)=>{
                return (
                  <li key={item}>
                    {item.key && <span>{item.key}</span>}
                    {item.value && <span>{item.value}</span>}
                  </li>
                )
              })}
            </ul>}

          </div>
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
          <button className={css.confirm} onClick={()=>save()}>완료</button>
          <button onClick={()=> router.back()}>취소</button>
        </div>
      </section>
    </>
  )
}