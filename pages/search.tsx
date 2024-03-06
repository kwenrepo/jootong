import css from "./search.module.scss";
import { useState, useEffect, useRef } from "react";
import Alert from '@components/modal/Alert';
import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import Link from "next/link";
import { getDateDiff } from '@utils/index';
import Loading from '@components/Loading';

export default function search() {
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

        if(data.length){
          let tempData = data.map((item)=>{
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
    <Layout title={tempKeyword || "검색"}>

      <div className={css.wrap}>
        <div className={css.get_search_key}>
          <i></i>
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
            <span className={css.result_lenght}>
              {/* <MdOutlineSubdirectoryArrowRight size="20"/>  */}
              {keyword} 관련 <b>{searchList.length}개</b>의 결과를 찾았습니다.
            </span>
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
