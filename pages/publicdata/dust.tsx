import css from './dust.module.scss';
import { useEffect, useState } from 'react';
import { Layout, Loading } from '@components/index';
import { getDateDiff, getFormatedDate } from '@utils/index';
import { shuffleArray } from '@utils/index';
import { useRouter } from 'next/router';

export default function weather(){
  const router = useRouter();
  const [weatherItem, setWeatherItem] = useState([]);

  useEffect(() => {
    getWeather();
  }, [])

  function getWeather(){
    const url = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth'; /*URL*/
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
      if(data.response.body.items.length){
        data.response.body.items[0].informGrade = data.response.body.items[0].informGrade.split(',');
        shuffleArray(data.response.body.items[0].informGrade);
        setWeatherItem(data.response.body.items);
      }
    });
  }

  return(
    <Layout title={"🌤️ 미세먼지 통계"}>
      {weatherItem.length > 0 
        ? 
        <section className={css.wrap}>
          <div className={css.top}>
            <h1>우리나라 미세먼지 / 초미세먼지 </h1>

            <button onClick={() => { router.back(); }}>
              <i></i>
              back
            </button>
          </div>
          <div className={css.time}>
            {weatherItem[0].dataTime} - 한국환경공단-공공데이터
          </div>
          <div className={css.cause}>
          💨 {weatherItem[0].informCause}
          </div>
          <div className={css.route}>
            <span>🌏 미세먼지 - 예상 변화</span>
            <div className={css.pm10_box}>
              <img src={weatherItem[0].imageUrl1 || ''} alt="" />
              ➡️
              <img src={weatherItem[0].imageUrl2 || ''} alt="" />
              ➡️
              <img src={weatherItem[0].imageUrl3 || ''} alt="" />
            </div>

            <span>🌏 초미세먼지 - 예상 변화</span>

            <div className={css.pm25_box}>
              <img src={weatherItem[0].imageUrl4 || ''} alt="" />
              ➡️
              <img src={weatherItem[0].imageUrl5 || ''} alt="" />
              ➡️
              <img src={weatherItem[0].imageUrl6 || ''} alt="" />
            </div>
            
          </div>

          <div className={css.over_roll}>
            <span>🗺️ {weatherItem[0].informOverall}</span>
            <ul>
              {weatherItem[0].informGrade.map((item)=>{
                return <li key={item}>{item}</li>
              })}
            </ul>
          </div>
        </section>
          
        : <Loading />
      }
    </Layout>
  )
}
