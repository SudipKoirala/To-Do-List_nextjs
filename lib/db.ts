import mongoose from "mongoose"; 

const MONGO_URI = process.env.MONGODB_URI;

if(!MONGO_URI){
    throw new Error("MONGODB khalichha jasto chha")
}

declare global{
   var _mongoose : {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null
    }
}


let cached = global._mongoose;

if(!cached) cached = global._mongoose ={conn:null, promise:null}

export const connectDb=async()=>{
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI)
    }

    cached.conn = await cached.promise;
    return cached.conn
}

