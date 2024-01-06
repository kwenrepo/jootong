import css from './Profile.module.scss';
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { isNickname } from "#utils/regexp/isNickname";
import { isPassword } from "#utils/regexp/isPassword";

export default function Profile({setIsLoading, setAlertData}){
  const {data: session, update } = useSession();
  
  const [changeNickname, setChangeNickname] = useState("없음");
  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")

  const password = useRef({
    currentPassword:"",
    newPassword:"",
    checkPassword:""
  });


  function checkItemNickname() {
    if(!session?.user?.item?.item_nickname){
      setAlertData({
        isAlert:true,
        message:<span>닉네임 변경권이 없습니다.</span>,
        confirm:<button onClick={()=>( setAlertData((prev)=>{
          return{
            ...prev,
            isAlert:false
          }
        }))}>확인</button>,
      })

      setIsNicknameChange(false)
    }else{
      setIsNicknameChange(true);
    }
  }

  function checkPasswordChange() {
    if(isPasswordChange){
      setIsPasswordChange(false);

    }else{
      setIsPasswordChange(true);
    }
    setPasswordMessage('');

  }

  const changePassword = function(e){
    password.current.newPassword = e.target.value;

    if(password.current.newPassword || password.current.checkPassword){
      if(password.current.newPassword.length < 8  ){
        setPasswordMessage('* 비밀번호는 8글자 이상 입니다.')
      }else if(!isPassword.test(password.current.newPassword)){
        setPasswordMessage('* 비밀번호는 (필수)문자+숫자 조합입니다.')
      }else if(password.current.checkPassword && (password.current.newPassword!== password.current.checkPassword)){
        setPasswordMessage('* 비밀번호를 확인해주세요')
      }else if(password.current.currentPassword === password.current.newPassword){
        setPasswordMessage('* 입력하신 현재 비밀번호와 신규 비밀번호가 같습니다.');
      }else{
        setPasswordMessage('');
      }
    }else{
      setPasswordMessage('');
    }
  }

  const passwordCheck = function(e){
    password.current.checkPassword = e.target.value;

    if(password.current.newPassword || e.target.value){
      if(password.current.newPassword.length < 8  ){
        setPasswordMessage('* 비밀번호는 8글자 이상 입니다.')
      }else if(!isPassword.test(password.current.newPassword)){
        setPasswordMessage('* 비밀번호는 (필수)문자+숫자 조합입니다.')
      }else if(password.current.checkPassword  && (password.current.newPassword !== password.current.checkPassword )){
        setPasswordMessage('* 비밀번호를 확인해주세요')
      }else if(password.current.currentPassword === password.current.newPassword){
        setPasswordMessage('* 입력하신 현재 비밀번호와 신규 비밀번호가 같습니다.');
      }else{
        setPasswordMessage('')
      }
    }else{
      setPasswordMessage('')
    }
  }

  function startNicknameChange(){
    if(session?.user.item.item_nickname === 0){
      setAlertData({
        isAlert:true,
        message:<span>닉네임 변경권이 없습니다.</span>,
        confirm:<button onClick={()=>( setAlertData({isAlert:false}))}>확인</button>
      })

      setIsNicknameChange(false);
      return false;
    }

    const regExp = /^[가-힣a-zA-Z0-9]+$/;
    if(isNickname.test(changeNickname) || !regExp.test(changeNickname)){
      setErrorMessage("사용할 수 없는 닉네임 입니다.");
      return false;

    } else {
      setIsLoading(true);
      setErrorMessage("");
      let data = {
        newNickname : changeNickname,
        nickname : session.user.nickname,
        user_key: session.user.user_key,
      }
      
      fetch("/api/user?target=nickname", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(async (data) => {
        if(data.status){
          session.user.nickname = data.nickname;
          session.user.item.item_nickname -= 1;

          await update({
            ...session,
            user:{
              ...session?.user,
              nickname : data.nickname
            }
          })
          setAlertData({
            isAlert:true,
            message:<span>{`닉네임 [${session.user.nickname}] 변경 성공`}</span>,
            confirm:<button onClick={()=>( setAlertData({isAlert:false}))}>확인</button>
          })
          
        } else {
          setAlertData({
            isAlert:true,
            message:<span>{data.message}</span>,
            confirm:<button onClick={()=>( setAlertData({isAlert:false}))}>확인</button>
          })
        }
        
        setIsNicknameChange(false);
        setIsLoading(false);
      });
    }
  }

  const startChangePassword = function(){
    if( password.current.currentPassword && password.current.newPassword && password.current.checkPassword && 
      ( password.current.currentPassword !== password.current.newPassword)){
      setIsLoading(true);
      setErrorMessage('');
      let data = {
        user_key : session?.user.user_key,
        current : password.current.currentPassword,
        new : password.current.newPassword
      }
      fetch('/api/user?change=password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status){
          setIsPasswordChange(false);
        }
        setAlertData({
          isAlert:true,
          message:<span>{data.message}</span>,
          cancel:<button onClick={()=>{
            setAlertData({ isAlert:false })
          }}>확인</button>
        })
        setIsLoading(false);

      });
    }else if(password.current.newPassword.length < 8  ){
      setPasswordMessage('* 비밀번호는 8글자 이상 입니다.')
    }else if(!isPassword.test(password.current.newPassword)){
      setPasswordMessage('* 비밀번호는 (필수)문자+숫자 조합입니다.')
    }else if(password.current.newPassword && (password.current.newPassword !== password.current.checkPassword)){
      setPasswordMessage('* 비밀번호를 확인해주세요')
    }else if(password.current.currentPassword === password.current.newPassword){
      setPasswordMessage('* 입력하신 현재 비밀번호와 신규 비밀번호가 같습니다.');
    }
  }

  useEffect(() => {
    if(!isNicknameChange) {
      setChangeNickname(session?.user.nickname);
      setErrorMessage("");
    }
  }, [isNicknameChange])

  useEffect(() => {
    if(session) {
      setChangeNickname(session?.user.nickname);
    }
  }, [session])

  // useEffect(() => {
  //   if(!session?.user.nickname) router.push("/")
  // }, [])

  return(
    <div className={`${css.my_profile} ${css.box}`}>
      <h2>프로필</h2>
      <div className={css.my_nickname}>
        <div className={css.nickname}>
          <span className={css.caption}>닉네임 |</span> 
          {isNicknameChange ? 
            <input value={changeNickname} maxLength={10} onChange={(e) => { setChangeNickname(e.target.value);}}></input>:
            <span>{changeNickname}</span>
          }
          
          {errorMessage && <div className={css.error_message}>
            {errorMessage}
          </div>}
        </div>
        <div className={css.button_group}>
          {isNicknameChange ? 
          (
              <>
                <button onClick={() => { startNicknameChange() }}>완료</button>
                <button onClick={() => { setIsNicknameChange(false) }}>취소</button>
              </>
            ) :
            (
              <>
                <button className={css.change_button} onClick={() => { checkItemNickname() }}>변경하기</button>
              </>
            )
            }
        </div>

      </div>
      
      { session?.user.provider === "credential" &&
      <div className={css.change_password}>
        <div className={css.password}>
          <span className={isPasswordChange ? css.open : ''}>비밀번호</span>
          <div className={css.button_group}>
            {isPasswordChange 
              ? <button onClick={() => { checkPasswordChange() }}>취소</button>
              :<button onClick={() => { checkPasswordChange() }}>변경하기</button>
            }
          </div>
        </div>

        {isPasswordChange && 
        <div className={css.change_box}>
          <div className={css.box}>
             <input type='password' placeholder='현재 비밀번호' maxLength={20} onChange={(e) => { password.current.currentPassword = e.target.value; }}></input>
          </div>
          <div className={`${css.box}`}>
            { passwordHidden 
            ? <>
                <input type="password" maxLength={20} onBlur={(e)=>{changePassword(e)}} placeholder="비밀번호 8자리 이상"/>
                <button className={css.password_hidden} onClick={()=>{setPasswordHidden(!passwordHidden)}}></button>
              </>
            : <>
                <input  type="text" maxLength={20} onBlur={(e)=>{changePassword(e)}} placeholder="비밀번호 8자리 이상"/> 
                <button className={css.password_on} onClick={()=>{setPasswordHidden(!passwordHidden)}}></button>
              </>
            } 
          </div>
          <div className={`${css.box}`}>
          { passwordHidden 
            ? <input type="password" maxLength={20} onBlur={(e)=>{passwordCheck(e)}} placeholder="비밀번호 확인"/>
            : <input type="text" maxLength={20} onBlur={(e)=>{passwordCheck(e)}} placeholder="비밀번호 확인"/>
          }
          </div>

          <div className={css.button_group}>
            <button onClick={() => { startChangePassword() }}>변경하기</button>
          </div>

          <div className={css.error_message}>
            {passwordMessage}
          </div>
        </div>}
       </div>}

      {/* <div className={css.my_point}>
        포인트 : {session?.user.item?.item_point ? session?.user.item?.item_point : 0 }
      </div> */}
    </div>
  )
}