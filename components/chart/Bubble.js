import { useEffect, useRef, useState } from 'react'
import css from './Bubble.module.scss'

export default function bubble(){
  const canvasRef = useRef();
  // const [ctx, setCtx] = useState();
  let canvas;
  let ctx;
  useEffect(()=>{
    canvas = canvasRef.current;
    console.log(canvas)
    ctx = canvas?.getContext('2d')
    canvas.addEventListener('click', function(e){

      const x = e.clientX - canvas.width;
      const y = e.clientY - canvas.offsetTop;
      console.log(e.clientX, canvas.width , e.clientY, canvas.offsetTop )
    
      // 클릭한 위치에 도형 그리기
      ctx.beginPath();
      ctx.arc(e.clientX,50,10, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    })
  }, [])


  return(
    <>
      <canvas id={css.canvas} ref={canvasRef}></canvas>
    </>
  )
}