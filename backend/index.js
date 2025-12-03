import "dotenv/config";
import express from "express";
import cors from "cors";
import schoolRoutes from "./routes/schools.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://school-management-system0.vercel.app",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/schoolImages", express.static("schoolImages"));

app.use("/api/schools", schoolRoutes);

app.use("/", (req, res) =>
  res.send({
    activateStatus: true,
    error: false,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
