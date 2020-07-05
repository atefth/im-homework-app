import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001");

const uploadProgressStream = (cb) => {
  socket.on("uploadProgress", cb);
};

export { uploadProgressStream };
