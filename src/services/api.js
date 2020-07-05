import axios from "axios";
import { API_ENDPOINT } from "../config";

const httpLayer = axios.create({
  withCredentials: true,
});

const uploadImages = (
  { uploads, visibility, resizeTo },
  setUploadedImages,
  setUploads
) => {
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
    .then(({ data }) => {
      setUploadedImages(data);
      setUploads([]);
    })
    .catch((error) => console.log(error));
};

const fetchResizeStatus = (setImages) => {
  const url = `${API_ENDPOINT}/images/resized`;
  return httpLayer
    .get(url)
    .then(({ data }) => {
      const { Contents } = data.data;
      setImages(Contents);
    })
    .catch((error) => console.log(error));
};

const fetchUploadedStatus = (setUploadedImages) => {
  const url = `${API_ENDPOINT}/images/uploaded`;
  return httpLayer
    .get(url)
    .then(({ data }) => {
      const { Contents } = data.data;
      setUploadedImages(Contents);
    })
    .catch((error) => console.log(error));
};

const fetchImage = ({ key, index }, state, setState) => {
  const url = `${API_ENDPOINT}/image`;
  httpLayer
    .get(url, { params: { key } })
    .then(({ data }) => {
      const url = data.data;
      setState([
        ...state.slice(0, index),
        { ...state[index], url },
        ...state.slice(index + 1, state.length),
      ]);
    })
    .catch((error) => console.log(error));
};

export { uploadImages, fetchResizeStatus, fetchUploadedStatus, fetchImage };
