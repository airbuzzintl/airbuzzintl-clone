const Environment = require("../Configuration/Environment");
const ServiceModal = require("../Modals/ServiceModal");
const fs = require("fs");
const path = require("path");
exports.createProvideSevices = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const service_type = req.body.service_type;
  const button_name = req.body.button_name;
  const path = req.body.path;
  const image = req.file;
  if (!title || !description || !image || !service_type) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Services" + req.file.filename;

        ServiceModal.createProvideSevicesModal(
          {
            title,
            description,
            imgUrl,
            service_type,
            button_name,
            path,
          },
          (err, data) => {
            if (err) {
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
              console.log("errorsdjghsjdhjd", err);
              throw err;
            } else {
              res.send(data);
            }
          }
        );
      } else {
        // If the uploaded file is not a PNG image, send a bad request response
        res.sendStatus(Environment.BAD_REQUEST);
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.getProvideServices = async (req, res) => {
  const type = req.params.type;
  if (!type) {
    res.send(Environment.BAD_REQUEST);
  } else {
    try {
      ServiceModal.getProvideServiceModal(type, (err, data) => {
        if (err) {
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
          res.send(data);
        }
      });
    } catch (e) {
      console.log(e);
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
    }
  }
};

exports.updateProvideServiceControler = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const button_name = req.body.button_name;
  const path = req.body.path;
  const image = req.file;
  if (!id || !title || !description) {
    res.send(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Services" + image.filename;
        ServiceModal.getProvideServiceModal({}, (err, data) => {
          if (err) {
            res
              .status(Environment.BAD_REQUEST)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          } else {
            if (data && data.image) {
              const oldImageFilePath = path.join("./public", data.image);
              fs.unlink(oldImageFilePath, (err) => {
                err && console.log(err);
              });
            }
          }
        });
        ServiceModal.updateServiceModal(
          { id, title, description, imgUrl, button_name, path },
          (err, data) => {
            if (err) {
              res
                .status(Environment.BAD_REQUEST)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            } else {
              res.send(data);
            }
          }
        );
      } else {
        ServiceModal.updateServiceModal(
          { id, title, description, button_name, path },
          (err, data) => {
            if (err) {
              res
                .status(Environment.BAD_REQUEST)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            } else {
              res.send(data);
            }
          }
        );
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.deleteProvideServiceControler = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send(Environment.BAD_REQUEST);
  } else {
    try {
      ServiceModal.deleteServiceModal({ id }, (err, data) => {
        if (err) {
          res
            .status(Environment.BAD_REQUEST)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
          res.send(data);
        }
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateInternationalTitle = async (req, res) => {
  const title = req.body.title;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  if (!title || !para1 || !para2) {
    res.send(Environment.BAD_REQUEST);
  } else {
    try {
      ServiceModal.updateInternationalTitle(
        { title, para1, para2 },
        (err, data) => {
          if (err) {
            res
              .status(Environment.BAD_REQUEST)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          } else {
            res.send(data);
          }
        }
      );
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateDomesticTitle = async (req, res) => {
  const title = req.body.title;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  if (!title || !para1 || !para2) {
    res.send(Environment.BAD_REQUEST);
  } else {
    try {
      ServiceModal.updateDomesticTitle({ title, para1, para2 }, (err, data) => {
        if (err) {
          res
            .status(Environment.BAD_REQUEST)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
          res.send(data);
        }
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};
exports.postmetataitle = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(Environment.BAD_REQUEST).send({ error: "Missing title or description" });
  }

  try {
    ServiceModal.postmetataitle({ title, description }, (err, data) => {
      if (err) {
        return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
      } else {
        return res.send({ message: "SUCCESS", data });
      }
    });
  } catch (e) {
    return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
  }
};
// exports.postmetataitle = async (req, res) => {
//   const { title, description } = req.body;

//   if (!title || !description) {
//     return res.status(Environment.BAD_REQUEST).send({ error: "Missing title or description" });
//   }

//   try {
//     ServiceModal.postmetataitle({ title, description }, (err, data) => {
//       if (err) {
//         return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
//       } else {
//         return res.send({ message: "SUCCESS", data });
//       }
//     });
//   } catch (e) {
//     return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
//   }
// };
exports.getmetaTitle = async (req, res) => {
  try {
    console.log("API /getmetaTitle called");
    ServiceModal.getmetaTitle((err, data) => {
      if (err) {
        console.error("Error in ServiceModal.getmetaTitle:", err);
        return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
      }
      console.log("Data retrieved successfully:", data);
      return res.send(data); // Send single object
    });
  } catch (e) {
    console.error("Unexpected error in /getmetaTitle:", e);
    return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
  }
};

// exports.getmetaTitle = async (req, res) => {
//   try {
//     console.log("API /getmetaTitle called");
//     ServiceModal.getmetaTitle((err, data) => {
//       if (err) {
//         console.error("Error in ServiceModal.getmetaTitle:", err);
//         return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
//       }
//       console.log("Data retrieved successfully:", data);
//       return res.send(data);
//     });
//   } catch (e) {
//     console.error("Unexpected error in /getmetaTitle:", e);
//     return res.status(Environment.SERVER_ERROR).send({ error: Environment.SERVER_ERROR_MESSAGE });
//   }
// };
