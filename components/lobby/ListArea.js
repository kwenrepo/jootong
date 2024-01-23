import css from './ListArea.module.scss';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataList, dataListSelector } from "#recoilStore/index";
import Loading from '#components/Loading';
import { getDateDiff, getFormatedDate } from '#utils/date';
import { shuffleArray, xmlToJson } from '#utils/index';
import Link from "next/link";

export default function ListArea() {
  const setDataList = useSetRecoilState(dataListSelector);
  const getDataList = useRecoilValue(dataList);

  const [category, setCategory] = useState("public");
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [evCharger, setEvCharger] = useState({});

  useEffect(() => {
    getCalendarList();
    getWeather();
    getCharger();
  }, [])

  function getCalendarList(){
    fetch('/api/data?isOpen=true', {
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

  function getWeather(){

    const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'GHwA0ggnlqf2BHlg8AgzTpPqnqB0TUpQ8z9jjRBArg4fbLLAhHu7kxzr1Lb1pzJv9kSc%2BFQdg%2BXJ1t0Qc1BoTA%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
    queryParams += '&' + encodeURIComponent('searchDate') + '=' + encodeURIComponent(getFormatedDate({format:'YYYY-MM-DD'})); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/

    fetch(url + queryParams, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("날씨 조회", data)

      if(data.response.body.items.length){
        data.response.body.items[0].informGrade = data.response.body.items[0].informGrade.split(',');
        shuffleArray(data.response.body.items[0].informGrade);
        console.log(data.response.body.items[0])
        setWeather(data.response.body.items[0]);
      }
    });
  }
  
  function getCharger(){
    const url = 'https://apis.data.go.kr/B552584/EvCharger/getChargerInfo'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'GHwA0ggnlqf2BHlg8AgzTpPqnqB0TUpQ8z9jjRBArg4fbLLAhHu7kxzr1Lb1pzJv9kSc%2BFQdg%2BXJ1t0Qc1BoTA%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('zcode') + '=' + encodeURIComponent('11'); /**/

    
    fetch(url + queryParams, {
      method: 'GET',
    })
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, 'application/xml'))
    .then((xml) => {
      if(typeof xml === 'object'){
        let dataList = xmlToJson(xml);
  
        let chargerData = {
          type : 'charger',
          summaryList : dataList.response.body.items.item.map((item)=>{
            return item.statNm
          })
        }

        setEvCharger(chargerData);
      }
      
    });
  }

  const categoryHandler = {
    "public" : function(){
      setCategory('public');
    },
    "calendar" : function(){
      setCategory('calendar');
    }
  }

  return (
    <div className={css.wrap}>
      <div className={css.inner}>

        <div className={css.item_list_wrap}>
          <div className={css.category_list}>
            <span>데이터 목록</span>
            <div className={css.list_tab}>
              <button className={category==='public' ? css.on : ''} onClick={()=>{categoryHandler['public']()}}>공공데이터</button>
              <button className={category==='calendar' ? css.on : ''} onClick={()=>{categoryHandler['calendar']()}}>공유달력</button>
            </div>
          </div>

          {category === 'public' && <ul className={css.item_list_grid}>
            {weather.informGrade?.length > 0 &&
              <li>
                <Link href={'/publicdata/dust'}>
                  <div className={css.item_header}>
                    <span className={css.item_title}>🌤️미세먼지</span>
                  </div>
                  <div className={css.item_body}>
                    <div className={css.cap}><i></i>요약</div>

                    <div className={css.summary}>
                      {weather.informCause}
                      <div className={css.grade}>
                        {weather.informGrade.slice(0, 6).map((item)=>{
                          return <span key={item}>{item}</span>
                        })}
                      </div>
                    </div>
                    
                    
                  </div>

                  <div className={css.item_bottom}>
                    <span className={css.creator}>
                      <i></i>한국환경공단-공공데이터
                    </span>
                    <span className={ getDateDiff(weather.create_date).type !== 'day' ? `${css.from_date} ${css.new}` : `${css.from_date}` }>
                      <i></i>{weather.dataTime}
                    </span>
                  </div>
                </Link>
              </li> 
            }

            {evCharger.summaryList?.length > 0 &&
              <li>
                <Link href={'/publicdata/evcharger'}>
                  <div className={css.item_header}>
                    <span className={css.item_title}>🔌 전기차 충전소</span>
                  </div>
                  <div className={css.item_body}>
                    <div className={css.cap}><i></i>요약</div>

                    <div className={css.summary}>
                      {evCharger.summaryList.slice(0, 6).map((item)=>{
                        return <span key={item}>{item}</span>
                      })}
                    </div>
                    
                    
                  </div>

                  <div className={css.item_bottom}>
                    <span className={css.creator}>
                      <i></i>한국환경공단-공공데이터
                    </span>
                    {/* <span className={ getDateDiff(weather.create_date).type !== 'day' ? `${css.from_date} ${css.new}` : `${css.from_date}` }>
                      <i></i>{weather.dataTime}
                    </span> */}
                  </div>
                </Link>
              </li> 
            }
          </ul>}

          {category === 'calendar' && <ul className={css.item_list_grid}>
            {getDataList.map((item)=>{
              return (
                <li>
                  <Link href={`/${item.id}/${item.title}`}>
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
                </li>
              );
            })}
          </ul>}
        
        </div>

      </div>
    </div>
  );
}