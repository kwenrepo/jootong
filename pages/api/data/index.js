import { executeQuery } from '@database/index';
import { randomUUID } from "@utils/randomUUID";
import { getFormatedDate } from "@utils/date";

export default async function handler(req, res) {
  if(req.method === "GET"){
    
    if(req.query.key){
      console.log("req.query.key", req.query.key)
      await executeQuery("SELECT * FROM data WHERE id = ?", [req.query.key]).then((data)=>{
        console.log(' === 달력 조회 === : ', data)
        res.send({
          status:true,
          data:data,
          message:"[달력 조회]" 
        });
      }, function(err){
        res.send(err);
      });
    }else if(req.query.user_key){
      console.log('=== 유저의 달력 조회 ===', req.query.user_key)
      await executeQuery("SELECT * FROM data WHERE user_key = ? ORDER BY create_date DESC", [req.query.user_key]).then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"[유저 달력 조회]" 
        });
      }, function(err){
        res.send(err);
      });
    }else if(req.query.isOpen){
      await executeQuery("SELECT * FROM data WHERE is_open = 1 ORDER BY create_date DESC").then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"[달력 조회]" 
        });
      }, function(err){
        res.send(err);
      });
    } else {
      await executeQuery("SELECT * FROM data ORDER BY create_date DESC").then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"[달력 total 조회]" 
        });
      }, function(err){
        res.send(err);
      });
    }
 
   
  } else if (req.method === "POST"){
    if(req.query.keyword === 'calendar'){
      console.log("=== 달력 생성 ===", req.body);
      const {title, content, user_key, nickname, is_open} = req.body;
      const boardID = randomUUID(5);
      const create_date = getFormatedDate();
      
      await executeQuery(
        "INSERT INTO data (id, title, content, user_key, nickname, create_date, is_open, keyword) values (?,?,?,?,?,?,?,?)",
        [boardID, title, content, user_key, nickname, create_date, is_open, req.query.keyword]).then(async (data)=>{
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
  } else if (req.method === "PUT"){
    if(req.query.keyword === 'calendar'){
      console.log("=== 달력 수정 === : ", req.body);
      const {title, content, edit_key, is_open} = req.body;
      const create_date = getFormatedDate();
      await executeQuery("UPDATE data SET title = ?, content = ?, create_date = ?, is_open = ? WHERE id = ?", 
      [title, content, create_date, is_open, edit_key]).then( async(data)=>{
        if(data.affectedRows){
          res.send({
            status:true,
            data:{
              title:req.body.title,
            },
            message:"캘린더 수정 성공"
          });
        } else {
          res.send({
            status:false,
            message:"캘린더 수정 실패"
          });
        }
      }, function(err){
        res.send(err);
      });
    }
  } else if (req.method === "DELETE"){
    if(req.query.keyword === 'calendar'){
      console.log("=== 달력 삭제 === : ", req.body);
      
      await executeQuery("DELETE FROM data WHERE id = ?",[req.body.edit_key]).then(async (data)=>{
        if(data.affectedRows){
          res.send({
            status:true,
            data:{
              title:req.body.title,
            },
            message:"캘린더 삭제 성공"
          });
        } else {
          res.send({
            status:false,
            message:"캘린더 삭제 실패"
          });
        }
      }, function(err){
        res.send(err);
      });
    }
  }
}

