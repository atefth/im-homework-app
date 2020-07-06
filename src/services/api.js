import axios from "axios";
import { API_ENDPOINT } from "../config";

const httpLayer = axios.create({
  withCredentials: true,
});

const uploadImages = (
  { uploads, visibility, resizeTo },
  setImages,
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
      setImages(
        data.uploaded.map(({ Key, Size }) => {
          return {
            originalKey: Key,
            originalSize: undefined,
            originalUrl: undefined,
            resizedKey: undefined,
            resizedSize: undefined,
            resizedUrl: undefined,
          };
        })
      );
      setUploads([]);
    })
    .catch((error) => console.log(error));
};

const fetchStatus = async () => {
  const uploadedUrl = `${API_ENDPOINT}/images/uploaded`;
  const resizedUrl = `${API_ENDPOINT}/images/resized`;
  return httpLayer
    .get(uploadedUrl)
    .then(({ data }) => {
      let { Contents } = data.data;
      const images = Contents.map(({ Key, Size }) => {
        return {
          originalKey: Key,
          originalSize: Size,
          originalUrl: undefined,
          resizedKey: undefined,
          resizedSize: undefined,
          resizedUrl: undefined,
        };
      });
      return httpLayer.get(resizedUrl).then(({ data }) => {
        let { Contents } = data.data;
        if (Contents.length) {
          Contents.map(({ Key, Size }, index) => {
            images[index].resizedKey = Key;
            images[index].resizedSize = Size;
          });
        }
        if (images.length) {
          return images;
        } else {
          return [];
        }
      });
    })
    .catch((error) => console.log(error));
};

const fetchImageUrl = async (key) => {
  const url = `${API_ENDPOINT}/image`;
  return httpLayer
    .get(url, { params: { key } })
    .then(({ data }) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

export { uploadImages, fetchStatus, fetchImageUrl };
