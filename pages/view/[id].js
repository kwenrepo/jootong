import { useState, useEffect, useRef } from "react";
import Header from '#components/Header';
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("#components/editor/ToastUIViewer"), {
  ssr: false,
});

export default function view() {
  return (
    <div className={css.wrap}>
      <Header />
      <div className={css.inner}>
        <nav>
          <h1>나만의 통계 만들기</h1>
          <button onClick={()=>{router.back()}}></button>
        </nav>

        <Viewer
          content={
            '<ul><li class="task-list-item" data-task="true"><p>dasdsad</p></li><li class="task-list-item" data-task="true"><p><br></p><ul><li class="task-list-item" data-task="true"><p><br></p><table><thead><tr><th><p><br></p></th><th><p><br></p></th></tr></thead><tbody><tr><td><p><br></p></td><td><p><br></p></td></tr><tr><td><p><br></p></td><td><p><br></p></td></tr></tbody></table></li></ul></li></ul>'
          }
        />
      </div>
    </div>
  );
}
