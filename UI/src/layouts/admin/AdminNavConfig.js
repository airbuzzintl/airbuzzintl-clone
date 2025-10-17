import { Title, TitleOutlined, TitleRounded } from "@mui/icons-material";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsCardHeading,
  BsReceipt,
  BsTelephoneInbound,
  BsHandThumbsUp,
} from "react-icons/bs";
import { MdFlight } from "react-icons/md";
export const adminNavConfig = [
  {
    title: "Landing Screen",
    icon: <AiOutlineHome size={22} />,
    children: [
      {
        title: "Introduction",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Introduction",
      },
      {
        title: "Estimation",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Estimation",
      },
      {
        title: "Social Media Feeds",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Feeds",
      },
      {
        title: "AirBuzz Account",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/AirBuzzAccount",
      },
      {
        title: "Service",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Logistics",
      },

      {
        title: "Faq",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/GotaQuestion",
      },
      {
        title: "Blogs",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/BlogsTitles",
      },
    ],
  },
  {
    title: "Services",
    icon: <MdFlight size={22} />,
    children: [
      {
        title: "International",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Internationals",
      },
      {
        title: "Domestic",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Domestics",
      },
    ],
  },
  {
    title: "About",
    icon: <BsReceipt size={22} />,
    children: [
      {
        title: "Mission/Vision",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/MissionAndVision",
      },
      {
        title: "Our Story",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/OurStory",
      },
      {
        title: "Join Team",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/JoinTeam",
      },
    ],
  },
  {
    title: "Support",
    icon: <BsHandThumbsUp size={22} />,
    children: [
      {
        title: "FAQ",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/FAQ",
      },
      {
        title: "Documents",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Documents",
      },
    ],
  },
  {
    title: "Contact",
    icon: <BsTelephoneInbound size={22} />,
    children: [
      {
        title: "Careers",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Careers",
      },
      {
        title: "Franchise",
        icon: <BsCardHeading size={22} />,
        path: "/AdminDashboard/Franchises",
      },
    ],
  },
  {
    title: "Create-Blogs",
    icon: <BsCardHeading size={22} />,
    path: "/AdminDashboard/newArticle",
  },
  {
    title: "View-Blogs",
    icon: <BsCardHeading size={22} />,
    path: "/AdminDashboard/Article",
  },
  {
    title: "Meta-Title",
    icon: <TitleOutlined size={22} />,
    path: "/AdminDashboard/Title", 
  },
  
  
];
