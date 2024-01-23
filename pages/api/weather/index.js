
import { getFormatedDate } from '#utils/date';

export default async function handler(req, res) {
  if(req.method === "GET"){
    console.log(" === 날씨 조회 ===")
    const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'GHwA0ggnlqf2BHlg8AgzTpPqnqB0TUpQ8z9jjRBArg4fbLLAhHu7kxzr1Lb1pzJv9kSc%2BFQdg%2BXJ1t0Qc1BoTA%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
    queryParams += '&' + encodeURIComponent('searchDate') + '=' + encodeURIComponent(getFormatedDate({format:'YYYY-MM-DD'})); /**/
    queryParams += '&' + encodeURIComponent('InformCode') + '=' + encodeURIComponent('PM10'); /**/

    fetch(url + queryParams, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.response.header.resultCode === "00"){
        res.send({
          status:true,
          data : data.response.body.items,
          message:"날씨(먼지) 조회 성공"
        }) 
      }
    });
  }
}


  // const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getUnityAirEnvrnIdexSnstiveAboveMsrstnList'; /*URL*/
  // let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'GHwA0ggnlqf2BHlg8AgzTpPqnqB0TUpQ8z9jjRBArg4fbLLAhHu7kxzr1Lb1pzJv9kSc%2BFQdg%2BXJ1t0Qc1BoTA%3D%3D'; /*Service Key*/
  // queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
  // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + 10
  // queryParams += '&' + encodeURIComponent('pageNo') + '=' +2

  // fetch(url + queryParams, {
  //   method: 'GET',
   
  // })
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log("weather", data)

  //   if(data.response.header.resultCode === "00"){
  //     console.log("weather", data.response.body.items)
  //     // res.send({
  //     //   status:true,
  //     //   data : data.response.body.items,
  //     //   message:"날씨(먼지) 조회 성공"
  //     // }) 
  //   }
  // });