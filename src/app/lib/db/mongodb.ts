import moongoose  from 'mongoose'
const MONGO_URI = process.env.MONGO_URI || ""

const connect = async ()=>{
    try{
        await moongoose.connect(MONGO_URI)
        console.log("connect Mongodb")
    }catch{
        console.error("connect Faild")
    }
}

export default connect