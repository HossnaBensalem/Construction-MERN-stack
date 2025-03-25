import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import projectRoutes from './routes/projectRoutes.js '
import taskRoutes from './routes/taskRoutes.js '
import resourceRoutes from './routes/resourceRoutes.js'

const PORT = 3000


const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', resourceRoutes);




await mongoose.connect('mongodb://127.0.0.1:27017/construction').then(()=>{

    console.log('✅ DB connect successfully')
}).catch((error)=> {
    console.error(' Connect is failed')
})




app.listen(PORT,()=>{
    console.log(`🚀 Server is Runnin in http://localhost:${PORT}`)
})