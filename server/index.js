const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./config/db");
const userRoutes = require('./routes/userRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use('/api', userRoutes);

connection();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
