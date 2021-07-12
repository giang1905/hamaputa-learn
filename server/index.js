require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const router = require("./routes/auth");
app.use(express.json());
app.use(cors());

connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qve17.mongodb.net/database?retryWrites=true&w=majority`, //AcbTC1234
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

app.use("/", router);

// app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
