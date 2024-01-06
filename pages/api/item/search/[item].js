import { executeQuery } from '#database/index';

export default async function handler(req, res) {
  const {item} = req.query
  if(req.method === "GET"){
    console.log("[아이템 전체 조회] :", req.body.user_key)
    if(item === "all"){
      await executeQuery("SELECT * FROM item_all WHERE user_key = ? ", [req.body.user_key]).then(function(data){
       res.send({
        status:true,
        data:data[0],
        message:"아이템 전체 조회 성공"
       }) 
      }, function(err){
        res.send(err);
      });

    }else{
      res.send({
        ststus:false
      }) 
    }
  }
}