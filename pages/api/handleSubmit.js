import mongoose from "mongoose"

export default async function handler(req, res) {
    console.log(req.body) 
    const {user, password, service} = req.body;

    const options = {
     useUnifiedTopology: true,
     useNewUrlParser: true
    }

    const connection = mongoose.createConnection(process.env.DATABASE_URL, options);

    const UserSchema = mongoose.Schema({
        username: String,
        ServicePasswords: [String]
    })

    const Service = connection.model("Service", UserSchema)

    if(req.method === 'POST' && service){

        Service.findOne({username: user}, (err, found) => {
        if(err){
            console.error(err)
        }else if(found) {
            found.ServicePasswords.push(service + " : " + password)
            found.save((err, data) => {
                if(err) console.error(err)

                console.log(data)
            })
        }else{
        
        
        const newService = new Service({
            username: user,
            ServicePasswords: [service + " : " + password]
        })
        
        newService.save((err, data) => {
            if(err) console.error(err)
            console.log(data)
        })
        }
    })
    }

    const serviceList = Service.find({username: user}, (err, found) => {
        if(err) console.error(err);
        console.log(found)
        return found
    });

    console.log(serviceList)
    res.json(serviceList)
}

    