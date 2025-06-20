import express from 'express';
import dotenv from 'dotenv'
import { AuthRouter } from './routes/authRoutes.js';
import { commentRouter } from './routes/commentRoutes.js';
import { postRouter } from './routes/postRoutes.js';
import passport from 'passport';
import './config/passport.js';
dotenv.config();

const app = express();
app.use(express.json()); 
app.use(passport.initialize());

const PORT = process.env.PORT || 3000;


app.use('/', AuthRouter)
app.use('/', postRouter)
app.use('/', commentRouter)


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);  
})