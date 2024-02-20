import css from './Alert.module.scss'

export default function Alert({props}) {
  return(
    <div className={css.wrap}>
      <div className={css.inner}>
        <div className={css.message}>
          {props?.message}
        </div>
        <div className={css.button_box}>
          {props?.confirm}
          {props?.cancel}
        </div> 
      </div>
    </div>
  )
}