import {signIn, signOut, useSession} from 'next-auth/react';
import Info from './info';

export default function Popup() {
    const {data: session} = useSession();
    if(session){
        return (
        <>
        <button onClick={() => signOut()}>Sign Out</button>
        <Info />
        </>
        )
    }else{
    return(
        <>
        <button onClick={() => signIn()}>Sign In</button>
        
        </>
    )
    }
}