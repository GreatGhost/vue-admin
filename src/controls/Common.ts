import http from "@/http";

class CommonService {
  static upload(formData) {
    return new Promise((resolve, reject) => {
      http
        .post("/upload", { file: formData })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default CommonService;
