import css from './ListArea.module.scss';
import { useEffect, useState } from 'react';
import Loading from '#components/Loading';
import { getDateDiff } from '#utils/date';
import Link from "next/link";


export default function ListArea() {
  
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [totalList, setTotalList] = useState([]);

  useEffect(() => {
    getCalendarList();
  }, [])

  useEffect(()=>{
    console.log(totalList)
  }, [totalList])

  function getCalendarList(){
    
    fetch('/api/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.status){
        let {data} = result;
        data[0].summaryOfContent = Object.values(JSON.parse(data[0].content))[0]

        setTotalList([...totalList, data[0]])
      }
    });
  }

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        {totalList.length > 0 ? 
        <div className={css.item_list_wrap}>
          <ul className={css.item_list_grid}>
            {totalList.map((item)=>{
              return (
                <li key={item.id}>
                  {item.create_user_key !== "jt" ?
                    <Link href={`/${item.id}@${item.title}`}>
                      <div className={css.item_header}>
                        <span className={css.item_title}>{item.title}</span>
                      </div>
                      <div className={css.item_body}>
                        <div className={css.cap}>요약달력</div>

                        <div className={css.summary_calendar}>
                          <div>
                            <div className={css.day_number}>
                              {item.summaryOfContent.year}.{" "}
                              {item.summaryOfContent.month + 1}.{" "}
                              {item.summaryOfContent.date}
                            </div>

                            <div className={css.history_item}>
                              <div className={css.text}>
                                <span>
                                  {item.summaryOfContent.description
                                    ? item.summaryOfContent.description
                                    : item.summaryOfContent.key}
                                </span>
                                <span>
                                  {item.summaryOfContent.value.toLocaleString(
                                    "ko-KR"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={css.item_bottom}>
                        <span className={ getDateDiff(item.create_date).type !== 'day' ? `${css.from_date} ${css.new}` : `${css.from_date}` }>
                          {getDateDiff(item.create_date).text}
                        </span>
                      </div>
                    </Link>
                  : ''}
                </li>
              );
            })}
          </ul>
        </div> : <Loading />}

      </div>
    </div>
  );
}