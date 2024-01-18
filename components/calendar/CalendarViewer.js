import css from './CalendarViewer.module.scss';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index";
import html2canvas from "html2canvas";
import { getToday } from '#utils/date';
import { Alert } from '#components/index';

export default function CalendarViewer({title, setTitle, isEdit, setIsEdit, monthItemList=[]}){
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

  const changeCalendar = {
    prev : function(){
      setSelectMonth(new Date(currentCalendar.year, currentCalendar.month - 1, 1));
    },
    next : function(){
      setSelectMonth(new Date(currentCalendar.year, currentCalendar.month + 1, 1));
    }
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
      const canvas = await html2canvas(captureRef.current, { scale: 1 });
      // canvas.toBlob((blob) => {
      //   console.log(blob)
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

  function calendarDelete(){
    setAlertData({
      isAlert:true,
      message:<span>정말 삭제 하시겠습니까? <br /> 삭제 후 복구가 불가합니다.</span>,
      confirm:<button onClick={()=>{
        let data = {
          edit_key : router.query.calendar[0]
        }

        fetch("/api/data?keyword=calendar", {
          method: "DELETE",
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
              message:<span>삭제가 완료 되었습니다</span>,
              confirm:<button onClick={()=>{ 
                router.push('/')
              }}>확인</button>
            })
          }
    
        });
      }}>삭제</button>,
      cancel:<button onClick={()=>{
        setAlertData({
          isAlert:false
        })
      }}>취소</button>
    })
  }

  useEffect(()=>{
    setTitle(title);
  }, [title])

  return(
    <>
      <section className={css.wrap}>
        <div className={css.calendar_wrap} ref={captureRef}>
          <div className={`${css.set_title}`}>
            <span>{title || ""}</span>
          </div>

          <div className={css.calendar}>
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
                        <div className={css.indent_area}><i></i></div>
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
                      day ? <div className={day.start ? `${css.able} ${css.start}` : css.able} key={day.number}>
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
                      : <p key={index + new Date().getTime()}></p>
                    )
                  })}
                </div>
              }
            </div>
            
          </div>
        </div>

        <div className={css.button_wrap}>
          <button className={css.share} onClick={()=> share()}>
            <i></i>공유 하기
          </button>
          <button className={css.capture} onClick={()=> capture()}>
            <i></i>캡쳐 하기
          </button>
          {getUser.user_key && getUser.user_key === isEdit.user_key && <button className={css.edit} onClick={()=> setIsEdit({...isEdit, status:true})}><i></i>수정 하기</button>}
          {getUser.user_key && getUser.user_key === isEdit.user_key && <button className={css.delete} onClick={() => {calendarDelete()}}><i></i>삭제 하기</button>}
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
