import css from './ImageModal.module.scss'

export default function ImageModal({props}) {

  return(
    <div className={css.wrap} onClick={(e)=>{
      if(e.target.nodeName !== "IMG") props.setImageData({isOpen:false})
    }}>
      <button className={css.close}></button>
      <div className={css.inner}>
        {props?.message}
      </div>
    </div>
  )
}