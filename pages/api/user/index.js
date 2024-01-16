import crypto from 'crypto';
import nodeMailer from 'nodemailer';
import { executeQuery } from '#database/index';
import { randomUUID } from "#utils/randomUUID";
import { getFormatedDate } from "#utils/date";
import { isEmail } from "#utils/regexp/isEmail";
import { isPassword } from "#utils/regexp/isPassword";
import { isNickname } from "#utils/regexp/isNickname";

export default async function handler(req, res) {
  if(req.method === "GET"){
    if(req.query.user_key){
      await executeQuery("SELECT * FROM user WHERE user_key = ?", [req.query.user_key]).then((data)=>{
        console.log("=== 유저조회 === : ", req.query.user_key)

        if(data[0]){
          res.send({
            status:true,
            data:data[0],
            message:"유저 조회 성공"
          });
        }else{
          res.send({
            ststus:false,
            message:"유저 조회 실패"
          });
        }
      }, function(err){
        res.send(err);
      });
    }else{
      await executeQuery("SELECT COUNT(*) count FROM user", []).then((data)=>{

        if(data[0].count){
          res.send({
            status:true,
            data:data[0].count,
            message:"전체 유저 조회 성공"
          });
        }else{
          res.send({
            ststus:false,
            message:"전체 유저 조회 실패"
          });
        }
      }, function(err){
        res.send(err);
      });
    }

  } else if (req.method === "POST"){
    console.log('=== 회원가입 === : ', req.body);
    
    if(req.body.provider === 'credential'){
      if(!isEmail.test(req.body.email)){
        res.send({
          status: false,
          message:'* 올바른 이메일 형식이 아닙니다.'
        });
      } else if(!isPassword.test(req.body.password)){
        res.send({
          status: false,
          message:'* 비밀번호를 다시 확인해주세요.'
        });
      } else {
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
                      console.log('[회원가입성공] : ', req.body);

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
  
        }, function(err){
          res.send({
            status:false,
            message:err
          });
        });
      
      }
    } else {
      let email = req.body.email;
      console.log('=== SNS회원가입 === :', email)

      await executeQuery("SELECT email FROM user WHERE email = ?", [email]).then(async (data)=>{
    
        if(!data[0]){
          let nickname = randomUUID(4);
          let user_key = randomUUID(5);

          await executeQuery("INSERT INTO user(email, provider, nickname, sign_date, user_key) values (?, ?, ?, ?, ?)", [email, req.body.provider, nickname, getFormatedDate(), user_key]).then( async function(data){
            if(data.insertId){
              await executeQuery("INSERT INTO item_all(user_key) values (?)", [user_key]).then(function(){
                res.send({
                  status:true,
                  data:{
                    email,
                    user_key,
                    nickname,
                    provider: req.body.provider,
                    item:{
                      item_nickname:1
                    }
                  },
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
  
        } else {
          res.send({
            status:false,
            message:data[0].email + ' 이미 존재하는 이메일입니다.'
          });
        }
    
      }, function(err){
        res.send(err);
      });

    }
    
  } else if (req.method === "DELETE") {
    if(req.query.checkPassword){
      const data = req.body;
  
      await executeQuery("SELECT * FROM user WHERE user_key = ?", [data.user_key]).then( async function(user) {
        console.log("=== delete USER ==== : ", user)
        if (user[0]) {
          const currentPassword = crypto.createHash("sha512").update(data.password).digest("hex");
          const hashedPassword = crypto.pbkdf2Sync(currentPassword, user[0].password_salt, 9132, 16, "sha512").toString("hex");
          if (hashedPassword === user[0].password) {
            res.send({
              status:true,
              message: data.user_key + " 비밀번호 확인 완료."
            });
          } else {
            res.send({
              status:false,
              message: "비밀번호가 맞지 않습니다."
            });
          }
          
        } else {
          res.send({
            status:false,
            message: "존재하지 않는 유저입니다."
          });
        }
      }, function(err){
        res.send({
          status:false,
          message: err
        });
      })
    }else{
      const data = req.body;
  
      executeQuery("SELECT * FROM user WHERE user_key = ?", [data.user_key]).then( async function(user) {
        if(user[0]) {
          await executeQuery("DELETE FROM user, item_all, question, data USING user LEFT JOIN item_all ON user.user_key = item_all.user_key LEFT JOIN question ON user.user_key = question.user_key LEFT JOIN data ON user.user_key = data.user_key WHERE user.user_key = ?",
          [data.user_key]).then( async function(result){
  
            if(result.affectedRows){
              res.send({
                status: true,
                message: req.body.nickname + " : 탈퇴완료"
              });
            }else{
              res.send({
                status: false,
                message: "회원탈퇴 오류 발생"
              });
            }
          }, function(err){
            res.send(err);
          });
          
        } else {
          res.send({
            status:false,
            message: "존재하지 않는 유저입니다."
          });
        }
      }, function(err){
        res.send({
          status:false,
          message: err
        });
      })
    }
    
  } else {

    if(req.query.target === 'nickname'){
      console.log("=== 닉네임변경 === : ", req.body)
      const regExp = /^[가-힣a-zA-Z0-9]+$/;
      if(req.body.user_key === "XFD84427C21D" || req.body.user_key === "8N2885B0883C" || req.body.user_key === "O3E995E25F27" ){
        if(isNickname.test(req.body.newNickname) || !regExp.test(req.body.newNickname)) {
          res.send({
            status:false,
            message:'사용불가한 닉네임 입니다.'
          });
        } else{
          await executeQuery('SELECT nickname FROM user WHERE nickname = ?', [req.body.newNickname]).then(async (data)=>{
            if(data.length){
              res.send({
                status:false,
                message:'이미 사용중인 닉네임입니다.'
              });
            } else {
              await executeQuery("UPDATE user SET nickname=? WHERE user_key = ?", [req.body.newNickname, req.body.user_key]).then(async function(data){
                if(data.affectedRows === 1){
                  res.send({
                    status: true,
                    nickname : req.body.newNickname,
                    message: req.body.newNickname + " : 변경완료"
                  });
                }else{
                  res.send({
                    status: false,
                    message: "에러 : 존재하지 않는 유저 입니다."
                  });
                }
              }, function(err){
                res.send({
                  status:false,
                  message: err
                });
              });
            }
          }, function(err){
            res.send(err);
          });
        }
       
        return false;
      }else if(isNickname.test(req.body.newNickname) || !regExp.test(req.body.newNickname)) {
        res.send({
          status:false,
          message:'사용불가한 닉네임 입니다.'
        });
      } else {
        await executeQuery("SELECT item_nickname FROM item_all WHERE user_key = ?", [req.body.user_key]).then(async function(data){
          let itemNickname = data[0]?.item_nickname || 0;
          if(itemNickname > 0){
            await executeQuery('SELECT nickname FROM user WHERE nickname = ?', [req.body.newNickname]).then(async (data)=>{
              if(data.length){
                res.send({
                  status:false,
                  message:'이미 사용중인 닉네임입니다.'
                });
              } else {
                await executeQuery("UPDATE user SET nickname=? WHERE user_key = ?", [req.body.newNickname, req.body.user_key]).then(async function(data){
                  if(data.affectedRows === 1){
                    await executeQuery("UPDATE item_all SET item_nickname = item_nickname - 1, nickname_change_count = nickname_change_count + 1 WHERE user_key = ?",[req.body.user_key]).then(async function(data){
                      if(data.affectedRows === 1){
                        res.send({
                          status: true,
                          nickname : req.body.newNickname,
                          message: req.body.newNickname + " : 변경완료"
                        });
                      }
                    })
                  }else{
                    res.send({
                      status: false,
                      message: "에러 : 존재하지 않는 유저 입니다."
                    });
                  }
                }, function(err){
                  res.send({
                    status:false,
                    message: err
                  });
                });
              }
            }, function(err){
              res.send(err);
            });
          } else {
            res.send({
              result:false,
              message:'닉네임 변경권이 없습니다.'
            });
          }
    
        })
      }
    }else if(req.query.forgot === 'password'){
      // 패스워드찾기
      await executeQuery("SELECT * FROM user WHERE email = ?", [req.body]).then(async (data)=>{
        if(data[0] && data[0].provider === "credential"){
          let password = randomUUID(6)
          const hashPassword = crypto.createHash('sha512').update(password).digest('hex');
          
          crypto.randomBytes(16, (err, buf) => {
            const salt = buf.toString('hex');
            crypto.pbkdf2(hashPassword, salt, 9132, 16, 'sha512', async (err, key) => {
              const finishPassword = key.toString('hex');
              console.log("=== 비밀번호찾기 - 변경진행 ===", req.body)
              await executeQuery('UPDATE user SET password = ?, password_salt = ? WHERE email = ?', [finishPassword, salt, req.body]).then( async function(data){
                if(data.affectedRows){
                  const transporter = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
                  })
                  
                  await transporter.sendMail({
                    to: req.body,
                    subject: '[JOOTONG-주간통계] 비밀번호 가 변경되었습니다.',
                    html: `
                      <div style="padding:20px; border-bottom:1px solid #ccc;">
                        회원님의 비밀번호가 변경되었습니다.<br/>
                        로그인 후 비밀번호 를 변경 해주세요.
                        <div>
                          변경 비밀번호 : <span>${password}</span>
                        </div>

                        <a href="https://www.jootong.com">JOOTONG 돌아가기</a>
                      </div>
                      `,
                  })
        
                  res.send({
                    status:true,
                    message:"변경된 비밀번호를 회원님의 메일로 발송했습니다!"
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
              res.send(err);
            });
          }, function(err){
            res.send(err);
          });
        }else{
          if(data[0]){
            res.send({
              status:false,
              message:req.body + " 은 SNS로 가입한 계정 입니다. SNS로그인 이용 바랍니다."
            });
          } else {
            res.send({
              status:false,
              message:req.body + " : 존재하지 않는 이메일입니다."
            });
          }
          
        }
      }, function(err){
        res.send({
          status:false,
          message:err
        });
      });
    } else if(req.query.change === 'password'){
      await executeQuery("SELECT * FROM user WHERE user_key = ?", [req.body.user_key]).then( async function(data) {
        if(data[0].status){
          const currentPassword = crypto.createHash("sha512").update(req.body.current).digest("hex");
          const hashedPassword = crypto.pbkdf2Sync(currentPassword, data[0].password_salt, 9132, 16, "sha512").toString("hex");

          if (hashedPassword === data[0].password) {
            const hashPassword = crypto.createHash('sha512').update(req.body.new).digest('hex');
            crypto.randomBytes(16, (err, buf) => {
              const salt = buf.toString('hex');
              crypto.pbkdf2(hashPassword, salt, 9132, 16, 'sha512', async (err, key) => {
                const finishPassword = key.toString('hex');
                if(hashedPassword === finishPassword){
                  res.send({
                    status:false,
                    message: "현재 사용중인 비밀번호 입니다."
                  });
                  return false;
                }
                await executeQuery('UPDATE user SET password = ?, password_salt = ? WHERE user_key = ?',
                [finishPassword, salt, req.body.user_key]).then( async function(data){
                  if(data.affectedRows){
                    res.send({
                      status:true,
                      message: "비밀번호 변경 완료"
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
              message:"비밀번호가 맞지 않습니다."
            });
          }
        } else {
          res.send({
            status:true,
            data:200
          });
        }
      }, function(err){
        res.send({
          status:false,
          message:err
        });
      });
    }
  }
}
