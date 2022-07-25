import mongoose, { set } from "mongoose";
import { useSession } from "next-auth/react";
import useSWR from 'swr'
import { useState } from "react";
const PasswordGenerator = require('strict-password-generator').default;

const passwordGenerator = new PasswordGenerator();

let password = passwordGenerator.generatePassword();


/*export function getServerSideProps(context) {

    const options = {
     useUnifiedTopology: true,
     useNewUrlParser: true
    }

    const connection = mongoose.createConnection(process.env.DATABASE_URL, options)

    const UserSchema = mongoose.Schema({
        
    })

} */


export default function Info() {
    const {data: session} = useSession();
    const [state, setState] = useState([]);
    const [clicked, setClick] = useState(false);
    const [passState, setPassState] = useState();
    const [testState, setTestState]  = useState();
    {/*const connection = mongoose.createConnection(process.env.DATABASE_URL, options)
   
    const userSchema = mongoose.Schema({
        name : String,
        passwords: {
            String: String
        }
    })

    const userModel = connection.model("User", userSchema);
   
    const passwordList = userModel.find()

*/}



  {/*  const fetcher = (...args) => fetch(...args, {
        cache: JSON.stringify(session.user.name),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }).then((res) => res.json())

    function Profile() {
        const { data, error } = useSWR('/api/handleLoad', fetcher)

          if (error) return <div>Failed to load</div>
          if (!data) return <div>Loading...</div>

      return (
     <div>
       <h1>{data.name}</h1>
      </div>
  )
}*/}

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
         return 
    }

    const handleChange = async (e) => {
        setPassState(e.target.value)
        console.log(passState)
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
        console.log(result)
        setState(result.updated.ServicePasswords)
    }

    const List = () => {
        return (
            <>
            {state.map((value, index) => {
                return(<form onSubmit={handleDelete}>
                    <input style={{display: 'none'}} readOnly name="user" value={session.user.name} />
                    <input style={{display: 'none'}} readOnly value={testState}/>
                    <span value={index} name="index" style={{display: 'none'}}></span>
                    
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
                <div>
                <form onSubmit={handleSubmit}>
            <label>Service:</label>
           <input style={{display: 'none'}} readOnly name="user" value={session.user.name}  />
            <input name="service" type="text" placeholder="ex: Google"/>
            <label>Password</label>
            <input onChange={handleChange} value={passState} name="password" type="password" placeholder="password"/>
            
            <a onClick={() => {setTestState(testState + 1)}}> <button type="submit">Submit</button></a>
          </form>
          <button onClick={() => {setTestState(testState + 1)}} type="button">Update Password List</button>
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
        <div >
        <form onSubmit={handleSubmit}>
            <label>Service:</label>
           <input style={{display: 'none'}} readOnly name="user" value={session.user.name}  />
            <input name="service" type="text" placeholder="ex: Google"/>
            <label>Password</label>
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