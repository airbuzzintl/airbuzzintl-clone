// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Card,
//   Grid,
//   IconButton,
//   InputAdornment,
//   OutlinedInput,
//   Stack,
//   Typography,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { FormButton, TextContainer } from "../../components/elements";
// import { skyExColors } from "../../controller/constant";
// import TextInputField from "../../components/elements/TextInputField";
// import { Url, instance } from "../../utils/api";
// import {
//   errorAlert,
//   successAlert,
// } from "../../components/elements/ToastNotification";
// import ArticleModal from "../../components/elements/ArticleModal";
// import DatePickers from "../../components/elements/DatePickers";
// import Crop from "../../components/elements/Crop";
// import { useNavigate } from "react-router";

// function Article() {
//   const [open, setOpen] = useState(false);
//   const [openCropModal, setOpenCropModal] = useState(false);
//   const [openCropModalImage2, setOpenCropModalImage2] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [articleData, setArticleData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [id, setId] = useState();
//   const navigate = useNavigate();

//   const getArticles = async () => {
//     try {
//       const response = await instance.get(`/Landing/Articles`);
//       if (response?.status === 200) {
//         setArticleData(response?.data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getArticles();
//   }, []);
//   const filterData = useMemo(() => {
//     return articleData?.filter(
//       (item) =>
//         item.title
//           .toString()
//           .toLowerCase()
//           .includes(searchText.toLowerCase()) ||
//         item.description
//           .toString()
//           .toLowerCase()
//           .includes(searchText.toLowerCase()) ||
//         item.date.toString().toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [searchText, articleData]);

//   const handleChange = (e, id) => {
//     const { name, value } = e.target;
//     setArticleData((prevArticleData) =>
//       prevArticleData.map((a) => (a.id === id ? { ...a, [name]: value } : a))
//     );
//   };

//  const  handleNavigate = () => {
//     navigate(`/AdminDashboard/newArticle`);
//   }

//   const updateArticles = async (data) => {
//     try {
//       await instance.put(
//         `/Landing/Articles/${data.id}`,
//         {
//           title: data.title,
//           description: data.description,
//           date: data.date,
//           sub_title_1: data.sub_title_1,
//           sub_para_1: data.sub_para_1,
//           sub_title_2: data.sub_title_2,
//           sub_para_2: data.sub_para_2,
//           sub_title_3: data.sub_title_3,
//           sub_para_3: data.sub_para_3,
//           sub_title_4: data.sub_title_4,
//           sub_para_4: data.sub_para_4,
//           sub_title_5: data.sub_title_5,
//           sub_para_5: data.sub_para_5,
//           image_1: data.image_1,
//           image_2: data.image_2,
//         },
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       await getArticles();
//       successAlert("Success");
//     } catch (err) {
//       console.log(err);
//       errorAlert("Something went wrong");
//     }
//   };

