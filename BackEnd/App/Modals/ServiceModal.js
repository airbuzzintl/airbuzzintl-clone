const Environment = require("../Configuration/Environment");
const db = require("../Configuration/Config");
const { json } = require("body-parser");
const ServiceModal = function () { };
ServiceModal.createProvideSevicesModal = (input, output) => {
  let { title, description, imgUrl, service_type, button_name, path } = input;
  let query = `INSERT INTO provideServices(title,description,image,service_type,button_name,path)values(
        '${title}','${description}','${imgUrl}','${service_type}','${button_name}','${path}'
    )`;
  try {
    db.query(query, (err, result) => {
      if (err) {
        output({ error: Environment.SERVER_ERROR_MESSAGE }, null);
        throw err;
      } else {
        output(null, { message: "SUCCESS" });
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};
ServiceModal.getProvideServiceModal = async (type, output) => {
  let query = `SELECT * FROM provideServices where service_type = '${type}'`;
  let query1 = `SELECT international_service_title,international_service_Para_1,international_service_Para_2,domestic_service_title,domestic_service_Para_1,domestic_service_Para_2,path,button_name FROM global_titles`;

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
      output(null, { ...response2[0], service: response1 });
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
ServiceModal.updateServiceModal = (input, output) => {
  const { id, title, description, imgUrl, button_name, path } = input;
  let query = `update provideServices set  title='${title}',description='${description}',button_name='${button_name}',path='${path}'`;
  if (imgUrl) {
    query += `,image='${imgUrl}' WHERE id=${id}`;
  } else {
    query += `WHERE id=${id}`;
  }
  try {
    db.query(query, (err, result) => {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      } else {
        output(null, { message: "SUCCESS" });
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

ServiceModal.deleteServiceModal = (input, output) => {
  const { id } = input;
  let query = `DELETE FROM provideServices WHERE id=${id};`;
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

ServiceModal.updateInternationalTitle = (input, output) => {
  const { title, para1, para2 } = input;
  let query = `UPDATE global_titles SET  international_service_title='${title}',international_service_Para_1='${para1}',international_service_Para_2='${para2}' WHERE id = 1`;

  try {
    db.query(query, (err, result) => {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      } else {
        output(null, { message: "SUCCESS" });
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

ServiceModal.updateDomesticTitle = (input, output) => {
  const { title, para1, para2 } = input;
  let query = `update global_titles set  domestic_service_title='${title}',domestic_service_Para_1='${para1}',domestic_service_Para_2='${para2}' WHERE id=1`;

  try {
    db.query(query, (err, result) => {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      } else {
        output(null, { message: "SUCCESS" });
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};
// ServiceModal.postmetataitle = (input, output) => {
//   const { title, description } = input;

//   let query = `
//     INSERT INTO meta_title (id, title, description) 
//     VALUES (1, ?, ?) 
//     ON DUPLICATE KEY UPDATE 
//     title = VALUES(title), 
//     description = VALUES(description);
//   `;

//   try {
//     db.query(query, [title, description], (err, result) => {
//       if (err) {
//         output(
//           { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//           null
//         );
//         throw err;
//       } else {
//         output(null, { message: "SUCCESS", affectedRows: result.affectedRows });
//       }
//     });
//   } catch (e) {
//     output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
//     throw e;
//   }
// };
ServiceModal.postmetataitle = (input, output) => {
  const { id, title, description } = input;

  let query =  `UPDATE meta_title SET title = ?, description = ? WHERE id = 1;`;

  try {
    db.query(query, [title, description, 1], (err, result) => {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        throw err;
      } else {
        output(null, { message: "SUCCESS", affectedRows: result.affectedRows });
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

ServiceModal.getmetaTitle = (callback) => {
  const getMetaTitles = `SELECT * FROM meta_title WHERE id = 1;`;

  console.log("Executing query:", getMetaTitles);

  db.query(getMetaTitles, (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      return callback(err, null);
    }

    console.log("Meta title fetched successfully:", results[0]);
    return callback(null, results); 
  });
};

// ServiceModal.getmetaTitle = (callback) => {
//   const getMetaTitles = `SELECT * FROM meta_title;`; 

//   console.log("Executing query:", getMetaTitles);

//   db.query(getMetaTitles, (err, results) => {
//     if (err) {
//       console.error("Error fetching data from database:", err);
//       return callback(err, null);
//     }

//     console.log("Meta titles fetched successfully:", results);
//     return callback(null, results);
//   });
// };

module.exports = ServiceModal;
