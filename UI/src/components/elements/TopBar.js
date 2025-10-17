// import { Grid, Typography, Avatar, Button } from "@mui/material";
// import React from "react";
// import dubaiflag from "../../assets/newImages/download.png";
// import bahrainflag from "../../assets/newImages/bahrain.png";
// import { useAirbuzzLocation } from "../../controller/constant/LocationContext";

// const TopBar = (props) => {
//   const { currentLocation, toggleLocation, setIsVisible, isVisible } =
//     useAirbuzzLocation();
//   const currentFlag =
//     currentLocation === "United Arab Emirates" ? dubaiflag : bahrainflag;

//   const handleStayOnClick = () => {
//     setIsVisible(false);
//   };

//   const handleOtherLocationClick = () => {
//     toggleLocation();
//     setIsVisible(false);
//   };

//   const otherLocation =
//     currentFlag === dubaiflag ? "BAHRAIN" : "United Arab Emirates";

//   return (
//     isVisible && (
//       <>
//         <Grid
//           container
//           alignItems="center"
//           justifyContent="center"
//           sx={{
//             backgroundColor: "#E5E7E9",
//             display: {
//               xl: "flex",
//               lg: "flex",
//               md: "flex",
//               sm: "flex",
//               xs: "none",
//             },
//           }}
//         >
//           <Grid item>
//             <Avatar src={currentFlag} alt="Avatar" />
//           </Grid>
//           <Grid item>
//             <div style={{ margin: "20px" }}>
//               <span
//                 style={{
//                   color: "black",
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                 }}
//               >
//                 {currentLocation}
//               </span>
//             </div>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               style={{ backgroundColor: "#E74C3C" }}
//               onClick={handleStayOnClick}
//             >
//               Stay on this Site
//             </Button>
//           </Grid>
//           <Grid item>
//             <Typography sx={{ color: "#808B96", margin: "10px" }}>
//               or
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               color="error"
//               style={{ color: "red", fontWeight: "bold" }}
//               onClick={handleOtherLocationClick}
//             >
//               {otherLocation}
//             </Button>
//           </Grid>
//         </Grid>

//         <Grid
//           container
//           alignItems="center"
//           justifyContent="center"
//           padding={3}
//           sx={{
//             backgroundColor: "#E5E7E9",
//             display: {
//               xl: "none",
//               lg: "none",
//               md: "none",
//               sm: "none",
//               xs: "flex",
//             },
//           }}
//         >
//           <Grid item xs={12} display="flex" alignItems="center">
//             <Grid item>
//               <Avatar src={currentFlag} alt="Avatar" />
//             </Grid>
//             <Grid item>
//               <div style={{ margin: "20px" }}>
//                 <span
//                   style={{
//                     color: "black",
//                     fontWeight: "bold",
//                     fontSize: "18px",
//                   }}
//                 >
//                   {currentLocation}
//                 </span>
//               </div>
//             </Grid>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "#E74C3C" }}
//               onClick={handleStayOnClick}
//               fullWidth
//             >
//               Stay on this Site
//             </Button>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Typography sx={{ color: "#808B96", margin: "10px" }}>
//               or
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Button
//               variant="outlined"
//               color="error"
//               fullWidth
//               style={{ color: "red", fontWeight: "bold" }}
//               onClick={handleOtherLocationClick}
//             >
//               {otherLocation}
//             </Button>
//           </Grid>
//         </Grid>
//       </>
//     )
//   );
// };

// export default TopBar;
