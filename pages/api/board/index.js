import { executeQuery } from '#database/index';
import { randomUUID } from "#utils/randomUUID";
import { getTime } from "#utils/getTime";

export default async function handler(req, res) {
  if(req.method === "GET"){
    
   
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
    }
  }
}

async function getRoomCountTotal(){
  return await executeQuery("SELECT COUNT(*) count FROM room", []).then((data)=>{
    return data[0].count
  }, function(err){
    return err
  });
}