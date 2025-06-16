import express from 'express';
import { AuthRouter } from './routes/authRoutes.js';

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.json({
        message: "Welcome"
    })
})

app.use('/', AuthRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);  
})