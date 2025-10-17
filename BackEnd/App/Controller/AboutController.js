const Environment = require("../Configuration/Environment");
const AboutModal = require("../Modals/AboutModal");
const fs = require("fs");
const path = require("path");

// get allAboutData----------------------------------
exports.getAboutScreenData = async (_, res) => {
  try {
    const getMissionVissionData = new Promise((resolve, reject) => {
      AboutModal.getMissionAndVission({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    const getOurStoryData = new Promise((resolve, reject) => {
      AboutModal.getOurStory({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    const getChooseus = new Promise((resolve, reject) => {
      AboutModal.getChooseusData({}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const data = [...response.chooseus];
          const offset = data?.length - (data.length % 3);
          const result = data?.slice(0, offset);
          resolve({ ...response, chooseus: result });
        }
      });
    });

    const response = await Promise.all([
      getMissionVissionData,
      getOurStoryData,
      getChooseus,
    ]);

    res.send({
      mission_vission: response[0],
      our_story: response[1],
      choose_us: response[2],
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

// mission----------------------------------
exports.postMissionAndVission = async (req, res) => {
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const image = req.file;
  if (!title || !subTitle || !para1 || !para2 || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/About_us/" + req.file.filename;
    try {
      AboutModal.createMissionAndVission(
        { title, subTitle, para1, para2, imgUrl },
        (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
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

exports.getMissionAndVission = async ({}, res) => {
  try {
    AboutModal.getMissionAndVission({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};
exports.updateMissionAndVission = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const image = req.file;

  if (!id || !title || !subTitle || !para1 || !para2) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/About_us/" + image.filename;
        AboutModal.getMissionAndVission({}, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else {
            const oldImageFilePath = path.join("./public", data[id - 1].image);
            fs.unlink(oldImageFilePath, (err) => {
              err && console.error(err);
            });
          }
        });
        AboutModal.updateMissionAndVission(
          { id, title, subTitle, para1, para2, imgUrl },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        AboutModal.updateMissionAndVission(
          { id, title, subTitle, para1, para2 },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
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

// Our Story----------------------------------
exports.postOurStory = async (req, res) => {
  const title = req.body.title;
  const image = req.file;
  if (!title || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/About_us/" + req.file.filename;
    try {
      AboutModal.createOurStory({ title, imgUrl }, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.getOurStory = async ({}, res) => {
  try {
    AboutModal.getOurStory({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.updateOurStory = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const image = req.file;

  if (!id || !title) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/About_us/" + image.filename;
        AboutModal.getOurStory({}, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else {
            if (data && data.image) {
              const oldImageFilePath = path.join("./public", data.image);
              fs.unlink(oldImageFilePath, (err) => {
                if (err) {
                  console.error(err);
                }
              });
            }
          }
        });
        AboutModal.updateOurStory({ id, title, imgUrl }, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        });
      } else {
        AboutModal.updateOurStory({ id, title }, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        });
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateSlide = async (req, res) => {
  const id = req.params.id;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const author = req.body.author;

  if (!id || !para1 || !para2 || !author) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      AboutModal.updateSlide({ id, para1, para2, author }, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

// Choose us----------------------------------
exports.postChooseus = async (req, res) => {
  const title = req.body.title;
  const para = req.body.para;
  const image = req.file;
  if (!title || !para || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/About_us/" + req.file.filename;
    try {
      AboutModal.createChooseus({ title, para, imgUrl }, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.getChooseus = async ({}, res) => {
  try {
    AboutModal.getChooseusData({}, (err, data) => {
      if (err)
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      else res.send(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.updateChooseus = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const para = req.body.para;
  const image = req.file;

  if (!id || !title || !para) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/About_us/" + image.filename;
        AboutModal.getChooseusData({}, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else {
            const oldImageFilePath = path.join(
              "./public",
              data.chooseus[id - 1].image
            );
            fs.unlink(oldImageFilePath, (err) => {
              err && console.error(err);
            });
          }
        });
        AboutModal.updateChooseus({ id, title, para, imgUrl }, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        });
      } else {
        AboutModal.updateChooseus({ id, title, para }, (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        });
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};
exports.deleteChooseUs = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      AboutModal.deleteChooseUs({ id }, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};
exports.UpdatechooseUsTitle = async (req, res) => {
  const title = req.params.title;

  if (!title) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      AboutModal.updateChooseusTitle({ title }, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else res.send(data);
      });
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};
