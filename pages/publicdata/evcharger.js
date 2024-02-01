import css from './evcharger.module.scss';
import { useEffect, useState, useRef } from 'react';
import { Layout, Loading } from '#components/index';
import { getDateDiff, getFormatedDate } from '#utils/date';
import { xmlToJson } from '#utils/index';
import { useRouter } from 'next/router';

export default function evcharger(){
  const router = useRouter();
 
  const [evChargerList, setEvChargerList] = useState([]);
  const target = useRef();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    rows: 10,
    pageNo : 0,
    zcode : 11
  })
  const [filter, setFilter] = useState(false);
  const [selectedArea, setSelectedArea] = useState('서울');
  const [scrollActive, setScrollActive] = useState(false);
  
  function handleScroll() {
    if (window.scrollY > 19) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } 
    scrollListener(); 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; 
  }, []);

  useEffect(() => {
    getCharger();
  }, [page])
 
  useEffect(() => {

    if(target.current){
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;  // entry가 interscting 중이 아니라면 함수를 실행하지 않음
        if (loading) return;  // 현재 page가 불러오는 중임을 나타내는 flag를 통해 불러오는 중이면 함수를 실행하지 않음
  
        setPage((prev) => {
          return{
            ...page,
            zcode : prev.zcode,
            pageNo : prev.pageNo + 1,
          }
        });
      },{ threshold: 1 });
      observer.observe(target.current);
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
        setEvChargerList(evChargerList.concat(dataList.response.body.items.item));
        setLoading(false);
      }
      
    });
  }

  function zCodeHandler(e){
    window.scrollTo(0, 1000);

    if(e.target.dataset.zcode){
      setEvChargerList([]);
      setPage({
        ...page,
        pageNo:1,
        zcode:e.target.dataset.zcode
      })
      setFilter(false);
      setSelectedArea(e.target.innerText);
    }
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

          <div className={scrollActive ? `${css.filter} ${css.fixed}` : `${css.filter}`}>
            <div className={css.inner}>
              <button className={css.selected} onClick={()=>{setFilter(!filter)}}>{selectedArea}</button>
              {filter && <ul className={css.select_box} onClick={(e)=>{zCodeHandler(e)}}>
                <li data-zcode="41">경기</li>
                <li data-zcode="51">강원</li>
                <li data-zcode="48">경상남도</li>
                <li data-zcode="47">경상북도</li>
                <li data-zcode="29">광주</li>
                <li data-zcode="27">대구</li>
                <li data-zcode="30">대전</li>
                <li data-zcode="26">부산</li>
                <li data-zcode="11">서울</li>
                <li data-zcode="36">세종</li>
                <li data-zcode="31">울산</li>
                <li data-zcode="28">인천</li>
                <li data-zcode="46">전라남도</li>
                <li data-zcode="52">전라북도</li>
                <li data-zcode="50">제주</li>
                <li data-zcode="44">충청남도</li>
                <li data-zcode="43">충청북도</li>
              </ul>}
            </div>
          </div>
          {evChargerList.length > 0 
          ? <ul className={css.list}>
            {evChargerList.map((item)=>{
              return(
                <li key={Math.random() + item.statUpdDt}>
                  <div className={css.item}>
                    <div className={css.name}>
                      <span>{item.statNm}</span>
                      <span className={css.status}>{typeof item.delDetail === 'string' ? `🚫(${item.delDetail})` : "⚡(이용가능)"} </span>
                    </div>
                    <div className={css.address}>
                      <span>📍 주소 : {item.addr}</span>
                      
                    </div>
                    <div className={css.use_time}>
                      <span>상태 : {typeof item.delDetail === 'string' ? item.delDetail : typeof item.useTime === 'string' ? item.useTime : ''}</span>
                      <span>( 📞 : {item.busiCall} )</span>
                    </div>
                    <div className={css.last_update}>갱신일시 : 오늘 </div>
                  </div>
                  
                </li>
              )
            })}
            </ul>
          : <Loading />}
           <div className={css.bottom} ref={target}></div>
        </section>
    </Layout>
  )
}
