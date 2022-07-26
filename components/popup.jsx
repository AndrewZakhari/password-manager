import {signIn, signOut, useSession} from 'next-auth/react';
import Info from './info';
import styles from '../styles/popup.module.css'

export default function Popup() {
    const {data: session} = useSession();
    if(session){
        return (
        <><div className={styles.container}>
        <button className={styles.signOutButton} onClick={() => signOut()}>Sign Out</button>
        </div>
        <Info />
        </>
        )
    }else{
    return(
        < >
        <div className={styles.signInContainer}>
        <button className={styles.button} onClick={() => signIn()}>Sign In</button>
        <span className={styles.span}> Please Sign in to use the application</span>
        </div>
        </>
    )
    }
}