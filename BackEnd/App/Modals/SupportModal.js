const Environment = require("../Configuration/Environment");
const db = require("../Configuration/Config");
const SupportModal = function () {};

SupportModal.createFaqData = (input, output) => {
  const { question, answer, imgUrl, link } = input;

  let query = `INSERT INTO support_faq_adminpanel (question, answer, link`;
  const values = [question, answer, link];

  if (imgUrl) {
    query += `, image`;
    values.push(imgUrl);
  }

  query += `) VALUES (?, ?, ?`;
  if (imgUrl) {
    query += `, ?`;
  }

  query += `);`;

  try {
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        output(
          {
            error: { description: Environment.SERVER_ERROR_MESSAGE },
          },
          null
        );
      } else {
        output(null, { message: "SUCCESS" });
      }
    });
  } catch (e) {
    console.error(e);
    output(
      {
        error: { description: Environment.SERVER_ERROR_MESSAGE },
      },
      null
    );
  }
};

SupportModal.getFaqData = async (input, output) => {
  let query = `SELECT * FROM support_faq_adminpanel;`;
  let query1 = `SELECT faq_title FROM global_titles`;

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
      output(null, { ...response2[0], faq: response1 });
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

SupportModal.updateFaqTitle = (input, output) => {
  const { title } = input;
  let query = `update global_titles set faq_title='${title}' where id=1`;
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

SupportModal.updateFaqData = (input, output) => {
  const { id, question, answer, imgUrl, link } = input;
  let query = `UPDATE support_faq_adminpanel SET question='${question}', answer='${answer}', link='${link}'`;
  if (imgUrl) {
    query += `, image='${imgUrl}' WHERE id=${id};`;
  } else {
    query += ` WHERE id=${id};`;
  }

  db.query(query, function (err, result) {
    if (err) {
      console.error(err);
      output(
        { error: { description: Environment.SERVER_ERROR_MESSAGE } },
        null
      );
    } else {
      output(null, { message: "SUCCESS" });
    }
  });
};

SupportModal.deleteFaqData = (input, output) => {
  const { id } = input;
  let query = `DELETE FROM support_faq_adminpanel WHERE id=${id}`;
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

SupportModal.createDocumentData = (input, output) => {
  let { title, para_1, para_2, para_3, imgUrl } = input;

  let query = `INSERT INTO support_documents_adminpanel
                (title,para_1,para_2,para_3,image)
                VALUES ('${title}', '${para_1}','${para_2}', '${para_3}', '${imgUrl}');`;
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

SupportModal.getDocumentData = (input, output) => {
  let query = `SELECT * FROM support_documents_adminpanel;`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      } else {
        output(null, result[0]);
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

SupportModal.updateDocumentData = (input, output) => {
  const { id, title, para_1, para_2, para_3, imgUrl } = input;
  let query = `update support_documents_adminpanel set title='${title}', para_1='${para_1}', para_2='${para_2}', para_3='${para_3}'`;
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

SupportModal.createDocumentFileData = (input, output) => {
  let { name, description, docUrl } = input;

  let query = `INSERT INTO support_docfile_adminpanel (name,description,docfile) VALUES ('${name}','${description}','${docUrl}');`;
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

SupportModal.getDocumentFileData = (input, output) => {
  let query = `SELECT * FROM support_docfile_adminpanel;`;
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

module.exports = SupportModal;
