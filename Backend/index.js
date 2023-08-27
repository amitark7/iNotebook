const connectDB =require('./db')
const express = require("express");
const authUser= require('./routes/authe');
const notesAuth=require('./routes/note');
var cors = require('cors')

connectDB();

const app = express();

app.use(cors())
app.use(express.json())
// app.get('/',(req,res)=>{
//   res.send('Hello Amit')
// })
app.use('/api/auth',authUser);
app.use('/api/notes', notesAuth);

app.listen(port, () => {
  console.log(`Example app listening `);
});
