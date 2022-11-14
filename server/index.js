require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db/db");
const errorMiddleware = require("./middlewares/error-middleware");
const router = require("./routes/index");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const onConnection = require("./socket_io/onConnection");
const { ChatRoomModel, MessageModel } = require("./models/index");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// io.use(async (socket, next) => {});

const users = [];
io.on("connection", async (socket) => {
  onConnection(io, socket);
});

const start = async () => {
  sequelize.authenticate();
  sequelize.sync();
  server.listen(PORT, () => console.log(`server start on port ${PORT}`));
};

start();
