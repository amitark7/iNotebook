const mongoose=require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/Notebook?directConnection=true';
// const connectToMongo=async ()=>{
//    await mongoose.connect(mongoURI,()=>{
//         console.log("Database Connect Successfully....");
//     })
// }
// const connectDB=()=>{
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("we are connected");
//   })
//   .catch((err) => console.log(err));
// }
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true }) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}
module.exports=connectDB;