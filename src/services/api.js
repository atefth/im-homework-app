import axios from "axios";
import { API_ENDPOINT } from "../config";

const httpLayer = axios.create({
  withCredentials: true,
});

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

  httpLayer
    .request({
      method: "post",
      url,
      data: formData,
      headers,
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

const fetchStatus = () => {
  const url = `${API_ENDPOINT}/images`;
  return httpLayer.get(url);
};

export { uploadImages, fetchStatus };
