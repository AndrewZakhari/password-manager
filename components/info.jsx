import styles from '../styles/info.module.css';
import { useSession } from "next-auth/react";
import { useState } from "react";
const PasswordGenerator = require('strict-password-generator').default;

const passwordGenerator = new PasswordGenerator();


export default function Info() {
    const {data: session} = useSession();
    const [state, setState] = useState([]);
    const [clicked, setClick] = useState(false);
    const [passState, setPassState] = useState();
    const [testState, setTestState]  = useState();
    

    const ShowPasswords = async (e) => {
        e.preventDefault();
        const form  = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        const res = await fetch('/api/handleLoad',{
            body: JSON.stringify(formData),

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        const result = await res.json();
        const PasswordList = result.found[0].ServicePasswords;
        setState(PasswordList)     
        setClick(!clicked);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());
        
        let updatedState = state
        updatedState.push(formData.service + " : " + formData.password)
        console.log(updatedState)
        setState(updatedState)

        const res = await fetch('/api/handleSubmit', {
            body: JSON.stringify(formData),

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        const result = await res.json(); 
    }

    const handleChange = async (e) => {
        setPassState(e.target.value)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        const res = await fetch('/api/handleDelete', {
            body: JSON.stringify(formData),

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        const result = await res.json();
        setState(result.updated.ServicePasswords)
    }

    const List = () => {
        return (
            <>
            {state.map((value, index) => {
                return(
                <form key={index} className={styles.list} onSubmit={handleDelete}>
                    <input style={{display: 'none'}} readOnly name="user" value={session.user.name} />
                    <input style={{display: 'none'}} readOnly value={testState}/>
                    <input value={index} name="index" style={{display: 'none'}}></input>
                    
                    <span  key={index}>{value}</span>
                     <button type="submit">Delete</button>
                    </form>)
   })}
            </>
        )
    }

    if(session){
       if(clicked){
           
           return (
               <>
                <div className={styles.container}>
                <form className={styles.mainForm} onSubmit={handleSubmit}>
            <label>Service:</label>
            <br />
           <input style={{display: 'none'}} readOnly name="user" value={session.user.name}  />
            <br /> 
            <input name="service" type="text" placeholder="ex: Google"/>
            <br />
            <label>Password</label>
            <br />
            <input onChange={handleChange} value={passState} name="password" type="password" placeholder="password"/>
            
            <a > <button type="submit">Submit</button></a>
          </form>
          <button onClick={() => {setTestState(0)}} type="button">Update Password List</button>
          <button type="button" onClick={() => {setPassState(passwordGenerator.generatePassword())}}>Generate password</button>
          <form onSubmit={ShowPasswords}>
            <input style={{display: 'none'}} readOnly name="user" value={session.user.name}/>
            <button type="submit">Hide Passwords</button>
            </form>
        
       
        <List />
                </div> 
               </>
           )
       }else{
    return (
        <>
        <div className={styles.container}>
        <form className={styles.mainForm} onSubmit={handleSubmit}>
            <label>Service:</label>
            <br/>
           <input style={{display: 'none'}} readOnly name="user" value={session.user.name}  />
           <br />
            <input name="service" type="text" placeholder="ex: Google"/>
            <br />
            <label>Password</label>
            <br />
            <input onChange={handleChange} value={passState} name="password" type="password" placeholder="password"/>
            
            <button type="submit">Submit</button>
        </form>
        <button type="button" onClick={() => {setPassState(passwordGenerator.generatePassword())}}>Generate password</button>  
        
        <form onSubmit={ShowPasswords}>
            <input style={{display: 'none'}} readOnly name="user" value={session.user.name}/>
            <button type="submit">Show Passwords</button>
        </form>
        
        <ul>
        </ul>
       {/*<ul>
            {passwordList.map((index) => {
                <>
                <label>{index.passwords.service}</label>
                <li>{index.passwords.password}</li>
                </>
            })}
        </ul>*/}
        </div>
        </>
    )}
}else{
    return (
        <>
        <h1>
        Please Login to access your passwords  
        </h1>
        </>
    )
}
}
