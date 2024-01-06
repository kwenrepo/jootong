import { executeQuery } from '#database/index';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { getTime } from "#utils/getTime";
import crypto from 'crypto';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        let user = {
          provider:"credential"
        }
        return await executeQuery("SELECT * FROM user WHERE email = ?", [credentials.email]).then( async function(data) {
          // console.log("credencial data" ,data)
          if (data[0]) {
            if(data[0].status){
              const currentPassword = crypto.createHash("sha512").update(credentials.password).digest("hex");
              const hashedPassword = crypto.pbkdf2Sync(currentPassword, data[0].password_salt, 9132, 16, "sha512").toString("hex");
              if (hashedPassword === data[0].password) {
                return await executeQuery("SELECT item_nickname FROM item_all WHERE user_key = ? ", [data[0].user_key]).then(function(item){
                  user.nickname = data[0].nickname;
                  user.item = item[0];
                  user.user_key = data[0].user_key;
                  credentials.email === "admin" ? user.email = "admin" : ""
                  return user;
                }, function(err){
                  return user;
                });
        
              } else {
                user.message = "비밀번호가 맞지 않습니다.";
                return user;
              }
            } 
            // else {
            //   const diff = new Date(getTime()) - new Date("", data[0].withdraw_date);
            //   const day = parseInt(diff / (1000 * 60 * 60 * 24));
            //   // console.log("DELETE day", day)
            //   if(day >= 0){
            //     return await executeQuery("DELETE FROM user WHERE user_key = ? ", [data[0].user_key]).then(async function(data){
            //       return session;
            //     }, function(err){
            //       console.log("nextauth [DELETE FROM user WHERE user_key] error: ", err)
            //       return session;
            //     });
            //   } else {
            //     session.user.status = data[0].status;
            //     return session;
            //   }
            // }
            
          } else {
            user.message = "존재하지 않는 이메일입니다."
            return user;
          }
        }, function(err){
          user.message = err
          return user

        })
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  },
  secret: process.env.JWT_SECRET,
  session: {
    maxAge: 60 * 300,
  },
  callbacks: {
    async signIn({user}) {
      // console.log("signUser:", user)
      if(user.email) {
        return true
      } else if (!user.user_key) {
      
        return process.env.NODE_ENV === "production" ? 'https://www.jootong.com?error=' + user.message : 'http://localhost:3000?error=' + user.message
      }
      return true;
    },
    async jwt({token, account, user, trigger, session }) {
      if(trigger === "update"){
        token.user = session.user
      }else if(user){
        token.user = user;
      }
      if(account){
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token}) {
      if(token.user.provider === 'credential'){
        session.user = token.user;

        return session;
      } else {
        // console.log("session", session)
        return await executeQuery("SELECT * FROM user WHERE email = ?", [session.user.email]).then(async (data)=>{

          if(data.length){

            if(data[0].status){
              return await executeQuery("SELECT item_nickname FROM item_all WHERE user_key = ? ", [data[0].user_key]).then(function(item){
                session.user.nickname = data[0].nickname;
                session.user.user_key = data[0].user_key;
                session.user.provider = data[0].provider;
                session.user.item = item[0];

                return session;
              }, function(err){
                return session;
              });
  
            } else {
              const diff = new Date(getTime()) - new Date(data[0].withdraw_date);
              const day = parseInt(diff / (1000 * 60 * 60 * 24));
              if(day >= 0){
                return await executeQuery("DELETE FROM user WHERE user_key = ? ", [data[0].user_key]).then(async function(data){
                  return session;
                }, function(err){
                  console.log("nextauth [DELETE FROM user WHERE user_key] error: ", err)
                  return session;
                });
              } else {
                session.user.status = data[0].status;
                return session;
              }
            }
            
          } else {
            session.user.provider = token.provider;
            return session;
          }
          
        }, function(err){
          return session;
        });
      }

    },
    async redirect({ url }) {
      return url
    }
  }
}
export default NextAuth(authOptions);