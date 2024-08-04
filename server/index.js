import express from "express";
import cors from "cors"; 
import authRoutes from "./routes/auth.js"; 
import postsRoutes from "./routes/posts.js"; 
import commentRoutes from './routes/comments.js'
import usersRoutes from "./routes/users.js"; 
import uploadRoutes from "./routes/upload.js"; 
import cookieParser from "cookie-parser"; 
import db from "./db.js"

const app = express(); 
const port = 5000; 

(async () => {
  try {
    await db.connect();
    console.log('Database connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true, 
    origin: true, 
  })
);
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);
app.use("/users", usersRoutes);
app.use("/upload", uploadRoutes);
app.listen(port, () => {
  console.log("Server running on port:", port);
});
