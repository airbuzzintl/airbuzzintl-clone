import { useState, useMemo, useRef } from "react";
import { Grid, Box, Typography, Card } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import TextInputField from "../../components/elements/TextInputField";
import { skyExColors } from "../../controller/constant";
import DatePickers from "../../components/elements/DatePickers";
import Crop from "../../components/elements/Crop";
import {
  errorAlert,
  successAlert,
} from "../../components/elements/ToastNotification";
import { FormButton, TextContainer } from "../../components/elements";
import { instance } from "../../utils/api";
import moment from "moment";

function NewArticle() {
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    text: "",
    date: null,
    file: null,
  });

  const [searchText, setSearchText] = useState("");
  const ApiKey = "bu8cqi68epq64p9fxfaytm96mcxuh65pzovedkoa6626p7e0";
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setArticleData((prevData) => ({ ...prevData, date: formattedDate }));
  };

  const filterData = useMemo(() => {
    return [articleData]?.filter(
      (item) =>
        item.title
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.description
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.date?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, articleData]);

  const handleCroppedImage = (image) => {
    setArticleData((prevData) => ({ ...prevData, file: image }));
    setOpenCropModal(false);
  };

  const getImageUrl = (image) => {
    if (image) {
      return typeof image === "string" ? image : URL.createObjectURL(image);
    }
    return "https://via.placeholder.com/150";
  };

  const createImageFormData = () => {
    const formData = new FormData();
    formData.append("title", articleData.title);
    formData.append("description", content);
    formData.append("text", articleData.text);
    formData.append(
      "slug",
      articleData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );

    // Handle date properly
    if (articleData.date) {
      formData.append("date", articleData.date); // Already in YYYY-MM-DD format
    }

    if (articleData.file) {
      // Change 'file' to 'file' to match what your backend expects
      formData.append("file", articleData.file);
    }

    return formData;
  };

  const createArticle = async () => {
    if (articleData.file) {
      try {
        const formData = createImageFormData();

        await instance.post(`/Landing/createArticleDetails`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setArticleData({
          title: "",
          description: "",
          date: null,
          file: null,
        });
        successAlert("Article created successfully!");
      } catch (err) {
        console.error(err);
        errorAlert("Failed to create article. Please try again.");
      }
    } else {
      errorAlert("Please upload an image.");
    }
  };

  const postArticles = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!articleData.title.trim()) {
      errorAlert("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      errorAlert("Please enter a description.");
      return;
    }

    if (!articleData.date) {
      errorAlert("Please select a date.");
      return;
    }

    // Debug what's being sent
    console.log("Submitting article with date:", articleData.date);

    await createArticle();
  };

  const handleEditorChange = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent({ format: "html" });
      const textcontent = editorRef.current.getContent({ format: "text" });
      setContent(content);
      setArticleData((prev) => ({ ...prev, text: textcontent }));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <TextContainer
          fontSize={{ md: "40px", xs: "30px" }}
          fontWeight={700}
          lineHeight={"1.2"}
          color={"#102C38"}
          value={"New Blogs"}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <FormButton
          value="Create"
          padding="0rem 2rem"
          height="40px"
          background={"#519534"}
          shadow={"#fff"}
          border
          clickFunction={postArticles}
        />
      </Box>
      {filterData?.map((e, index) => (
        <Card
          key={index}
          sx={{
            padding: "3.5vh",
            width: { md: "100%", xs: "95%" },
            margin: "auto",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInputField
                label="Title"
                name="title"
                maxLength={50}
                multiline
                rows={2}
                value={articleData.title}
                onChange={handleChange}
                required
                focused
              />
              {/* <TextInputField
              label="Description"
              name="description"
              maxLength={560}
              rows={3}
              multiline
              value={content}
              onChange={handleChange}
              required
              focused
            /> */}
              <Editor
                apiKey={ApiKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                onEditorChange={handleEditorChange}
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

              <DatePickers
                fullWidth
                background={skyExColors.skyExTextBoxGrey}
                name="date"
                value={e.date} // Convert string back to Date object
                onChange={(a) => handleChange(a, e.id)} // Use handleDateChange to format
              />

              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <label
                  onClick={() => {
                    setOpenCropModal(true);
                    setSelectedId(articleData.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "10px",
                      padding: "15px",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      "&:hover": { borderColor: "#3498db" },
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={getImageUrl(articleData.file)}
                        alt="Preview"
                        style={{
                          width: "150px",
                          height: "120px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                        // onError={(event) => {
                        //   event.target.src = "https://via.placeholder.com/150";
                        //   event.onerror = null;
                        // }}
                      />
                    </Box>
                    <Typography
                      sx={{ color: "#3498db", fontWeight: 500, mt: 1 }}
                    >
                      Choose Your Image
                    </Typography>
                    <Typography sx={{ color: "#777", fontSize: "14px" }}>
                      Supports PNG, JPG & WEBP
                    </Typography>
                  </Box>
                </label>
              </Box>
              <Crop
                open={openCropModal}
                handleClose={() => setOpenCropModal(false)}
                ratio={16 / 9}
                images={articleData.file}
                CroppedImage={handleCroppedImage}
              />
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
}

export default NewArticle;
