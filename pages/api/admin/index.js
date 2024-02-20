import crypto from 'crypto';
import { executeQuery } from '@database/index';
import { randomUUID } from "@utils/randomUUID";
import { getFormatedDate } from "@utils/date";

export default async function handler(req, res) {
  if (req.method === "POST"){
    console.log('[운영자 등록] : ', req.body)

    let email = req.body.email;
    await executeQuery('SELECT email FROM user WHERE email = ?', [email]).then(async (data)=>{
      if(!data[0]){
        let user_key = randomUUID(5);
        let nickname = randomUUID(4);
        const hashPassword = crypto.createHash('sha512').update(req.body.password).digest('hex');
        crypto.randomBytes(16, (err, buf) => {
          const salt = buf.toString('hex');
          crypto.pbkdf2(hashPassword, salt, 9132, 16, 'sha512', async (err, key) => {
            const finishPassword = key.toString('hex');
            await executeQuery('INSERT INTO user(email, password, password_salt, provider, nickname, sign_date, user_key) values (?, ?, ?, ?, ?, ?, ?)',
            [email, finishPassword, salt, req.body.provider, nickname, getFormatedDate(), user_key]).then( async function(data){
              if(data.affectedRows){
                await executeQuery("INSERT INTO item_all(user_key) values (?)", [user_key]).then(function(){
                  res.send({
                    status:true,
                    email,
                    message:req.body.email + ": 회원가입 성공"
                  });
                }, function(err){
                  res.send({
                    status:false,
                    message:err + ": 회원가입, 아이템 초기화 실패"
                  });
                });
              }else{
                res.send({
                  status:false,
                  message:data.message
                });
              }
            }, function(err){
              res.send(err);
            });
          }, function(err){
            res.send({
              status:false,
              message:err
            });
          });
        }, function(err){
          res.send({
            status:false,
            message:err
          });
        });
      } else {
        res.send({
          status:false,
          message:data[0].email + ' 이미 존재하는 이메일입니다.'
        });
      }
    })
   
  }
}
    

