import { Box } from "@mui/material";
import styled from "styled-components";
// import { TextContainer } from "../../components/elements";
// import { skyExColors } from "../../controller/constant/colors";
import { Card } from "@mui/material";
import { fontSizes, skyExColors } from "@/controller/constant";
import { TextContainer } from "@/components/elements";
// import { fontSizes } from "../../controller/constant";

const CardDesign = ({ description }) => {
  return (
    <Card
      sx={{
        minHeight: "30vh",
        borderRadius: 5,
        margin: 2,
        boxShadow: "0 1px 20px 0 rgba(17,30,79,.1)",
      }}
    >
      <Box sx={{ padding: "2rem 1.25rem" }}>
        <TextContainer
          color={skyExColors.skyExDarkGrey}
          fontSize={"16px"}
          value={description}
        />
      </Box>
    </Card>
  );
};

const CompanyProfiles = () => {
  const data = [
    `As the founder of our logistics startup, I've got a burning desire to 
rock the world of our customers and take our company to epic 
heights. This mission fills me with insane levels of passion and 
dedication.`,
    `In the world of logistics, we know that each customer is unique with 
their own needs and dreams. Our mission? To amaze them with 
service so damn good, they'll wonder if we've got magic powers. 
We're not just here to deliver packages, we're here to unleash positive 
vibes and transform their businesses into profit-minting power 
machines.`,
    `I, along with my amazing team have gathered an arsenal of skills and 
knowledge to conquer the logistics game. From mastering the secret 
arts of the supply chain to geeking out on the latest tech, we are ready 
to push boundaries and make jaws drop.`,
    `Beyond the logistics hustle, I'm all about building a tribe of awesome 
individuals. Our team is like family, and together we're unstoppable. 
We're here to inspire each other, laugh like maniacs, and conquer 
obstacles with style. We're not just here to work, we're here to create a 
revolution.`,
    `Looking back, we've already slayed some serious dragons and 
touched lives along the way. But guess what? We're just getting 
started, and the fire inside me is roaring like a volcano. We're about to 
unleash a level of awesomeness that'll make heads spin and shake up 
the industry like never before.`,
    `So, my incredible team and amazing customers, strap on your 
seatbelts because we're embarking on an epic adventure. We're gonna 
blow minds, break rules, and redefine what it means to be the kings of 
logistics. Get ready to rock and roll, because we're about to create a 
legacy that'll make future generations say, "Damn, those guys were 
the coolest logistics superheroes ever!" Let's do this!`,
  ];
  return (
    <Wrapper>
      <TopCurve />
      <TextContainer
        value={"Unveiling the mastermind behind our story"}
        fontSize={fontSizes.subHeading}
        color={skyExColors.skyExTextBoxGrey}
        fontWeight={"bold"}
        textAlign={"center"}
      />
      <Box m={2} />
      <ServiceWrapper>
        <div className="gallery" style={{ position: "relative" }}>
          {data.map((e) => (
            <CardDesign description={e} />
          ))}
        </div>
      </ServiceWrapper>
      <BottomCurve />
      <div
        style={{
          minHeight: "3vh",
          background: `linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  )`,
        }}
      />
    </Wrapper>
  );
};

export default CompanyProfiles;
const Wrapper = styled.section`
  min-height: 90vh;
  background: ${skyExColors.secondary};
`;
const TopCurve = styled.div`
  clip-path: ellipse(60% 70% at 50% 0%);
  height: 20vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.darkPrimary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;
const BottomCurve = styled.div`
  clip-path: ellipse(60% 70% at 50% 100%);
  height: 20vh;
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
`;

const ServiceWrapper = styled.div`
  display: flex;
  justifycontent: center;
`;
