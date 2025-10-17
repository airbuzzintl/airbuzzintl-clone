import React, { useContext, useEffect, useState } from "react";
import ManagementTeams from "./ManagementTeams";
import ChooseUs from ".//ChooseUs";
import MissionAndVision from "./MissionAndVision";
import styled from "styled-components";
import { skyExColors } from "../../../controller/constant";
import { loadContext } from "../../../App";
import { instance } from "../../../utils/api";
import StickyFooter from "../landing/StickyFooter"; 

const About = () => {
  const { setLoading } = useContext(loadContext);
  const [aboutScreenDetails, setAboutScreenDetails] = useState({});
  const AboutData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/About/allContents`);
      setAboutScreenDetails(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    AboutData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {aboutScreenDetails ? (
        <section style={{ minHeight: "100%" }}>
          <MissionAndVision
            missionVision={aboutScreenDetails?.mission_vission}
          />
          <Wrapper class="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
            <div id="stars4"></div>
            <ManagementTeams
              ourStoryData={aboutScreenDetails?.our_story?.title}
              slideData={aboutScreenDetails?.our_story?.slide}
            />
            {aboutScreenDetails?.choose_us?.chooseus?.length > 0 && (
              <ChooseUs chooseUs={aboutScreenDetails.choose_us} />
            )}
            <StickyFooter />
          </Wrapper>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default About;

const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
`;
