import { executeQuery } from '#database/index';
import { randomUUID } from "#utils/randomUUID";
import { getTime } from "#utils/getTime";

export default async function handler(req, res) {
  if(req.method === "GET"){
    console.log(req.query.id)
    await executeQuery("SELECT * FROM calendar_item_list", []).then((data)=>{
      console.log('data', data)
      res.send({
        status:true,
        data:data,
        message:"[달력 조회]" 
      });
    }, function(err){
      res.send(err);
    });
   
  } else if (req.method === "POST"){

    if(req.query.type === "normal"){
      console.log("[글 생성", req.body)
      const boardID = randomUUID(5);
      const date = getTime();

      await executeQuery(
        "INSERT INTO board (id, title, content, create_user_key, create_name, create_date) values (?,?,?,?,?,?)",
        [boardID, req.body.content.title, req.body.content.content, req.body.user_key, req.body.create_name, date]).then(async (data)=>{
        if(data.insertId){
          res.send({
            status:true,
            data:{
              title:req.body.title,
              boardID
            },
            message:"글 작성 성공"
          });
        } else {
          res.send({
            status:false,
            message:"글 작성 실패"
          });
        }
      }, function(err){
        res.send(err);
      });
    } else if(req.query.type === "calendar"){
      console.log("[캘린더 리스트 생성", req.query.type, req.body)
      const boardID = randomUUID(5);
      const date = getTime();
      
      await executeQuery(
        "INSERT INTO calendar_item_list (id, title, content, create_user_key, create_name, create_date) values (?,?,?,?,?,?)",
        [boardID, req.body.title, req.body.content, req.body.user_key, req.body.create_name, date]).then(async (data)=>{
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

  res.send(200)

}

