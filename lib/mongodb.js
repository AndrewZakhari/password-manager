import {MongoClient} from 'mongodb';

let client
let clientPromise

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

if(!process.env.DATABASE_URL){
    throw new Error("Please add your Mongo URI to .env")
}

if(process.env.NODE_ENV === 'development'){
    if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.DATABASE_URL, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(prcess.env.DATABASE_URL, options)
  clientPromise = client.connect()
}

export default clientPromise