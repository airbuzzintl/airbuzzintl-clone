const Environment = require("../Configuration/Environment");
const fs = require("fs");
const path = require("path");
const SupportModal = require("../Modals/SupportModal");

// Faq
exports.createFaqSectionData = async (req, res) => {
  const question = req.body.question;
  const answer = req.body.answer;
  const link = req.body.link;
  const image = req.file;
  if (!image) {
    if (!question || !answer) {
      res.sendStatus(Environment.BAD_REQUEST);
    } else {
      try {
        SupportModal.createFaqData({ question, answer, link }, (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
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
  } else {
    if (!question || !answer || !image || !image.filename) {
      res.sendStatus(Environment.BAD_REQUEST);
    } else {
      try {
        const imgUrl = "/Docs/Support/" + req.file.filename;
        SupportModal.createFaqData(
          { question, answer, link, imgUrl },
          (err, data) => {
            if (err) {
              res
                .status(Environment.SERVER_ERROR)
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
  }
};

exports.getFaqSectionData = async ({}, res) => {
  try {
    SupportModal.getFaqData({}, (err, data) => {
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

exports.updateFaqTitle = async (req, res) => {
  const title = req.params.title;

  if (!title) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      SupportModal.updateFaqTitle({ title }, (err, data) => {
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

exports.updateFaqSectionData = async (req, res) => {
  const id = req.body.id;
  const question = req.body.question;
  const answer = req.body.answer;
  const link = req.body.link;
  const image = req.file;

  if (!id || !question || !answer) {
    res.sendStatus(Environment.BAD_REQUEST);
  }

  try {
    if (image === undefined) {
      SupportModal.updateFaqData(
        { id, question, answer, link },
        (updateErr, updateData) => {
          if (updateErr) {
            console.error(updateErr);
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          }

          res.send(updateData);
        }
      );
    } else {
      const imgUrl = "/Docs/Support/" + req.file.filename;
      SupportModal.updateFaqData(
        { id, question, answer, imgUrl, link },
        (updateErr, updateData) => {
          if (updateErr) {
            console.error(updateErr);
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          }

          res.send(updateData);
        }
      );
    }
  } catch (e) {
    console.error(e);
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
  }
};

exports.deleteFaqSectionData = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      SupportModal.deleteFaqData({ id }, (err, data) => {
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

// Document
exports.createDocumentSectionData = async (req, res) => {
  const title = req.body.title;
  const para_1 = req.body.para_1;
  const para_2 = req.body.para_2;
  const para_3 = req.body.para_3;
  const image = req.file;
  if (!title || !para_1 || !para_2 || !para_3 || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Support/" + req.file.filename;
    try {
      SupportModal.createDocumentData(
        { title, para_1, para_2, para_3, imgUrl },
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

exports.getDocumentSectionData = async ({}, res) => {
  try {
    SupportModal.getDocumentData({}, (err, data) => {
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

exports.updateDocumentSectionData = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const para_1 = req.body.para_1;
  const para_2 = req.body.para_2;
  const para_3 = req.body.para_3;
  const image = req.file;
  if (!id || !title || !para_1 || !para_2 || !para_3) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Support/" + image.filename;
        SupportModal.getDocumentData({}, (err, data) => {
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
        SupportModal.updateDocumentData(
          { id, title, para_1, para_2, para_3, imgUrl },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        SupportModal.updateDocumentData(
          { id, title, para_1, para_2, para_3 },
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

// Document Files
exports.createDocumentFileSectionData = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const DocFile = req.file;
  if (!DocFile) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const docUrl = "/Docs/Support/" + req.file.filename;
    try {
      SupportModal.createDocumentFileData(
        { name, description, docUrl },
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

exports.getDocumentFileSectionData = async ({}, res) => {
  try {
    SupportModal.getDocumentFileData({}, (err, data) => {
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
