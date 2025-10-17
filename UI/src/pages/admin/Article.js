import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import SearchIcon from "@mui/icons-material/Search";
import { FormButton, TextContainer } from "../../components/elements";
import { skyExColors } from "../../controller/constant";
import TextInputField from "../../components/elements/TextInputField";
import { Url, instance } from "../../utils/api";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import ArticleModal from "../../components/elements/ArticleModal";
import DatePickers from "../../components/elements/DatePickers";
import Crop from "../../components/elements/Crop";
import { useNavigate } from "react-router";

function Article() {
  const [open, setOpen] = useState(false);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [openCropModalImage2, setOpenCropModalImage2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [articleData, setArticleData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [id, setId] = useState();
  const navigate = useNavigate();
  const ApiKey = "bu8cqi68epq64p9fxfaytm96mcxuh65pzovedkoa6626p7e0";
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const handleEditorChange = (content, editor, id) => {
    setArticleData((prevArticleData) =>
      prevArticleData.map((a) =>
        a.id === id ? { ...a, description: content } : a
      )
    );
  };

  const getArticles = async () => {
    try {
      const response = await instance.get(`/Landing/getArticleDetails`);
      if (response?.status === 200) {
        const data = response?.data.map((i, index) => {
          const total = response.data.length;
          return {
            ...i,
            cardNumber: 1 + index,
          };
        });
        setArticleData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getArticles();
  }, []);
  const filterData = useMemo(() => {
    return articleData?.filter(
      (item) =>
        item.title
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.description
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.date.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, articleData]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setArticleData((prevArticleData) =>
      prevArticleData.map((a) => (a.id === id ? { ...a, [name]: value } : a))
    );
  };

  console.log("articleData", articleData);

  const handleNavigate = () => {
    navigate(`/AdminDashboard/newArticle`);
  };

  const updateArticles = async (data) => {
    console.log("data", data);

    try {
      await instance.put(
        `/Landing/updateArticleDetails/${data.id}`,
        {
          title: data.title,
          description: data.description,
          date: data.date,
          file: data.img,
          slug: data.slug,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await getArticles();
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };

  const deleteArticles = async (id) => {
    try {
      await instance.delete(`/Landing/deleteArticleDetails/${id}`);
      await getArticles();
      successAlert("Success");
    } catch (err) {
      console.log(err);
      errorAlert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f3f3f3",
      }}
    >
      {open ? (
        <ArticleModal
          open={open}
          close={handleClose}
          getArticles={getArticles}
        />
      ) : null}
      <br />
      <Stack
        sx={{
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "row",
          },
        }}
        paddingBottom={"10px"}
        justifyContent={"space-between"}
      >
        <TextContainer
          fontSize={{ md: "40px", xs: "30px" }}
          fontWeight={700}
          lineHeight={"1.2"}
          color={"#102C38"}
          value={"Blogs"}
        />
        <Box>
          <FormButton
            value={"Add"}
            padding={"0rem 2rem"}
            height={"40px"}
            background={skyExColors.secondary}
            shadow={"#fff"}
            fullWidth
            border
            clickFunction={handleNavigate}
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          width: { md: "70%", xs: "95%" },
          margin: "auto",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "row",
          },
        }}
        paddingBottom={"10px"}
        justifyContent={"space-between"}
      >
        <OutlinedInput
          id="outlined-adornment-weight"
          fullWidth
          sx={{ background: "#fff" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          placeholder={"Search..."}
          value={searchText}
          onChange={(a) => setSearchText(a.target.value)}
        />
      </Stack>
      <br />
      {filterData?.map((e, index) => (
        <div key={e.id}>
          <Card
            sx={{
              padding: "3.5vh",
              width: { md: "70%", xs: "95%" },
              margin: "auto",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <form>
              <Stack
                sx={{
                  width: "100%",
                  margin: "auto",
                  flexDirection: {
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "column",
                  },
                }}
                justifyContent={"space-between"}
              >
                <TextContainer
                  fontSize={"20px"}
                  fontWeight={700}
                  lineHeight={"1.2"}
                  color={"#102C38"}
                  // value={`Card ${index + 1}`}
                  value={`Card ${e?.cardNumber}`}
                />
                <Box
                  sx={{
                    display: { md: "flex", xs: "flex" },
                    alignSelf: { md: "center", xs: "none" },
                  }}
                >
                  <FormButton
                    value={"Delete"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    clickFunction={() => deleteArticles(e.id)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FormButton
                    value={"Update"}
                    padding={"0rem 2rem"}
                    height={"40px"}
                    background={skyExColors.secondary}
                    shadow={"#fff"}
                    fullWidth
                    border
                    clickFunction={() => updateArticles(e)}
                  />
                </Box>
              </Stack>
              <br />

              <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"Title"}
                    name={"title"}
                    maxLength={50}
                    multiline
                    rows={2}
                    value={e.title}
                    onChange={(a) => handleChange(a, e.id)}
                    required
                    focused={e.title}
                  />
                </Grid>
                {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextInputField
                    label={"description"}
                    name={"description"}
                    maxLength={560}
                    rows={3}
                    multiline
                    value={e.description}
                    onChange={(a) => handleChange(a, e.id)}
                    focused={e.description}
                  />
                </Grid> */}
                <Editor
                  apiKey={ApiKey}
                  value={e.description}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  //   onEditorChange={handleEditorChange}
                  onEditorChange={(content, editor) =>
                    handleEditorChange(content, editor, e.id)
                  }
                  init={{
                    plugins: [
                      "anchor",
                      "autolink",
                      "charmap",
                      "codesample",
                      "emoticons",
                      "image",
                      "link",
                      "lists",
                      "media",
                      "searchreplace",
                      "table",
                      "visualblocks",
                      "wordcount",
                      "checklist",
                      "mediaembed",
                      "casechange",
                      "export",
                      "formatpainter",
                      "pageembed",
                      "permanentpen",
                      "advtable",
                      "advcode",
                      "editimage",
                      "advtemplate",
                      "mentions",
                      "tinycomments",
                      "tableofcontents",
                      "footnotes",
                      "mergetags",
                      "inlinecss",
                      "markdown",
                    ],
                    menubar: "edit view insert format tools table help",
                    font_formats:
                      "Default=default; Poppins-Regular=Poppins-Regular; Poppins-Medium=Poppins-Medium; Poppins-Bold=Poppins-Bold; Poppins-ExtraBold=Poppins-ExtraBold;",
                    font_size_formats: "8px 10px 12px 14px 18px 24px 36px",
                    content_style: `
                          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                          body { font-family: Poppins; font-size: 14px; }
                        `,
                    toolbar:
                      "a11ycheck | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                      { value: "First.Name", title: "First Name" },
                      { value: "Email", title: "Email" },
                    ],

                    a11ychecker_level: "aa",
                    height: 400,
                    branding: false,
                    // content_css: "default",
                    // font_family_formats:"'Poppins', sans-serif"
                  }}
                  // initialValue="Welcome to TinyMCE!"
                />
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <DatePickers
                    fullWidth
                    background={skyExColors.skyExTextBoxGrey}
                    name={"date"}
                    value={e.date}
                    onChange={(a) => handleChange(a, e.id)}
                  />
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <label
                    onClick={() => {
                      setOpenCropModal(true);
                      setId(e.id);
                    }}
                  >
                    <Box
                      sx={{
                        borderStyle: "dotted",
                        borderColor: "#ccc",
                        borderRadius: "10px",
                        padding: "7px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "20px",
                        }}
                      >
                        <img
                          src={
                            typeof e?.img === "object"
                              ? URL.createObjectURL(e.img)
                              : Url + e.img
                          }
                          alt="images"
                          style={{
                            width: "150px",
                            height: "120px",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "#3498db" }}>
                          Choose your Image here
                        </Typography>

                        <Typography sx={{ color: "#ccc" }}>
                          Supports PNG , JPG & WEBP up to any size
                        </Typography>
                      </Box>
                    </Box>
                  </label>
                  <Crop
                    open={openCropModal}
                    handleClose={() => setOpenCropModal(false)}
                    ratio={16 / 9}
                    images={e.img}
                    CroppedImage={(image) => ({
                      ...filterData,
                      image: handleChange(
                        {
                          target: {
                            name: "img",
                            value: image,
                          },
                        },
                        id
                      ),
                    })}
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Article;
