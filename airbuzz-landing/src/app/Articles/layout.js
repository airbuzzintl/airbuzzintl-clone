import { instance } from "@/utils/api";
import axios from "axios";

async function ArticlesData() {
  try {
    const response = await axios.get(
      `https://www.airbuzzintl.com/airbuzz/Landing/getArticleDetails`
    );
    if (response.status === 200) {
      let data = response.data.map((e) => ({
        ...e,
        date: e.date.split("-"),
      }));
      data.sort((a, b) => {
        const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2]);
        const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2]);
        return dateB - dateA;
      });
      return data;
    }
    return [];
  } catch (e) {
    console.log("erorororor", e);
    return [];
  }
}
export { ArticlesData };
export default function Layout({ children }) {
  return <>{children}</>;
}
