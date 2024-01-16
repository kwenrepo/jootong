import css from './ListArea.module.scss';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataList, dataListSelector } from "#recoilStore/index";
import Loading from '#components/Loading';
import { getDateDiff } from '#utils/date';
import Link from "next/link";

export default function ListArea() {
  const setDataList = useSetRecoilState(dataListSelector);
  const getDataList = useRecoilValue(dataList);

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [totalList, setTotalList] = useState([]);

  useEffect(() => {
    getCalendarList();
  }, [])

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
        setDataList(data);
      }
    });
  }

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        {getDataList.length > 0 ? 
        <div className={css.item_list_wrap}>
          <ul className={css.item_list_grid}>
            {getDataList.map((item)=>{
              return (
                <li key={item.id}>
                  {item.create_user_key !== "jt" ?
                    <Link href={`/${item.id}@${item.title}`}>
                      <div className={css.item_header}>
                        <span className={css.item_title}>{item.title}</span>
                      </div>
                      <div className={css.item_body}>
                        <div className={css.cap}><i></i>요약</div>

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
                        <span className={css.creator}>
                          <i></i>{item.nickname === '' ? '익명' : item.nickname }
                        </span>
                        <span className={ getDateDiff(item.create_date).type !== 'day' ? `${css.from_date} ${css.new}` : `${css.from_date}` }>
                          <i></i>{getDateDiff(item.create_date).text}
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