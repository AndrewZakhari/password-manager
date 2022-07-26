import mongoose from "mongoose";

export default function handler(req,res) {
    const {user, index} = req.body
    console.log(req.body)
    if(req.body.user && req.method === 'POST'){

    const options = {
     useUnifiedTopology: true,
     useNewUrlParser: true
    }

        const connection = mongoose.createConnection(process.env.DATABASE_URL, options)

        const UserSchema = mongoose.Schema({
            username: String,
            ServicePasswords: [String]
        })

        const Service = connection.model("Service", UserSchema)

        Service.find({username: user}, (err, found) => {
            if(err) console.error(err);
            console.log(found)
            found[0].ServicePasswords.splice(index, 1)
            console.log(index)
            found[0].save((err, updated) => {
                if(err) console.error(err)
                console.log(updated)
                res.status(200).json({updated})
            } )
        })
    }
    
}