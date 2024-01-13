import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index";
import { useEffect } from 'react';
import { useRouter } from "next/router";

export default function error({  }) {
  const getUser = useRecoilValue(user);
  const router = useRouter()

  useEffect(()=>{
    if(!getUser){
      router.push('/')
    }
  }, [getUser])

  return (
    <div>
      Error...
    </div>
  );
}

