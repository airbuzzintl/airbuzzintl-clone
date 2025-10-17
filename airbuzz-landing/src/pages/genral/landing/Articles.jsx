import styled from "styled-components";
import { skyExColors } from "../../../controller/constant/colors";
import { fontSizes } from "../../../controller/constant/fontSize";
import { Url } from "../../../utils/api";
import { FormButton, TextContainer } from "../../../components/elements";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

function Articles({ ArticlesData = [], title, description }) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/Articles");
  };

  const sortedArticles = ArticlesData?.map((item) => ({
    ...item,
    date: item.date.split("-"),
  }))?.sort((a, b) => {
    const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2]);
    const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2]);
    return dateB - dateA;
  });

  const firstArray = sortedArticles?.slice(0, 1);
  const secondArray = sortedArticles?.slice(1, 4);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Wrapper>
      <TextBox>
        <TextContainer
          fontSize={fontSizes.headings}
          fontWeight={"700"}
          lineHeight={"1.1"}
          color={skyExColors.skyExTextBoxGrey}
          value={title}
        />
        <br />
        <TextContainer
          fontSize={fontSizes.subcontent}
          lineHeight={"1.5"}
          color={skyExColors.skyExTextBoxGrey}
          textAlign={"justify"}
          gutterBottom
          value={description}
        />
      </TextBox>

      <Grid container spacing={2}>
        {firstArray?.map((e) => (
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12} key={e.id}>
            <Box
              onClick={() => router.push(`/ArticlesDetails/${e.slug}`)}
              sx={{
                position: "relative",
                backgroundImage: `url(${Url}${e.img})`,
                width: "100%",
                height: "75vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "15px",
                "@media (max-width: 800px)": {
                  backgroundSize: "cover",
                },
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: "50px",
                  left: "2%",
                  width: "90%",
                  "@media (max-width: 1200px)": {
                    padding: "15px",
                    bottom: "70px",
                    left: 0,
                    right: 0,
                    width: "100%",
                  },
                }}
              >
                <TextContainer
                  fontSize={fontSizes.headings}
                  color={skyExColors.skyExTextBoxGrey}
                  lineHeight={"1.5"}
                  textAlign={"justify"}
                  gutterBottom
                  value={e.title}
                  overflow={"hidden"}
                  display={"-webkit-box"}
                  WebkitLineClamp={4}
                  WebkitBoxOrient={"vertical"}
                  fontWeight={"bold"}
                />
                <TextContainer
                  fontSize={fontSizes.subHeading}
                  color={skyExColors.skyExTextBoxGrey}
                  lineHeight={"1.5"}
                  textAlign={"justify"}
                  gutterBottom
                  value={e.description.replace(/<[^>]+>/g, "")}
                  overflow={"hidden"}
                  display={"-webkit-box"}
                  WebkitLineClamp={4}
                  maxChar={250}
                  WebkitBoxOrient={"vertical"}
                />
              </Box>
            </Box>
          </Grid>
        ))}

        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          {secondArray?.map((item) => {
            const titleSlug = item.title.replace(/\s+/g, "-").toLowerCase();
            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  marginBottom: "10px",
                  "@media (max-width: 600px)": {
                    display: "block",
                  },
                }}
                onClick={() => router.push(`/ArticlesDetails/${item.slug}`)}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Img
                    src={`${Url}${item.img}`}
                    alt="images"
                    style={{ borderRadius: "10px" }}
                  />
                </Box>
                &nbsp;&nbsp;&nbsp;
                <Box>
                  <TextContainer
                    fontSize={fontSizes.careerCardContentDescription.xxs}
                    lineHeight={"1.2"}
                    color={skyExColors.skyExTextBoxGrey}
                    textAlign={"justify"}
                    gutterBottom
                    value={item.title}
                    maxChar={250}
                    fontWeight={"bold"}
                  />
                  <TextContainer
                    fontSize={fontSizes.careerCardContentDescription.xxs}
                    lineHeight={"1.2"}
                    color={skyExColors.skyExTextBoxGrey}
                    textAlign={"justify"}
                    gutterBottom
                    value={item.description.replace(/<[^>]+>/g, "")}
                    maxChar={150}
                    overflow={"hidden"}
                  />
                  <TextContainer
                    fontSize={fontSizes.careerCardContentDescription.xs}
                    lineHeight={"2"}
                    color={skyExColors.grey}
                    textAlign={"justify"}
                    gutterBottom
                    value={`${item.date[2]}th ${months[item.date[1] - 1]} ${
                      item.date[0]
                    }`}
                  />
                </Box>
              </Box>
            );
          })}

          <Box sx={{ textAlign: "center", padding: "5px" }}>
            <FormButton
              value={"Read more"}
              viewMore
              height={"30px"}
              clickFunction={handleNavigate}
            />
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Articles;
const Wrapper = styled.section`
  background: linear-gradient(
    90deg,
    ${skyExColors.primary} 0%,
    ${skyExColors.darkPrimary} 100%
  );
  background-size: cover;
  align-items: center;
  padding: 0 2%;
  @media (max-width: 600px) {
    padding: 0 2%;
  }
`;
const TextBox = styled.div`
  transform: translateY(-15%);
  z-index: 2;

  @media (max-width: 600px) {
    padding: 0 2%;
    transform: translateY(0%);
  }
`;
const Img = styled.img`
  width: 150px;
  height: 120px;
  objectfit: cover;
  @media (max-width: 1200px) {
    width: 200px;
    height: 170px;
    background-size: cover;
  }
  @media (max-width: 800px) {
    background-size: cover;
  }
`;
