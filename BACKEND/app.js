import express from "express";
import { AuthRouter } from "./routes/authRoutes.js";
import { commentRouter } from "./routes/commentRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import passport from "passport";
import cors from "cors";
import "./config/passport.js";


const corsOptions = {
  origin: "http://localhost:5173", // solo este origen puede hacer peticiones
  credentials: true, // permite enviar cookies y encabezados de autorización
};

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cors(corsOptions)); //habilita CORS para que el fronted pueda hacer peticiones al backend

const PORT = process.env.PORT || 3000;

app.use("/", AuthRouter);
app.use("/", postRouter);
app.use("/", commentRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
