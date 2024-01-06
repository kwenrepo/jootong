import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from "next/router";

export default function error({  }) {
  const {data: session} = useSession();
  const router = useRouter()

  useEffect(()=>{
    if(!session){
      router.push('/')
    }
  }, [session])

  return (
    <div>
      Error...
    </div>
  );
}

