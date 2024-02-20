import { executeQuery } from '@database/index';
import { getFormatedDate } from "@utils/date";

export default async function handler(req, res) {
  if(req.method === "GET"){
    if(req.query.all){
      await executeQuery("SELECT * FROM question", []).then(async function(data){
        res.send({
          status:true,
          data:data,
          message:"전체 문의내역 조회 성공"
        })
      })
    }else if(req.query.user_key){
      let { user_key } = req.query;

      await executeQuery("SELECT * FROM question WHERE user_key = ?", [user_key]).then(async function(data){
        if(data.length){
          res.send({
            status:true,
            data:data,
            message:user_key +" :문의내역 조회 성공"
          })
        }else{
          res.send({
            status:false,
            data:data,
            message:user_key +" :문의내역 없음"
          })
        }
      })
    }
   
  } else if (req.method === "POST"){
    console.log('=== 회원문의 ===', req.body)

    let date = getFormatedDate()
    await executeQuery('INSERT INTO question(user_key, title, content, create_date) values (?, ?, ?, ?)', 
      [req.body.user_key, req.body.question.title, req.body.question.content, date]
      ).then(async function(data){
        if(data.affectedRows){
          res.send({
            status:true,
            message:"문의가 완료 되었습니다."
          })
        }
      })

  } else if (req.method === "PUT"){
    let date = getFormatedDate()
    executeQuery("UPDATE question SET answer = ?, answer_date = ? WHERE idx = ?", [req.body.content, date, req.body.idx]).then(async function(data){
      if(data.changedRows ){
        res.send({
          status:true,
          message:"답변 완료."
        })
      }else{
        res.send({
          status: false,
          message: "에러 : 존재하지 문의 입니다.."
        });
      }
    }, function(err){
      res.send({
        status:false,
        message: err
      });
    });
  }
}
