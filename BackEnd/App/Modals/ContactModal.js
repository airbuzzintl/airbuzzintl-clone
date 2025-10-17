const Environment = require("../Configuration/Environment");
const db = require("../Configuration/Config");
const ContactModal = function () {};

ContactModal.createFranchiseData = (input, output) => {
  const { title, para1, para2, para3, para4, para5 } = input;

  let query = `INSERT INTO franchise_adminpanel
                (title, para1, para2, para3, para4, para5)
                VALUES ('${title}', '${para1}', '${para2}', '${para3}', '${para4}', '${para5}');`;
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

ContactModal.getFranchiseData = (input, output) => {
  let query = `SELECT * FROM franchise_adminpanel;`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      } else {
        output(null, result);
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

ContactModal.updateFranchiseData = (input, output) => {
  const { id, title, para1, para2, para3, para4, para5 } = input;

  let query = `update franchise_adminpanel set title='${title}',
                para1='${para1}', para2='${para2}', para3='${para3}', para4='${para4}', para5='${para5}' where id=${id}`;
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

// carreer
ContactModal.createCareerDataModal = (input, output) => {
  let { title, para_1, para_2, para_3, para_4, imgUrl } = input;
  let query = `insert into careerTable(title,para_1,para_2,para_3,para_4,image)values('${title}','${para_1}','${para_2}','${para_3}','${para_4}','${imgUrl}')`;
  try {
    db.query(query, (err, result) => {
      if (err) {
        output({ error: Environment.SERVER_ERROR_MESSAGE }, null);
        throw err;
      } else {
        output(null, { message: "SUCCESS" });
        console.log("result",result);
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

ContactModal.getCareerDataModal = (input, output) => {
  let query = `SELECT * FROM careerTable;`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      } else {
        console.log(result);
        
        output(null, result[0]);
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

ContactModal.updateCareerDataModal = (input, output) => {
  const { id, title, para_1, para_2, para_3, para_4, imgUrl } = input;
  let query = `update careerTable set title='${title}',para_1='${para_1}',para_2='${para_2}',para_3='${para_3}',para_4='${para_4}'`;
  if (imgUrl) {
    query += `,image='${imgUrl}' WHERE id=${id}`;
  } else {
    query += ` WHERE id=${id}`;
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

module.exports = ContactModal;
