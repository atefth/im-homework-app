import { io } from "socket.io-client";
const url = "http://localhost:3001";
const socket = io(url, {
  withCredentials: true
});

const uploadProgressStream = (cb) => {
  socket.on("uploadProgress", cb);
};

const resizedImageStream = (cb) => {
  socket.on("resizedImage", cb);
};

export { uploadProgressStream, resizedImageStream };
