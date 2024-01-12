import css from './Inquiry.module.scss';
export default function Inquiry(){
  
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