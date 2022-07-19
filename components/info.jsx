
import { useSession } from "next-auth/react";


const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

export default function Info() {
    
    const {data: session} = useSession();
    console.log(session.user.name)

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
       
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Service:</label>
           <input style={{display: 'none'}} name="user" value={session.user.name}  />
            <input name="service" type="text" placeholder="ex: Google"/>
            <label>Password</label>
            <input name="password" type="password" placeholder="password"/>
            <button>Generate password</button>
            <button type="submit">Submit</button>
        </form>
       {/*<ul>
            {passwordList.map((index) => {
                <>
                <label>{index.passwords.service}</label>
                <li>{index.passwords.password}</li>
                </>
            })}
        </ul>*/}

        </>
    )
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