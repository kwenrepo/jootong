import { executeQuery } from '#database/index';
import fs from "fs";
import { getTime } from '#utils/getTime';
import { randomUUID } from "#utils/randomUUID";
let todayImageFolder = ""
export default async function handler(req, res) {
  if(req.method === "GET"){
    if(req.query.roomId){
      console.log("[방 메시지 조회] : ", req.query.roomId)
      await executeQuery("SELECT * FROM message WHERE room_id = ? ORDER BY send_date DESC", [req.query.roomId]).then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"room 조회"
        });
      }, function(err){
        res.send(err);

      });
    } else if(req.query.roomIds){
      // console.log("[req.query.roomIds 조회] : ", req.query.roomIds)

      await executeQuery("SELECT * FROM message WHERE room_id REGEXP ?", [req.query.roomIds]).then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"regexp message search we"
        });
      }, function(err){
        res.send(err);

      });
    } else if(req.query.all){
      console.log("[전체 메시지 조회]")

      await executeQuery("SELECT * FROM message ORDER BY send_date DESC", []).then((data)=>{
        res.send({
          status:true,
          data:data,
          message:"메시지 전체 조회 : "
        });
      }, function(err){
        res.send(err);
      });
    }
   
  } else if (req.method === "POST"){
    if(req.query.preview === "true"){
      console.log("[이미지 저장]")
      let data = req.body;
      let writeData = data.base64Image1 + data.base64Image2
      const imageFormat = "base64"; 
      const day = getTime({format:"YYYYMMDD"});
      const imageName = randomUUID();

      const dir = "public/" + day + '/';
      const imagePath = dir + imageName + data.extension;
      const forWebImagePath = "/" + day + "/" + imageName + data.extension;
      
      if(todayImageFolder === dir){
        fs.writeFile(imagePath, writeData, imageFormat, async function () {
          res.send({
            status:true,
            data:forWebImagePath,
            message:"이미지저장 성공"
          });
        }, function(err){
          res.send({
            status:false,
            message: err + "이미지 저장 실패 "
          });
        })
      } else {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
          todayImageFolder=dir;
        }
        todayImageFolder=dir;
        fs.writeFile(imagePath, writeData, imageFormat, async function () {
          res.send({
            status:true,
            data:forWebImagePath,
            message:"이미지저장 성공"
          });
        }, function(err){
          res.send({
            status:false,
            message: err + "이미지 저장 실패 "
          });
        })
      }

    }else{
      res.send({
        status:false,
        message:"200.."
      });
    }
  }
}
