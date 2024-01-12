import { executeQuery } from '#database/index';

export default async function handler(req, res) {
  if(req.method === "GET"){
    console.log('req.query.keyword =' , req.query.keyword)
    await executeQuery("SELECT * FROM data WHERE title REGEXP ?", [req.query.keyword]).then((data)=>{
      res.send({
        status:true,
        data:data,
        message:"검색 성공"
      });
    }, function(err){
      res.send(err);
    });
  }

}