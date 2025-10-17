const axios = require("axios");
const express = require("express");
const router = express.Router();

// testing
// "https://ferointegrationuat.feroai.com/api/v1/integration/awb_track/",

router.post("/awb_track", async (req, res) => {
  const { awb_numbers, state } = req.body;

  try {
    let headers;
    if (state === "United Arab Emirates") {
      headers = {
        Token:
          "c433804c7ed001a420da2e3285222730f713a2f042e580a76f7747088c8ac489",
      };
    } else {
      headers = {
        Token:
          "6975b15c6e37d3a52ff79d6077def7e935762bb13ca45ba0ea3001297809ebe2",
      };
    }

    const response = await axios.post(
      "https://ferointegration.feroai.com/api/v1/integration/track/shipments/",
      { awb_numbers: awb_numbers },
      { headers: headers }
    );

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// router.post("/awb_track", async (req, res) => {
//   const { awb_numbers } = req.body;
//   console.log(awb_numbers);
//   try {
//     const response = await axios.post(
//       "https://ferointegrationuat.feroai.com/api/v1/integration/awb_track/",
//       {
//         awb_numbers: awb_numbers,m
//       },
//       {
//         headers: {
//           Token:
//             "a4fd91f65e80274283bc2a66b2396b2540a6db39eb9e17565451d6aa8ae4f665",
//         },
//       }
//     );

//     if (response.status === 200) {
//       res.status(200).json(response.data);
//     } else {
//       res.status(response.status).json({ error: "Unexpected status code" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
