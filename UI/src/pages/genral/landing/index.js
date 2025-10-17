import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant";
import { instance } from "../../../utils/api";
import Header from "./Header";
import Estimation from "./Estimation";
import SocialMediaComponent from "./SocialMediaComponent";
import CareersContent from "./CareersContent";
import Services from "./Services";
import FaqContent from "./FaqContent";
import Articles from "./Articles";
import StickyFooter from "./StickyFooter";
import { loadContext } from "../../../App";
import Tracker from "./Tracker";
import { useAirbuzzLocation } from "../../../controller/constant/LocationContext";

const LandingScreen = () => {
  const { isVisible } = useAirbuzzLocation();
  const { setLoading } = useContext(loadContext);
  const [head, setHead] = useState([]);
  const [account, setAccount] = useState([]);
  const [article, setArticle] = useState([]);
  const [service, setService] = useState([]);
  const [title, setTitle] = useState([]);
  const [marginTop, setMarginTop] = useState("0px");

  const updateMarginTop = () => {
    if (isVisible && window.innerWidth < 600) {
      setMarginTop("50px");
    } else if (window.innerWidth <= 1200) {
      setMarginTop("40px");
    } else {
      setMarginTop("0px");
    }
  };

  useEffect(() => {
    landingScreenDetails();
    updateMarginTop();
    window.addEventListener("resize", updateMarginTop);
    return () => window.removeEventListener("resize", updateMarginTop);
  }, []);

  const landingScreenDetails = async () => {
    setLoading(true);
    try {
      const [response1, response2, response3, response4, response5] =
        await Promise.all([
          instance.get(`/Landing/getHeader&EstimationData`),
          instance.get(`/Landing/getOpenAccount&FaqData`),
          instance.get(`/Landing/getAirfreight&ArticlesData`),
          instance.get(`/Landing/getService&SocialFeedsData`),
          instance.get(`/Landing/getAllTitles`),
        ]);

      setHead(response1.data || []);
      setAccount(response2.data || []);
      setArticle(response3.data || []);
      setService(response4.data || []);
      setTitle(response5.data || []);
    } catch (err) {
      console.error("An error occurred while fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="bg-animation" style={{ marginTop }}>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>
      <Header data={head.headerData} />
      <br />
      <div style={{ textAlign: "center" }}>
        <Tracker />
      </div>
      <br />
      <div id="estimation">
        <Estimation estimationData={head.estimationData} />
      </div>
      <div id="socialMediaComponent">
        <SocialMediaComponent data={service.socialFeedsData} title={title.feeds} />
      </div>
      <CareersContent data={account.accountData} />
      <br />
      <Services data={service?.serviceData} />
      <FaqContent faqData={account.faqData} />
      <br />
      <Articles
        ArticlesData={article.articlesData}
        title={title.articles_title}
        description={title.articles_description}
      />
      <br />
      <br />
      <StickyFooter />
    </Wrapper>
  );
};

export default LandingScreen;

const Wrapper = styled.section`
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;
