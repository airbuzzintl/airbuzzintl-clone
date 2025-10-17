import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Nav from "./Nav";
import { cookies } from "../../controller/Common";
import { Helmet } from "react-helmet";
import { instance } from "../../utils/api";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  width: "100%",
  background: "#f3f3f3",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useMemo(() => {
    const token = cookies.get("user")?.userId;
    return Boolean(token);
  }, []);

  const allowMethod = () => {
    const token = cookies.get("user")?.userId;
    
    if (!token) {
      navigate("/airbuzz/AdminLogin");
    }
  };
  

  const [pageTitle,setPageTitle] = useState([]);  

  const fetchPageDetails = async () =>{
    try {
      const response = await instance.get(`/Service/getmetaTitle`);
      
      if(response.status === 200){
        setPageTitle(response.data);
       
      }
    } catch (error) {
      console.error("Error fetching page details:", error);
    }
  }; 

  useEffect(() =>{
    fetchPageDetails();
  },[]);

  useEffect(() => {
    allowMethod();
  }, []);

 

  return (
    <> 
      <StyledRoot>  
     <Helmet>
     <title>{pageTitle.length > 0 ? pageTitle[0]?.title : "AirBuzz"}</title>
        {/* Optionally, you can also set other meta tags dynamically */}
        {/* <meta name="description" content={pageTitle[0]?.description} /> */}
       </Helmet>
        
        {isAuthenticated ? (
          <>        
            <Header onOpenNav={() => setOpen(true)} />
            <Nav openNav={open} onCloseNav={() => setOpen(false)} />
            <Main>
              <Outlet />
            </Main>
          </>
        ) : null}
      </StyledRoot>
    </>
  );
}
