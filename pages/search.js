import css from "./search.module.scss";
import { useState, useEffect, useRef } from "react";
import Alert from '#components/modal/Alert';
import Layout from '#components/Layout';
import { useRouter } from 'next/router';
import Link from "next/link";
import { getDateDiff } from '#utils/date';
import Loading from '#components/Loading';

export default function search() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState(keyword);
  const [searchList, setSearchList] = useState([])
  const [alertData, setAlertData] = useState({
    isAlert:false,
    message:"",
    confirm:<button></button>,
    cancel:<button></button>
  });
  
  function searchHandler(e){
    setTempKeyword(e.target.value)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setKeyword(tempKeyword);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tempKeyword]);

  useEffect(()=>{
    fetch(`/api/search?keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.status){
        let {data} = result;
        console.log(data)

        if(data.length){
          let tempData = data.map((item)=>{
            console.log(item)
            item.summaryOfContent = Object.values(JSON.parse(item.content))[0]

            return item;
          })

          setSearchList(tempData)
        }else{
          setSearchList([])
        }
      }
    })
  }, [keyword])

  
  return (
    <Layout>
      <div className={css.wrap}>
        <div className={css.get_search_key}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={tempKeyword}
            onChange={(e) => {
              searchHandler(e);
            }}
          />
        </div>
        
        {keyword && searchList.length === 0 && <div className={css.search_result}>
          {keyword} 관련 검색 내용이 없습니다.
        </div>}
        {searchList.length > 0 && (
          <div className={css.search_result}>
            <span className={css.result_lenght}>{keyword} 관련 <b>{searchList.length}개</b>의 결과를 찾았습니다.</span>
            <ul className={css.item_list_grid}>
              {searchList.map((item) => {
                return (
                  <li key={item.create_date}>
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
                        <span
                          className={
                            getDateDiff(item.create_date).type !== "day"
                              ? `${css.from_date} ${css.new}`
                              : `${css.from_date}`
                          }
                        >
                          {getDateDiff(item.create_date).text}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {alertData.isAlert && (
        <Alert
          props={{
            message: <span>{alertData.message}</span>,
            confirm: alertData.confirm,
            cancel: alertData.cancel,
          }}
        />
      )}
    </Layout>
  );
}
