
import css from './CalendarEditor.module.scss'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { user } from "@recoilStore/index";
import { getToday } from '@utils/date';
import html2canvas from "html2canvas";
import { Alert } from '@components/index';

export default function CalendarEditor({title, setTitle, isEdit, setIsEdit, monthItemList = [], setMonthItemList, isOpen = 0}){
  const getUser = useRecoilValue(user);
  const router = useRouter();
  const captureRef = useRef(null);
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  const [selectMonth, setSelectMonth] = useState(new Date(getToday()));
  const [editDate, setEditDate] = useState(0);
  const [addItem, setAddItem] = useState({})
  const [optionIsOpen, setOptionIsOpen] = useState(isOpen);
  const currentCalendar = useMemo(()=>{
    if(selectMonth){
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
  
      return {
        year,
        month,
        yearMonth,
        list: tempCalendar
      }
    }
  }, [selectMonth, monthItemList])

  const summaryList = useMemo(()=>{
    const getKeyValues = monthItemList?.reduce((acc, current) => {
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

    return getKeyValueArray
  }, [currentCalendar])

  function save(){
    if(title===""){
      setAlertData({
        isAlert:true,
        message:<span>이름을 작성해 주세요.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    } else if(monthItemList.length < 1){
      setAlertData({
        isAlert:true,
        message:<span>입력된 데이터가 없습니다.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    } else if(!getUser.user_key){
      setAlertData({
        isAlert:true,
        message:<span>익명으로 저장 하시면 수정이 불가합니다.</span>,
        confirm:<button onClick={()=>{ 
          let arrayToJson = JSON.stringify(monthItemList);
          let data = {
            user_key : getUser.user_key || '',
            title,
            content : arrayToJson,
            nickname : getUser.nickname || '',
            is_open : optionIsOpen
          }
      
          fetch("/api/data?keyword=calendar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((result) => {
            if(result.status){
              const { data } = result;
              setAlertData({
                isAlert:true,
                message:<span>저장이 완료 되었습니다.</span>,
                confirm:<button onClick={()=>{ 
                  router.push({
                    pathname: '/' + data.boardID + '/' + data.title
                  })
                }}>보러가기</button>,
                cancel:<button onClick={()=>{ router.back(); }}>확인</button>
              })
            }
      
          });
        }}>확인 </button>,
        cancel:<button onClick={()=>{
          router.push('/auth/signin')
        }}>로그인</button>
      })
      return false;
    }else{
      let arrayToJson = JSON.stringify(monthItemList);
      let data = {
        user_key : getUser.user_key || '',
        title,
        content : arrayToJson,
        nickname : getUser.nickname || '',
        is_open : optionIsOpen
      }
      fetch("/api/data?keyword=calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.status){
          const { data } = result;
          setAlertData({
            isAlert:true,
            message:<span>저장이 완료 되었습니다.</span>,
            confirm:<button onClick={()=>{ 
              router.push({
                pathname: '/' + data.boardID + '/' + data.title
              })
            }}>보러가기</button>,
            cancel:<button onClick={()=>{ router.back(); }}>확인</button>
          })
        }
  
      });
    }
  }

  function edit(){
    if(title===""){
      setAlertData({
        isAlert:true,
        message:<span>이름을 작성해 주세요.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    } else if(monthItemList.length < 1){
      setAlertData({
        isAlert:true,
        message:<span>입력된 데이터가 없습니다.</span>,
        cancel:<button onClick={()=>{
          setAlertData({
            isAlert:false
          })
        }}>확인</button>
      })
      return false;
    } 

    let arrayToJson = JSON.stringify(monthItemList);
    let data = {
      title,
      content : arrayToJson,
      edit_key : router.query.calendar[0],
      is_open : optionIsOpen
    }

    fetch("/api/data?keyword=calendar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.status){
        const { data } = result;
        setAlertData({
          isAlert:true,
          message:<span>수정이 완료 되었습니다.</span>,
          confirm:<button onClick={()=>{
            setMonthItemList(monthItemList);
            setIsEdit({...isEdit, status:false});
          }}>확인</button>,
        })
      }

    });
    
  }

  async function capture() {
    if (!captureRef.current) return;

    try {
      const target = captureRef.current;
      const canvas = await html2canvas(target, { scale: 1 });
      // canvas.toBlob((blob) => {
      //   if (blob !== null) {
      //     saveAs(blob, `calendar_${currentCalendar.year}_${currentCalendar.month + 1}.png`);
      //   }
      // });
      download(canvas.toDataURL("image/png", 1), `calendar_${currentCalendar.year}_${currentCalendar.month + 1}.png`);  

    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  const download = (url, filename) => {
    const linkElement = document.createElement('a');
    linkElement.download = filename;
    linkElement.href = url;
    linkElement.style.display = 'none';
  
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

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
        explain:''
      })
    },
    edit: function(i, target){
      setEditDate(i)
      const found = monthItemList.findIndex((item) => item.date === i && item.explain === target.explain && item.yearMonth === target.yearMonth);
      
      setAddItem({
        key:target.key,
        value: target.value || 0,
        explain: target.explain || target.key,
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
        item.explain === addItem.explain &&
        item.key === addItem.key  &&
        item.yearMonth === addItem.yearMonth
      );
    
      if(isCheckIndex >= 0) monthItemList.splice(isCheckIndex, 1);
      setMonthItemList([...monthItemList, { 
        key : addItem.key || '', 
        value: addItem.value || 0,
        explain: addItem.explain ||  addItem.key,
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
        return item.date !== date || item.explain !== target.explain || item.key !== target.key || item.yearMonth !== target.yearMonth;
      })
      setMonthItemList(deleteList);
    },
    edit: function(){
      monthItemList[addItem.editIndex].key = addItem.key;
      monthItemList[addItem.editIndex].value = addItem.value || 0;
      monthItemList[addItem.editIndex].explain = addItem.explain || addItem.key;
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
    setTitle(title);
  }, [title])
  return(
    <>
      <section className={css.wrap}>
        <div className={css.calendar_wrap}>
          <div className={`${css.set_title}`}>
            <input type="text" value={title || ""} onChange={(e)=> setTitle(e.target.value)} placeholder="달력 이름을 지어주세요." />
          </div>

          <div className={css.calendar} ref={captureRef}>
            <div className={css.calendar_header}>
              <h1>{currentCalendar.year}. {currentCalendar.month + 1}월</h1>
              <div className={css.button_box}>
                <button className={css.prev} onClick={()=>{changeCalendar['prev']()}}>
                  <i></i>
                </button>
                <button className={css.next} onClick={()=>{changeCalendar['next']()}}>
                  <i></i>
                </button>
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
                        <button></button>
                      </div>
                      <div className={css.detail_list}>
                        <div className={css.indent_area}>
                          <i></i>
                        </div>
                        <div className={css.list}>
                          {item.detailList.map((detail)=>{
                            return(
                              <div key={detail.key + new Date().getTime()} >
                                <span>{detail.key}</span>
                                <span>{(detail.total).toLocaleString('ko-KR')}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>}

            <div className={css.calendar_scroll_with}>

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
                          <div className={css.history_item} key={index + new Date()} onClick={(e)=>{ 
                            e.preventDefault(); 
                            addItemHandler['edit'](day.number, item)}
                          }>
                            <div className={css.key}>[{item.key}]</div>
                            <div className={css.value}>
                              <span>{item.explain ? item.explain : '' }</span>
                              <span>{item.value.toLocaleString('ko-KR')}</span>
                              <button className={css.delete} onClick={(e)=>{
                                e.stopPropagation(); itemListManager['delete'](day.number, item)}}>
                                <i>삭제</i>                                
                              </button>
                            </div>
                          </div>
                        )
                      })}

                    </div>
                    : <p key={index + new Date().getTime()} className={css.empty}></p>
                  )
                })}
              </div>
            }

            </div>


            
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
                      <input type='text' placeholder='굽네치킨' name='explain' value={addItem.explain || ''} onChange={(e)=>{addItemHandler['add'](e)}}  />
                    </dd>
                  </dl>
                  <div className={css.button_box}>
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
        </div>

        <div className={css.option}>
          <label className={css.open}>
            <input type="checkbox" checked={optionIsOpen || false} onChange={(e)=>{setOptionIsOpen(e.target.checked)}} />
            <i></i>
            <span>검색 리스트 보여지기</span>
          </label>
        </div>
        
        <div className={css.button_wrap}>
          {isEdit?.status
            ? <>
                <button className={css.edit} onClick={()=> edit()}><i></i>수정 완료</button>
                <button className={css.cancel} onClick={()=> { setIsEdit({...isEdit, status:false}) }}><i></i>취소 하기</button>
              </>
            : <>
                <button className={css.confirm} onClick={()=> save()}>
                  <i></i>
                  저장하고 공유하기</button>
                <button className={css.capture} onClick={()=> capture()}>
                  <i></i>
                  캡쳐 하기</button>
              </> 
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
    </>
  )
}
