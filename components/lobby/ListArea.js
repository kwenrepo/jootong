import css from './ListArea.module.scss';
import { useEffect, useState } from 'react';
import Loading from '#components/Loading';
import { getTimeDiff } from '#utils/getTimeDiff';
import Link from "next/link";

export default function ListArea() {
  
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  useEffect(() => {

    fetch('/api/weather', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status){
        console.log(data)
        setWeather(data.data[0])
      }
    });

  }, [])

  useEffect(()=>{

    if(weather){
      console.log(weather)
      setLoading(false);
    }
  }, [weather])


  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <div className={css.list_top}>
          <div className={css.search}>
            <form>
              <label>
                <input type="text" placeholder="검색 키워드" onChange={(e)=>{  }}/>
                <button onClick={(e)=> {}}></button>
              </label>
            </form>
            <button className={css.refresh} onClick={()=>{}}></button>
          </div>

          <div className={css.button_group}>
            <Link className={css.create_room} href="/create">만들기</Link>
            <button
              className={css.total_chat}
              onClick={() => {}}
            >
            </button>
            
          </div>
        </div>

        {!loading && weather ? <div className={css.item_list_wrap}>
          <ul className={css.item_list}>
            <li>
              <div className={css.item_header}>
                날씨
              </div>
              <div className={css.item_body}>
                <span>
                  {weather?.dataTime}                
                </span>
                <span>{weather?.informCause}</span>
                
              </div>
            </li>
            
          </ul>
        </div> : <Loading />}

      </div>
    </div>
  );
}