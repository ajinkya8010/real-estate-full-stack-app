import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8800
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin:  clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/test", testRoute);



app.listen(port, () => {
  console.log("Server is running!");
});


