const Environment = require("../Configuration/Environment");
const ContactModal = require("../Modals/ContactModal");
const fs = require("fs");
const path = require("path");

// Franchise
exports.createFranchiseSectionData = async (req, res) => {
  const title = req.body.title;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const para3 = req.body.para3;
  const para4 = req.body.para4;
  const para5 = req.body.para5;
  if (!title || !para1 || !para2 || !para3 || !para5) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      ContactModal.createFranchiseData(
        { title, para1, para2, para3, para4, para5 },
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

exports.getFranchiseSectionData = async ({}, res) => {
  try {
    ContactModal.getFranchiseData({}, (err, data) => {
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

exports.updateFranchiseSectionData = async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const para3 = req.body.para3;
  const para4 = req.body.para4;
  const para5 = req.body.para5;

  if (!id || !title || !para1 || !para2 || !para3 || !para4 || !para5) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      ContactModal.updateFranchiseData(
        { id, title, para1, para2, para3, para4, para5 },
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

// carreer

exports.createCarrerController = async (req, res) => {
  const title = req.body.title;
  const para_1 = req.body.para_1;
  const para_2 = req.body.para_2;
  const para_3 = req.body.para_3;
  const para_4 = req.body.para_4;
  const image = req.file;
  if (!title || !para_1 || !para_2 || !para_3 || !para_4 || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Contact/" + req.file.filename;
    try {
      ContactModal.createCareerDataModal(
        { title, para_1, para_2, para_3, para_4, imgUrl },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send({ Error: Environment.SERVER_ERROR_MESSAGE });
            console, log(err);
          } else {
            res.send(data);
            console.log(data);
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

exports.getCareerData = async ({}, res) => {
  try {
    ContactModal.getCareerDataModal({}, (err, data) => {
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

exports.updateCareerData = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const para_1 = req.body.para_1;
  const para_2 = req.body.para_2;
  const para_3 = req.body.para_3;
  const para_4 = req.body.para_4;
  const image = req.file;
  if (!id || !title || !para_1 || !para_2 || !para_3 || !para_4) {
    // res.sendStatus(Environment.BAD_REQUEST);
    return res.sendStatus(Environment.BAD_REQUEST);
  }
  try {
    if (image) {
      const imgUrl = "/Docs/Contact/" + image.filename;
      ContactModal.getCareerDataModal({}, (err, data) => {
        if (err)
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        else {
          const oldImageFilePath = path.join("./public", data.image);
          fs.unlink(oldImageFilePath, (err) => {
            err && console.error(err);
          });
        }
      });
      ContactModal.updateCareerDataModal(
        { id, title, para_1, para_2, para_3, para_4, imgUrl },
        (err, data) => {
          if (err)
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          else res.send(data);
        }
      );
    } else {
      ContactModal.updateCareerDataModal(
        { id, title, para_1, para_2, para_3, para_4 },
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
};
