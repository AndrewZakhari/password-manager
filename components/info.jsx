import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import useSWR from 'swr'
import { useState } from "react";


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
    console.log(session.user.name)
    const [state, setState] = useState(0);
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
        console.log(result.found[0]);
        const PasswordList = result.found[0].ServicePasswords;
        setState(PasswordList)    

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        const res = await fetch('/api/handleSubmit', {
            body: JSON.stringify(formData),

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        const result = await res.json();
        console.log(result)
    }

    

    if(session){
       if(state !== 0){
           console.log('state is not 0')
           console.log(
            state.toString().split(',')
           )
           const arr = state.map((i) => {
               <li>{i}</li>
           })
           return (
               <>
                <div>
                <form onSubmit={handleSubmit}>
            <label>Service:</label>
           <input style={{display: 'none'}} readOnly name="user" value={session.user.name}  />
            <input name="service" type="text" placeholder="ex: Google"/>
            <label>Password</label>
            <input name="password" type="password" placeholder="password"/>
            <button>Generate password</button>
            <button type="submit">Submit</button>
          </form>
          <form onSubmit={ShowPasswords}>
            <input style={{display: 'none'}} readOnly name="user" value={session.user.name}/>
            <button type="submit">Show Passwords</button>
            </form>
        
        <ul>
        {state[0]} <br />
        {state[1]} <br />
        {state[2]} <br />
        {state[3]} <br />
        {state[4]} <br />
        {state[5]} <br />
        {state[6]} <br />
        {state[7]} <br />
        {state[8]} <br />
        {state[9]} <br />
        
        </ul>
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
            <input name="password" type="password" placeholder="password"/>
            <button>Generate password</button>
            <button type="submit">Submit</button>
        </form>
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