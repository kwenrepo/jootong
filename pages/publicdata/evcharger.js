import css from './evcharger.module.scss';
import { useEffect, useState, useRef } from 'react';
import { Layout, Loading } from '#components/index';
import { getDateDiff, getFormatedDate } from '#utils/date';
import { xmlToJson } from '#utils/index';


export default function evcharger(){
 
  const [evChargerList, setEvChargerList] = useState([]);
  const target = useRef();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    rows: 10,
    pageNo : 1,
    zcode : 11
  })

  useEffect(() => {
    getCharger();
  }, [page])
 
  useEffect(() => {
    console.log(target.current)

    if(target.current){
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;  // entry가 interscting 중이 아니라면 함수를 실행하지 않음
          if (loading) return;  // 현재 page가 불러오는 중임을 나타내는 flag를 통해 불러오는 중이면 함수를 실행하지 않음
    
          setPage({
            ...page,
            pageNo : page.pageNo + 1,
          })
     
        });
      });
      observer.observe(target.current, {});
    }


  }, [target.current]);

  function getCharger(){
    setLoading(true);
    const url = 'https://apis.data.go.kr/B552584/EvCharger/getChargerInfo'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'GHwA0ggnlqf2BHlg8AgzTpPqnqB0TUpQ8z9jjRBArg4fbLLAhHu7kxzr1Lb1pzJv9kSc%2BFQdg%2BXJ1t0Qc1BoTA%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(page.pageNo); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(page.rows); /**/
    queryParams += '&' + encodeURIComponent('zcode') + '=' + encodeURIComponent(page.zcode); /**/

    fetch(url + queryParams, {
      method: 'GET',
    })
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, 'application/xml'))
    .then((xml) => {
      if(typeof xml === 'object'){
        let dataList = xmlToJson(xml);
        console.log(dataList.response.body.items.item)
        // dataList.response.body.items.item.reduce((acc, current) => {
        //   if(yearMonth === current.yearMonth){
        //     acc[current.date] = acc[current.date] || [];
        //     acc[current.date].push({
        //       key : current.key,
        //       value : current.value,
        //       explain : current.explain,
        //       yearMonth 
        //     });
        //   }
        //   return acc;
        // }, []);
        setEvChargerList([...evChargerList, dataList.response.body.items.item]);
        setLoading(false);
      }
      
    });
  }

  return(
    <Layout title={"🔌 충전소 정보"}>
 
        <section className={css.wrap} > 
          <div className={css.top}>
            <h1>🔌 전기차 충전소 정보 </h1>

            <button onClick={() => { router.back(); }}>
              <i></i>
              back
            </button>
          </div>
          {evChargerList.length > 0 && !loading
          ? <ul>
            {evChargerList.map((item)=>{
              return(
                <li key={item.statUpdDt}>
                  <div className={css.item}>
                    <div className={css.name}>
                      <span>{item.statNm}</span>
                      {/* <span className={css.status}>{Object.keys(item?.note).length === 0 ? "⚡(이용가능)" : item.note} </span> */}
                    </div>
                    <div className={css.address}>
                      <span>📍 주소 : {item.addr}</span>
                      
                    </div>
                    <div className={css.use_time}>
                      <span>{item.useTime}</span>
                      <span>📞 : {item.busiCall}</span>
                      </div>
                    <div className={css.last_update}>상태갱신일시 : {item.statUpdDt}</div>
                  </div>
                  
                </li>
              )
            })}
            </ul>
          : <Loading />}
           <div className={css.bottom} ref={target}>bottomtothbottom</div>
        </section>
    </Layout>
  )
}
