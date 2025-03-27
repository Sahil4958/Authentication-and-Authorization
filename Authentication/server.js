import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import AuthRouter from "./routers/userAuthRouter.js";
import homeRouter from "./routers/homeRouter.js";
import adminRouter from "./routers/adminRouter.js";

dotenv.config();
dbConnection;
const app = express();

app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 7006;

app.listen(PORT, () => {
  console.log(`Your server has been running at http://localhost:${PORT}`);
});
