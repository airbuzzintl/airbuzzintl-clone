import { instance } from "@/utils/api";

export async function getarticle(slug) {
  try {
    const response = await instance.get(`/Landing/getArticleDetails/${slug}`);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Layout({ children }) {
  return <>{children}</>;
}
