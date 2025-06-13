import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.json({
        message: "Welcome"
    })
})

app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`);  
})