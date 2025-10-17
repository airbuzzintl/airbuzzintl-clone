import { useRoutes } from "react-router-dom";
import LandingScreen from "./pages/genral/landing/index";
import Career from "./pages/genral/contact/Career";
import Franchise from "./pages/genral/contact/Franchise";
import Domestic from "./pages/genral/services/Domestic";
import International from "./pages/genral/services//International";
import Download from "./pages/genral/support/Download";
import Faq from "./pages/genral/support/FAQ";
import Estimation from "./pages/admin/Estimation";
import Introduction from "./pages/admin/Introduction";
import SocialFeeds from "./pages/admin/SocialFeeds";
import GotaQuestion from "./pages/admin/GotaQuestion";
import Internationals from "./pages/admin/Internationals";
import Domestics from "./pages/admin/Domestics";
import MissionVision from "./pages/admin/MissionVision";
import OurStory from "./pages/admin/OurStory";
import JoinTeam from "./pages/admin/JoinTeam"; 
import FAQ from "./pages/admin/FAQ";
import Documents from "./pages/admin/Documents";
import Careers from "./pages/admin/Careers";
import Franchises from "./pages/admin/Franchises";
import AirBuzzAccount from "./pages/admin/AirBuzzAccount";
import Logistics from "./pages/admin/Logistices";
import ViewSocialMediaCards from "./pages/genral/ViewSocialMediaCards";
import Login from "./pages/genral/login";
import About from "./pages/genral/about";
import Articles from "./pages/genral/articles";
import ArticlesDetails from "./pages/genral/articles/ArticlesDetails";
import DashboardLayout from "./layouts/admin/DashboardLayout";
import TopNavigationBar from "./layouts/general/TopNavigationBar";
import Feeds from "./pages/admin/Feeds";
import Article from "./pages/admin/Article";
import Track from "./pages/genral/landing/Track";
import BlogsTitles from "./pages/admin/BlogsTitles";
import  Title  from "./pages/admin/Title";
import NewArticle from "./pages/admin/newArticle";

export default function SkyExRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <TopNavigationBar />,
      children: [
        { path: "/", element: <LandingScreen /> },
        { path: "About", element: <About /> },
        { path: "Services/International", element: <International /> },
        { path: "Services/Domestic", element: <Domestic /> },
        { path: "Contact/Careers", element: <Career /> },
        { path: "Contact/Franchise", element: <Franchise /> },
        { path: "Support/FAQ", element: <Faq /> },
        { path: "Support/Downloads", element: <Download /> },
        { path: "SocialMedia", element: <ViewSocialMediaCards /> },
        { path: "Articles", element: <Articles /> },
        { path: "ArticlesDetails/:title", element: <ArticlesDetails /> },
        { path: "Track", element: <Track /> },
      ],
    },
    { path: "/login", element: <Login /> }, 
    {
      path: "/AdminLogin",
      element: <Login />,
    },
    {
      path: "/AdminDashboard",
      element: <DashboardLayout />,
      children: [
        { path: "Introduction", element: <Introduction /> },
        { path: "Estimation", element: <Estimation /> },
        { path: "Logistics", element: <Logistics /> },
        { path: "BlogsTitles", element: <BlogsTitles /> },
        { path: "Article", element: <Article /> },
        { path: "newArticle", element: <NewArticle /> },
        { path: "Feeds", element: <Feeds /> },
        { path: "AirBuzzAccount", element: <AirBuzzAccount /> },
        { path: "SocialFeeds", element: <SocialFeeds /> },
        { path: "GotaQuestion", element: <GotaQuestion /> },
        { path: "Internationals", element: <Internationals /> },
        { path: "Domestics", element: <Domestics /> },
        { path: "MissionAndVision", element: <MissionVision /> },
        { path: "OurStory", element: <OurStory /> },
        { path: "JoinTeam", element: <JoinTeam /> },
        { path: "FAQ", element: <FAQ /> },
        { path: "Documents", element: <Documents /> },
        { path: "Careers", element: <Careers /> },
        { path: "Franchises", element: <Franchises /> },
        {path:  "Title",element:<Title />}
      ],
    },
  ]);

  return routes;
}
