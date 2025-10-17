const e = require("express");
const Environment = require("../Configuration/Environment");
const LandingModal = require("../Modals/LandingModal");
const fs = require("fs");
const path = require("path");

exports.getHeaderEstimationData = (req, res) => {
  let responseSent = false; // Flag to track response status

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };

  try {
    LandingModal.getHeaderData(req, (headerErr, headerData) => {
      if (headerErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }

      LandingModal.getEstimationData(req, (estimationErr, estimationData) => {
        if (estimationErr) {
          return sendResponse(Environment.SERVER_ERROR, {
            error: Environment.SERVER_ERROR_MESSAGE,
          });
        }
        sendResponse(200, { headerData, estimationData });
      });
    });
  } catch (e) {
    console.log("getHeaderEstimationData Controller catch", e);
    sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getOpenAccountFaqData = (req, res) => {
  let responseSent = false; // Flag to track response status

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getOpenAccountData(req, (accountErr, accountData) => {
      if (accountErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      LandingModal.getFaqData(req, (faqErr, faqData) => {
        if (faqErr) {
          return sendResponse(Environment.SERVER_ERROR, {
            error: Environment.SERVER_ERROR_MESSAGE,
          });
        }
        sendResponse(200, { accountData, faqData });
      });
    });
  } catch (e) {
    console.log("getOpenAccountFaqData Controller catch", e);
    return sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getAirfreightArticlesData = (req, res) => {
  let responseSent = false; // Flag to track response status

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getOpenAccountData(req, (airErr, airData) => {
      if (airErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }

      LandingModal.getArticlesData(req, (articlesErr, articlesData) => {
        if (articlesErr) {
          return sendResponse(Environment.SERVER_ERROR, {
            error: Environment.SERVER_ERROR_MESSAGE,
          });
        }
        sendResponse(200, { airData, articlesData });
      });
    });
  } catch (e) {
    console.log("getAirfreightArticlesData Controller catch", e);
    return sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getServiceSocialFeedsData = (req, res) => {
  let responseSent = false; // Flag to track response status

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getServiceDataModal(req, (serviceErr, serviceData) => {
      if (serviceErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }

      LandingModal.getSocialFeeds(req, (socialFeedsErr, socialFeedsData) => {
        if (socialFeedsErr) {
          return sendResponse(Environment.SERVER_ERROR, {
            error: Environment.SERVER_ERROR_MESSAGE,
          });
        }
        sendResponse(200, { serviceData, socialFeedsData });
      });
    });
  } catch (e) {
    console.log("getServiceSocialFeedsData Controller catch", e);
    return sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

exports.getAllTitles = (req, res) => {
  let responseSent = false; // Flag to track response status

  const sendResponse = (status, data) => {
    if (!responseSent) {
      responseSent = true;
      res.status(status).send(data);
    }
  };
  try {
    LandingModal.getAllTitlesModal(req, (titleErr, titleData) => {
      if (titleErr) {
        return sendResponse(Environment.SERVER_ERROR, {
          error: Environment.SERVER_ERROR_MESSAGE,
        });
      }
      sendResponse(200, titleData);
    });
  } catch (e) {
    return sendResponse(Environment.SERVER_ERROR, {
      error: Environment.SERVER_ERROR_MESSAGE,
    });
  }
};

// header-----------------------------------------------------------------
exports.getHeaderSectionData = ({}, res) => {
  try {
    LandingModal.getHeaderData({}, (err, data) => {
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

exports.updateHeadersection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const para3 = req.body.para3;
  const para4 = req.body.para4;
  const link = req.body.link;
  const button_name = req.body.button_name;
  const image = req.file;

  if (
    !id ||
    !title ||
    !para1 ||
    !para2 ||
    !para3 ||
    !para4 ||
    !link ||
    !button_name
  ) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Landing/" + image.filename;
        LandingModal.getHeaderData({}, (err, data) => {
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
        LandingModal.updateHeader(
          { id, title, para1, para2, para3, para4, imgUrl, link, button_name },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        LandingModal.updateHeader(
          { id, title, para1, para2, para3, para4, link, button_name },
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

exports.createHeaderSectionData = (req, res) => {
  const title = req.body.title;
  const para1 = req.body.para1;
  const para2 = req.body.para2;
  const para3 = req.body.para3;
  const para4 = req.body.para4;
  const link = req.body.link;
  const button_name = req.body.button_name;
  const image = req.file;
  if (!title || !para1 || !para2 || !para3 || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.createHeaderSectionData(
        { title, para1, para2, para3, para4, imgUrl, link, button_name },
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

// Estimation--------------------------------------------
exports.getEstimationSectionData = ({}, res) => {
  try {
    LandingModal.getEstimationData({}, (err, data) => {
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

exports.updateEstimationSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const image = req.file;

  if (!id || !title) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Landing/" + image.filename;
        LandingModal.getEstimationData({}, (err, data) => {
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
        LandingModal.updateEstimationData(
          { id, title, imgUrl },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        LandingModal.updateEstimationData({ id, title }, (err, data) => {
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

exports.createEstimationSectionData = (req, res) => {
  const title = req.body.title;
  const image = req.file;
  console.log(req.body, req.file);
  if (!title || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.createEstimationSectionData(
        { title, imgUrl },
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
//
// Open Account--------------------------------------------
exports.getOpenAccountSectionData = ({}, res) => {
  try {
    LandingModal.getOpenAccountData({}, (err, data) => {
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

exports.updateOpenAccountSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;

  if (!id || !title || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Landing/" + image.filename;
        LandingModal.getOpenAccountData({}, (err, data) => {
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
        LandingModal.updateOpenAccountData(
          { id, title, description, imgUrl },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        LandingModal.updateOpenAccountData(
          { id, title, description },
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

exports.createOpenAccountSectionData = (req, res) => {
  const title = req.body.title;
  const image = req.file;
  const description = req.body.description;
  console.log(req.body, req.file);
  if (!title || !image || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.createOpenAccountData(
        { title, imgUrl, description },
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
//
// Faq--------------------------------------------
exports.getOpenFaqSectionData = (req, res) => {
  try {
    LandingModal.getFaqData(req, (err, data) => {
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

exports.updateFaqSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;

  if (!id || !title || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Landing/" + image.filename;
        LandingModal.getFaqData({}, (err, data) => {
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
        LandingModal.updateFaqData(
          { id, title, description, imgUrl },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        LandingModal.updateFaqData({ id, title, description }, (err, data) => {
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

exports.createFaqSectionData = (req, res) => {
  const title = req.body.title;
  const image = req.file;
  const description = req.body.description;
  console.log(req.body, req.file);
  if (!title || !image || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.createFaqData(
        { title, imgUrl, description },
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
// Airfreight --------------------------------------------.
exports.createAirfreightSectionData = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;
  if (!title || !image || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.createAirfreightData(
        { title, description, imgUrl },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send(Environment.SERVER_ERROR_MESSAGE);
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

exports.getAirfreightSectionData = (req, res) => {
  try {
    LandingModal.getAirfreightData(req, (err, data) => {
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

exports.updateAirfreightSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;

  if (!id || !title || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  }
  try {
    if (image) {
      const imgUrl = "/Docs/Landing/" + image.filename;
      LandingModal.getAirfreightData({}, (err, data) => {
        if (err) {
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
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
      LandingModal.updateAirfreight(
        { id, title, description, imgUrl },
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
    } else {
      LandingModal.updateAirfreight({ id, title, description }, (err, data) => {
        if (err) {
          res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        } else {
          res.send(data);
        }
      });
    }
  } catch (e) {
    console.error(e);
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
  }
};

//
// Articles --------------------------------------------.
exports.createArticlesSectionData = (req, res) => {
  const title = req.body.title;
  const images = req.files;
  const sub_title_1 = req.body.sub_title_1;
  const sub_title_2 = req.body.sub_title_2;
  const sub_title_3 = req.body.sub_title_3;
  const sub_title_4 = req.body.sub_title_4;
  const sub_title_5 = req.body.sub_title_5;
  const sub_para_1 = req.body.sub_para_1;
  const sub_para_2 = req.body.sub_para_2;
  const sub_para_3 = req.body.sub_para_3;
  const sub_para_4 = req.body.sub_para_4;
  const sub_para_5 = req.body.sub_para_5;
  const date = req.body.date;
  const description = req.body.description;
  if (
    !title ||
    !images ||
    !description ||
    !date
    // !sub_title_1 ||
    // !sub_title_2 ||
    // !sub_title_3 ||
    // !sub_title_4 ||
    // !sub_para_1 ||
    // !sub_para_2 ||
    // !sub_para_3 ||
    // !sub_para_4
  ) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imgUrl_1 = "/Docs/Landing/" + images.image_1[0].filename;
    // const imgUrl_2 = "/Docs/Landing/" + images.image_2[0].filename;
    const imgUrl_2 = req.files.image_2
      ? "/Docs/Landing/" + req.files.image_2[0].filename
      : null;

    try {
      LandingModal.createArticlesData(
        {
          title,
          imgUrl_1,
          imgUrl_2,
          description,
          date,
          sub_title_1,
          sub_title_2,
          sub_title_3,
          sub_title_4,
          sub_title_5,
          sub_para_1,
          sub_para_2,
          sub_para_3,
          sub_para_4,
          sub_para_5,
        },
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

exports.createArticleDetails = (req, res) => {
  const { title, description, slug, date } = req.body;
  const image = req.file;

  if (!title || !description || !slug || !image || !date ) {
    return res.sendStatus(Environment.BAD_REQUEST);
  }
  const status = true;
  const imgUrl = "/Docs/Landing/" + req.file.filename;

  try {
    LandingModal.createArticleDetails(
      { title, description, slug, status, date, imgUrl },
      (err, data) => {
        if (err) {
          return res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        }
        res.send(data);
      }
    );
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.getArticlesSectionData = (req, res) => {
  try {
    LandingModal.getArticlesData(req, (err, data) => {
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
exports.getArticleDetails = (req, res) => {
  try {
    LandingModal.getArticleDetails(req, (err, data) => {
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

exports.getSlugs = (req, res) => {
  try {
    LandingModal.getSlugs(req, (err, data) => {
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

exports.getArticleDetailsBySlug = (req, res) => {
  try {
    LandingModal.getArticleDetailsBySlug(req.params.slug, (err, data) => {
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
  }
};

exports.updateArticlesSection = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const images = req.files;
  const sub_title_1 = req.body.sub_title_1;
  const sub_title_2 = req.body.sub_title_2;
  const sub_title_3 = req.body.sub_title_3;
  const sub_title_4 = req.body.sub_title_4;
  const sub_title_5 = req.body.sub_title_5;
  const sub_para_1 = req.body.sub_para_1;
  const sub_para_2 = req.body.sub_para_2;
  const sub_para_3 = req.body.sub_para_3;
  const sub_para_4 = req.body.sub_para_4;
  const sub_para_5 = req.body.sub_para_5;
  const date = req.body.date;
  const description = req.body.description;
  console.log(req.body);
  if (!id || !title || !description || !date) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (images) {
        const image_1 = images?.image_1
          ? "/Docs/Landing/" + images.image_1[0].filename
          : "";
        const image_2 = images?.image_2
          ? "/Docs/Landing/" + images.image_2[0].filename
          : "";
        LandingModal.updateArticlesData(
          {
            id,
            title,
            description,
            image_1,
            image_2,
            sub_title_1,
            sub_para_1,
            sub_title_2,
            sub_para_2,
            sub_title_3,
            sub_para_3,
            sub_title_4,
            sub_para_4,
            sub_title_5,
            sub_para_5,
            date,
          },
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
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

exports.updateArticleDetails = (req, res) => {
  const id = req.params.id;
  const { title, description, slug, date } = req.body;
  const image = req.file;
  console.log("image".image);

  if (!id || !title || !description || !slug || !date) {
    return res.sendStatus(Environment.BAD_REQUEST);
  }
  const imgUrl = image ? "/Docs/Landing/" + req.file.filename : null;
  const status = true;
  try {
    LandingModal.updateArticleDetails(
      id,
      { title, description, slug, status, date, imgUrl },
      (err, data) => {
        if (err) {
          return res
            .status(Environment.SERVER_ERROR)
            .send({ error: Environment.SERVER_ERROR_MESSAGE });
        }
        res.send(data);
      }
    );
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.deleteArticles = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      LandingModal.deleteArticles({ id }, (err, data) => {
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
};

exports.deleteArticleDetails = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.sendStatus(Environment.BAD_REQUEST);
  }

  try {
    LandingModal.deleteArticleDetails(id, (err, data) => {
      if (err) {
        return res
          .status(Environment.SERVER_ERROR)
          .json({ error: Environment.SERVER_ERROR_MESSAGE });
      }
      res.json(data);
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .json({ error: Environment.SERVER_ERROR_MESSAGE });
  }
};

exports.updateArticleTitle = (req, res) => {
  const articles_title = req.params.articles_title;
  const articles_description = req.params.articles_description;
  if (!articles_title || !articles_description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      LandingModal.updateArticlesTitle(
        {
          articles_title,
          articles_description,
        },
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
};

// feeds
exports.createFeedSocialMedia = (req, res) => {
  const content = req.body.content;
  const image = req.file;
  if (!content || !image) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const imagUrl = "/Docs/Landing/" + req.file.filename;
    try {
      LandingModal.CreateSocialMedia({ content, imagUrl }, (err, data) => {
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
};

exports.getFeedSocialMedia = ({}, res) => {
  try {
    LandingModal.getSocialFeeds({}, (err, data) => {
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
};

exports.updateSocialMediaFeeds = (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  const url = req.body.url;
  const url_type = req.body.url_type;
  const image = req.file;
  if (!id || !content) {
    res.sendStatus(Environment.BAD_REQUEST);
  }
  try {
    if (image) {
      const imgUrl = "/Docs/Landing/" + req.file.filename;
      LandingModal.updateSocialMedia_Feeds(
        { id, content, imgUrl, url, url_type },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          }
          res.send(data);
        }
      );
    } else {
      LandingModal.updateSocialMedia_Feeds(
        { id, content, url, url_type },
        (err, data) => {
          if (err) {
            res
              .status(Environment.SERVER_ERROR)
              .send({ error: Environment.SERVER_ERROR_MESSAGE });
          }
          res.send(data);
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

exports.updateSocialMediaFeedsTitle = (req, res) => {
  const title = req.params.title;
  if (!title) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      LandingModal.updateSocialMediaFeedsTitle({ title }, (err, data) => {
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

// Services
exports.getServicesLogistics = ({}, res) => {
  try {
    LandingModal.getServiceDataModal({}, (err, data) => {
      if (err) {
        res
          .status(Environment.SERVER_ERROR)
          .send({ error: Environment.SERVER_ERROR_MESSAGE });
      } else {
        res.send(data);
        console.log("dataamdahjdakjdh", data);
      }
    });
  } catch (e) {
    res
      .status(Environment.SERVER_ERROR)
      .send({ error: Environment.SERVER_ERROR_MESSAGE });
    throw e;
  }
};

exports.CreateServicesLogistics = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageFiles = req.files;
  const international_title = req.body.international_description;
  const international_description = req.body.international_description;
  const domestic_title = req.body.domestic_title;
  const domestic_description = req.body.domestic_description;
  if (
    !title ||
    !description ||
    !international_title ||
    !international_description ||
    !domestic_title ||
    !domestic_description ||
    !imageFiles ||
    !imageFiles.international_image ||
    !imageFiles.domestic_image
  ) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    const international_image =
      "/Docs/Landing/" + imageFiles.international_image[0].filename;
    const domestic_image =
      "Docs/Landing/" + imageFiles.domestic_image[0].filename;
    try {
      LandingModal.CreateServicesModal(
        {
          title,
          description,
          international_title,
          international_description,
          international_image,
          domestic_title,
          domestic_description,
          domestic_image,
        },
        (err, data) => {
          if (err) {
            console.log("someksshkjshfkshkjsh", err);
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
};
exports.UpdateServicesData = (req, res) => {
  console.log(req.files);
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const international_title = req.body.international_title;
  const international_description = req.body.international_description;
  const domestic_title = req.body.domestic_title;
  const domestic_description = req.body.domestic_description;
  const imageFiles = req.files;
  if (
    !id ||
    !title ||
    !description ||
    !international_title ||
    !international_description ||
    !domestic_title ||
    !domestic_description
  ) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (imageFiles) {
        const international_image = imageFiles?.international_image
          ? "/Docs/Landing/" + imageFiles.international_image[0].filename
          : "";
        const domestic_image = imageFiles?.domestic_image
          ? "/Docs/Landing/" + imageFiles.domestic_image[0].filename
          : "";
        LandingModal.updateServiceModal(
          {
            id,
            title,
            description,
            international_image,
            domestic_image,
            international_title,
            international_description,
            domestic_title,
            domestic_description,
          },
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
      }
    } catch (e) {
      res
        .status(Environment.SERVER_ERROR)
        .send({ error: Environment.SERVER_ERROR_MESSAGE });
      throw e;
    }
  }
};

// service feeds
exports.getServiceFeeds = ({}, res) => {
  try {
    LandingModal.getServicefeedsData({}, (err, data) => {
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

exports.updateServiceFeeds = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.description.title;
  const image = req.file;

  if (!id || !title || !description) {
    res.sendStatus(Environment.BAD_REQUEST);
  } else {
    try {
      if (image) {
        const imgUrl = "/Docs/Landing/" + image.filename;
        LandingModal.getServicefeedsData({}, (err, data) => {
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
        LandingModal.updateServiceFeeds(
          { id, title, description, imgUrl },
          (err, data) => {
            if (err)
              res
                .status(Environment.SERVER_ERROR)
                .send({ error: Environment.SERVER_ERROR_MESSAGE });
            else res.send(data);
          }
        );
      } else {
        LandingModal.updateServiceFeeds(
          { id, title, description },
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
