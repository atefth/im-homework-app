import openSocket from "socket.io-client";
import axios from "axios";
import { API_ENDPOINT } from "../config";

const socket = openSocket("http://localhost:3001");

const uploadProgressStream = (cb) => {
  socket.on("uploadProgress", cb);
};

const uploadImages = ({ uploads, visibility, resizeTo }) => {
  const url = `${API_ENDPOINT}/upload`;

  const formData = new FormData();
  uploads.map(({ file }) => {
    formData.append("uploads", file, file.name);
  });
  formData.append("visibility", visibility);
  formData.append("resizeTo", resizeTo);

  const headers = {
    "content-type": "multipart/form-data",
  };

  axios
    .request({
      method: "post",
      url,
      data: formData,
      headers,
    })
    .then((data) => {
      console.log(data);
    });
};

export { uploadProgressStream, uploadImages };
