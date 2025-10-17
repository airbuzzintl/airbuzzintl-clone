import { AiFillInfoCircle, AiOutlineLogin } from "react-icons/ai";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { BsCardHeading, BsTelephoneInbound } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import Countries from "../../components/elements/Countries";
import { MdOutlineArticle } from "react-icons/md";
import LoginIcon from "@mui/icons-material/Login";
export const navConfig = [
  {
    title: "Services",
    icon: <MiscellaneousServicesIcon size={22} style={{ color: "#fff" }} />,
    children: [
      {
        title: "International",
        icon: <BsCardHeading size={22} />,
        path: "/Services/International",
      },
      {
        title: "Domestic",
        icon: <BsCardHeading size={22} />,
        path: "/Services/Domestic",
      },
    ],
  },

  {
    title: "About",
    path: "/About",
    icon: <AiFillInfoCircle size={22} />,
  },
  {
    title: "Support",
    icon: <BiSupport size={22} style={{ color: "#fff" }} />,
    children: [
      {
        title: "FAQ",
        icon: <BsCardHeading size={22} />,
        path: "/Support/FAQ",
      },
      {
        title: "Downloads",
        icon: <BsCardHeading size={22} />,
        path: "/Support/Downloads",
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
        path: "/Contact/Careers",
      },
      {
        title: "Franchise",
        icon: <BsCardHeading size={22} />,
        path: "/Contact/Franchise",
      },
    ],
  },
  {
    title: "Blogs",
    path: "/Articles",
    icon: <MdOutlineArticle size={22} />,
  },
  {
    title: "Track",
    path: "/Track",
    icon: <MdOutlineArticle size={22} />,
  },
  {
    title: "Login",
    path: "/login",
    icon: <LoginIcon size={22} />,
  },
  {
    title: "Countries",
    component: <Countries />,
  },
];
