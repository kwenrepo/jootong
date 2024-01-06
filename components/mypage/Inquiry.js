import css from './Inquiry.module.scss';
import {useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Inquiry(){
  const {data: session} = useSession();
  
  return(
    <div className={css.wrap}>
      <h2>1:1 문의하기</h2>
      <div className={css.title}>
        <input type="text" placeholder="제목" />
      </div>
      <div className={css.content}>
        <textarea>dddd</textarea>
      </div>
    </div>
  )
}