const Environment = require("../Configuration/Environment");
const db = require("../Configuration/Config");
const AboutModal = function () {};

// mission vission----------------------------------------------
AboutModal.createMissionAndVission = (input, output) => {
  let { title, subTitle, para1, para2, imgUrl } = input;
  let query = `INSERT INTO mission_vission_about (title,subTitle,para1,para2,image) VALUES ('${title}','${subTitle}','${para1}','${para2}','${imgUrl}');`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.getMissionAndVission = (input, output) => {
  let query = `SELECT * FROM mission_vission_about`;

  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, result);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.updateMissionAndVission = (input, output) => {
  const { id, title, subTitle, para1, para2, imgUrl } = input;
  let query = `update mission_vission_about set title='${title}', subTitle='${subTitle}',
                para1='${para1}', para2='${para2}'`;
  if (imgUrl) {
    query += `, image='${imgUrl}' where id=${id};`;
  } else {
    query += ` where id=${id}`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

// Our Story----------------------------------------------
AboutModal.createOurStory = (input, output) => {
  let { title, imgUrl } = input;
  let query = `INSERT INTO about_ourstory_adminpanel (title,image) VALUES ('${title}','${imgUrl}');`;
  // let query1 = `INSERT INTO about_slide_adminpanel (para1,para2) VALUES ('${para1}','${para2}');`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.getOurStory = (input, output) => {
  let query = `SELECT * FROM about_ourstory_adminpanel;`;
  let query1 = `SELECT * FROM about_slide_adminpanel;`;
  try {
    db.query(query, function (err, result1) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      db.query(query1, function (err, result2) {
        if (err) {
          output(
            { error: { description: Environment.SERVER_ERROR_MESSAGE } },
            null
          );
          throw err;
        }
        output(null, { title: result1[0], slide: result2 });
      });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.updateOurStory = (input, output) => {
  const { id, title, imgUrl } = input;
  console.log(title);
  let query = `update about_ourstory_adminpanel set title='${title}'`;
  if (imgUrl) {
    query += `, image='${imgUrl}' where id=${id};`;
  } else {
    query += ` where id=${id}`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.updateSlide = (input, output) => {
  const { id, para1, para2, author } = input;
  let query = `update about_slide_adminpanel set para1='${para1}',para2='${para2}',author='${author}' where id=${id}`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

// Choose us----------------------------------------------
AboutModal.createChooseus = (input, output) => {
  let { title, para, imgUrl } = input;
  let query = `INSERT INTO choose_us_about (title,para,image) VALUES ('${title}','${para}','${imgUrl}');`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.getChooseusData = async (input, output) => {
  let query = `SELECT * FROM choose_us_about`;
  let query1 = `SELECT resons_to_join_title as title FROM global_titles`;

  try {
    const method1 = new Promise((resolve, reject) => {
      db.query(query, function (err, result) {
        if (err) {
          reject(
            { error: { description: Environment.SERVER_ERROR_MESSAGE } },
            null
          );
          throw err;
        } else {
          resolve(result);
        }
      });
    });
    const method2 = new Promise((resolve, reject) => {
      db.query(query1, function (err, result) {
        if (err) {
          reject(
            { error: { description: Environment.SERVER_ERROR_MESSAGE } },
            null
          );
          throw err;
        } else {
          resolve(result);
        }
      });
    });

    try {
      const [response1, response2] = await Promise.all([method1, method2]);
      output(null, { ...response2[0], chooseus: response1 });
    } catch (err) {
      output(
        { error: { description: Environment.SERVER_ERROR_MESSAGE } },
        null
      );
      throw err;
    }
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.updateChooseus = (input, output) => {
  const { id, title, para, imgUrl } = input;
  let query = `update choose_us_about set title='${title}', para='${para}'`;
  if (imgUrl) {
    query += `, image='${imgUrl}' where id=${id};`;
  } else {
    query += ` where id=${id}`;
  }
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.deleteChooseUs = (input, output) => {
  const { id } = input;
  let query = `DELETE FROM choose_us_about where id=${id}`;

  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

AboutModal.updateChooseusTitle = (input, output) => {
  const { title } = input;
  let query = `update global_titles set resons_to_join_title='${title}' where id=1`;

  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

module.exports = AboutModal;
