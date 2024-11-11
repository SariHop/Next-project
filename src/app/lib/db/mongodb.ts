import moongoose  from 'mongoose'
const MONGO_URI = process.env.MONGO_URI || ""

let isConnected = false

const connect = async ()=>{

    if(isConnected){
        console.log("Alredy connected to MongoDB")
        return
    }

    try{
        const db = await moongoose.connect(MONGO_URI)
        isConnected = db.connection.readyState === 1
        console.log("connect Mongodb")
    }catch{
        console.error("connect Faild")
    }
}

export default connect