//   const deleteArticles = async (id) => {
//     try {
//       await instance.delete(`/Landing/deleteArticles/${id}`);
//       await getArticles();
//       successAlert("Success");
//     } catch (err) {
//       console.log(err);
//       errorAlert("Something went wrong");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width: "100%",
//         background: "#f3f3f3",
//       }}
//     >
//       {open ? (
//         <ArticleModal
//           open={open}
//           close={handleClose}
//           getArticles={getArticles}
//         />
//       ) : null}
//       <br />
//       <Stack
//         sx={{
//           width: { md: "70%", xs: "95%" },
//           margin: "auto",
//           flexDirection: {
//             xl: "row",
//             lg: "row",
//             md: "row",
//             sm: "row",
//             xs: "row",
//           },
//         }}
//         paddingBottom={"10px"}
//         justifyContent={"space-between"}
//       >
//         <TextContainer
//           fontSize={{ md: "40px", xs: "30px" }}
//           fontWeight={700}
//           lineHeight={"1.2"}
//           color={"#102C38"}
//           value={"Blogs"}
//         />
//         <Box>
//           <FormButton
//             value={"Adddd"}
//             padding={"0rem 2rem"}
//             height={"40px"}
//             background={skyExColors.secondary}
//             shadow={"#fff"}
//             fullWidth
//             border
//             clickFunction={setOpen}
//           />
//         </Box>
//       </Stack>
//       <Stack
//         sx={{
//           width: { md: "70%", xs: "95%" },
//           margin: "auto",
//           flexDirection: {
//             xl: "row",
//             lg: "row",
//             md: "row",
//             sm: "row",
//             xs: "row",
//           },
//         }}
//         paddingBottom={"10px"}
//         justifyContent={"space-between"}
//       >
//         <OutlinedInput
//           id="outlined-adornment-weight"
//           fullWidth
//           sx={{ background: "#fff" }}
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton aria-label="toggle password visibility" edge="end">
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           }
//           aria-describedby="outlined-weight-helper-text"
//           inputProps={{
//             "aria-label": "weight",
//           }}
//           placeholder={"Search..."}
//           value={searchText}
//           onChange={(a) => setSearchText(a.target.value)}
//         />
//       </Stack>
//       <br />
//       {filterData?.map((e, index) => (
//         <div key={e.id}>
//           <Card
//             sx={{
//               padding: "3.5vh",
//               width: { md: "70%", xs: "95%" },
//               margin: "auto",
//               boxShadow:
//                 "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
//             }}
//           >
//             <form>
//               <Stack
//                 sx={{
//                   width: "100%",
//                   margin: "auto",
//                   flexDirection: {
//                     xl: "row",
//                     lg: "row",
//                     md: "row",
//                     sm: "row",
//                     xs: "column",
//                   },
//                 }}
//                 justifyContent={"space-between"}
//               >
//                 <TextContainer
//                   fontSize={"20px"}
//                   fontWeight={700}
//                   lineHeight={"1.2"}
//                   color={"#102C38"}
//                   value={`Card ${index + 1}`}
//                 />
//                 <Box
//                   sx={{
//                     display: { md: "flex", xs: "flex" },
//                     alignSelf: { md: "center", xs: "none" },
//                   }}
//                 >
//                   <FormButton
//                     value={"Delete"}
//                     padding={"0rem 2rem"}
//                     height={"40px"}
//                     background={skyExColors.secondary}
//                     shadow={"#fff"}
//                     fullWidth
//                     border
//                     clickFunction={() => deleteArticles(e.id)}
//                   />
//                   &nbsp;&nbsp;&nbsp;&nbsp;
//                   <FormButton
//                     value={"Update"}
//                     padding={"0rem 2rem"}
//                     height={"40px"}
//                     background={skyExColors.secondary}
//                     shadow={"#fff"}
//                     fullWidth
//                     border
//                     clickFunction={() => updateArticles(e)}
//                   />
//                 </Box>
//               </Stack>
//               <br />

