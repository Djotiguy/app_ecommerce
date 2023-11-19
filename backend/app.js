import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js";
dotenv.config();

const app = express();
app.use(express.static("client/build"));
app.set("client", "./client");
app.set("view engine", "jsx");
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
