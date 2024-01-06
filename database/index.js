const {createPool} = require('mysql2');
const pool = createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  database:process.env.DB_DATABASE,
  connectionLimit: 30
})

pool.getConnection((err, connection) => {
  if(err){
    console.log('error connect to db..' + process.env.DB_HOST)
    // setTimeout(function() { pool.getConnection(); }, 2500);
  }
  console.log('[DB 연결 성공] : ' + process.env.DB_HOST)
  connection.release();
})

export const executeQuery = (query, arrParams) => {
  return new Promise((resolve, reject)=>{
    try{
      pool.query(query, arrParams, (err, data) =>{
        if(err){
          reject(err);
        }
        resolve(data)
      })
    } catch (err){
      reject(err)
    }
  })
}