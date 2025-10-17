import axios from "axios";

// export const Url = "http://localhost:3001";
// export const BaseUrl = "http://localhost:3001/airbuzz";
// export const downloadUrl = "http://localhost:3001/airbuzz/download";

//
// export const downloadUrl = "http://20.193.157.226:3001/airbuzz/download";
// export const Url = "http://20.193.157.226:3001";
// export const BaseUrl = "http://20.193.157.226:3001/airbuzz";

// live
export const downloadUrl = "https://www.airbuzzintl.com/airbuzz/download";
export const Url = "https://www.airbuzzintl.com/airbuzz";
export const BaseUrl = "https://www.airbuzzintl.com/airbuzz";

export const instance = axios.create({
  baseURL: BaseUrl,
});
