import { executeQuery } from '#database/index';
import { randomUUID } from "#utils/randomUUID";
import { getFormatedDate } from "#utils/date";

export default async function handler(req, res) {
  if(req.method === "GET"){
    if(req.query.key){
      console.log(req.query.key)
      await executeQuery("SELECT * FROM data WHERE id = ?", [req.query.key]).then((data)=>{
        console.log('data', data)
        res.send({
          status:true,
          data:data,
          message:"[달력 조회]" 
        });
      }, function(err){
        res.send(err);
      });
    }else{
      await executeQuery("SELECT * FROM data").then((data)=>{
        console.log('data', data)
        res.send({
          status:true,
          data:data,
          message:"[달력 조회]" 
        });
      }, function(err){
        res.send(err);
      });
    }
 
   
  } else if (req.method === "POST"){

    console.log("[캘린더 리스트 생성]", req.query.keyword)
    const boardID = randomUUID(5);
    const create_date = getFormatedDate();
    
    await executeQuery(
      "INSERT INTO data (id, title, keyword, content, create_user_key, create_name, create_date) values (?,?,?,?,?,?)",
      [boardID, req.body.title, req.query.keyword, req.body.content, req.body.user_key, req.body.create_name, create_date]).then(async (data)=>{
      if(data.insertId){
        res.send({
          status:true,
          data:{
            title:req.body.title,
            boardID
          },
          message:"캘린더 작성 성공"
        });
      } else {
        res.send({
          status:false,
          message:"캘린더 작성 실패"
        });
      }
    }, function(err){
      res.send(err);
    });
  }

}