//               <Grid container spacing={2}>
//                 <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Title"}
//                     name={"title"}
//                     maxLength={50}
//                     multiline
//                     rows={2}
//                     value={e.title}
//                     onChange={(a) => handleChange(a, e.id)}
//                     required
//                     focused={e.title}
//                   />
//                 </Grid>
//                 <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
//                   <TextInputField
//                     label={"description"}
//                     name={"description"}
//                     maxLength={560}
//                     rows={3}
//                     multiline
//                     value={e.description}
//                     onChange={(a) => handleChange(a, e.id)}
//                     focused={e.description}
//                   />
//                 </Grid>
//                 <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
//                   <DatePickers
//                     fullWidth
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"date"}
//                     value={e.date}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Title 1"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_title_1"}
//                     rows={3}
//                     maxLength={200}
//                     multiline
//                     value={e.sub_title_1}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Description 1"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_para_1"}
//                     rows={3}
//                     maxLength={1500}
//                     multiline
//                     value={e.sub_para_1}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Title 2"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_title_2"}
//                     rows={3}
//                     maxLength={200}
//                     multiline
//                     value={e.sub_title_2}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Description 2"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_para_2"}
//                     rows={3}
//                     maxLength={1500}
//                     multiline
//                     value={e.sub_para_2}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Title 3"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_title_3"}
//                     rows={3}
//                     maxLength={200}
//                     multiline
//                     value={e.sub_title_3}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Description 3"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_para_3"}
//                     rows={3}
//                     maxLength={1500}
//                     multiline
//                     value={e.sub_para_3}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Title 4"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_title_4"}
//                     rows={3}
//                     maxLength={200}
//                     multiline
//                     value={e.sub_title_4}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Description 4"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_para_4"}
//                     rows={3}
//                     maxLength={1500}
//                     multiline
//                     value={e.sub_para_4}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Title 5"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_title_5"}
//                     rows={3}
//                     maxLength={200}
//                     multiline
//                     value={e.sub_title_5}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <TextInputField
//                     label={"Sub Description 5"}
//                     background={skyExColors.skyExTextBoxGrey}
//                     name={"sub_para_5"}
//                     rows={3}
//                     maxLength={1500}
//                     multiline
//                     value={e.sub_para_5}
//                     onChange={(a) => handleChange(a, e.id)}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <label
//                     onClick={() => {
//                       setOpenCropModal(true);
//                       setId(e.id);
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         borderStyle: "dotted",
//                         borderColor: "#ccc",
//                         borderRadius: "10px",
//                         padding: "7px",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           padding: "20px",
//                         }}
//                       >
//                         <img
//                           src={
//                             typeof e?.image_1 === "object"
//                               ? URL.createObjectURL(e.image_1)
//                               : Url + e.image_1
//                           }
//                           alt="images"
//                           style={{
//                             width: "150px",
//                             height: "120px",
//                             borderRadius: "10px",
//                           }}
//                         />
//                       </Box>
//                       <Box sx={{ textAlign: "center" }}>
//                         <Typography sx={{ color: "#3498db" }}>
//                           Choose your Image here
//                         </Typography>

//                         <Typography sx={{ color: "#ccc" }}>
//                           Supports PNG , JPG & WEBP up to any size
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </label>
//                   <Crop
//                     open={openCropModal}
//                     handleClose={() => setOpenCropModal(false)}
//                     ratio={16 / 9}
//                     images={e.image_1}
//                     CroppedImage={(image) => ({
//                       ...filterData,
//                       image: handleChange(
//                         {
//                           target: {
//                             name: "image_1",
//                             value: image,
//                           },
//                         },
//                         id
//                       ),
//                     })}
//                   />
//                 </Grid>
//                 <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
//                   <label
//                     onClick={() => {
//                       setOpenCropModalImage2(true);
//                       setId(e.id);
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         borderStyle: "dotted",
//                         borderColor: "#ccc",
//                         borderRadius: "10px",
//                         padding: "7px",
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           padding: "20px",
//                         }}
//                       >
//                         <img
//                           src={
//                             typeof e?.image_2 === "object"
//                               ? URL.createObjectURL(e.image_2)
//                               : Url + e.image_2
//                           }
//                           alt="images"
//                           style={{
//                             width: "150px",
//                             height: "120px",
//                             borderRadius: "10px",
//                           }}
//                         />
//                       </Box>
//                       <Box sx={{ textAlign: "center" }}>
//                         <Typography sx={{ color: "#3498db" }}>
//                           Choose your Image here
//                         </Typography>

//                         <Typography sx={{ color: "#ccc" }}>
//                           Supports PNG , JPG & WEBP up to any size
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </label>
//                   <Crop
//                     open={openCropModalImage2}
//                     handleClose={() => setOpenCropModalImage2(false)}
//                     ratio={16 / 9}
//                     images={e.image_2}
//                     CroppedImage={(image) => ({
//                       ...filterData,
//                       image: handleChange(
//                         {
//                           target: {
//                             name: "image_2",
//                             value: image,
//                           },
//                         },
//                         id
//                       ),
//                     })}
//                   />
//                 </Grid>
//               </Grid>
//             </form>
//           </Card>
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Article;
