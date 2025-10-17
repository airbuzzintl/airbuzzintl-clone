const Environment = require("../Configuration/Environment");
const db = require("../Configuration/Config");
const { json } = require("body-parser");
const LandingModal = function () {};

// Header
LandingModal.getHeaderData = (input, output) => {
  let query = `SELECT * FROM header_landing LIMIT 1`; // Assuming you only need one row
  console.log("In getHeaderData Model");
  try {
    db.query(query, function (err, result) {
      if (err) {
        console.error("Database query error:", err);
        return output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getHeaderData Result:", result);
      if (result.length > 0) {
        output(null, result[0]); // Return the first row
      } else {
        console.warn("No data found in header_landing");
        output({ error: { description: "No data found" } }, null);
      }
    });
  } catch (e) {
    console.error("Catch block error in getHeaderData Model:", e);
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

LandingModal.updateHeader = (input, output) => {
  const { id, title, para1, para2, para3, para4, imgUrl, link, button_name } =
    input;

  let query = `update header_landing set title='${title}',para1='${para1}', para2='${para2}',para3='${para3}',
   para4='${para4}',button_name='${button_name}', path='${link}'`;
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
LandingModal.createHeaderSectionData = (input, output) => {
  const { title, para1, para2, para3, para4, imgUrl, link, button_name } =
    input;

  let query = `INSERT INTO header_landing 
                (title, para1, para2, para3, para4, image,link,button_name)
                VALUES ('${title}', '${para1}', '${para2}', '${para3}', '${para4}', '${imgUrl}', '${link}', '${button_name}');`;
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
//
//  estimation
LandingModal.getEstimationData = (input, output) => {
  let query = `SELECT * FROM estimation_landing`;

  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getEstimationData", result);
      output(null, result[0]);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};
LandingModal.updateEstimationData = (input, output) => {
  const { id, title, imgUrl } = input;

  let query = `update estimation_landing set title='${title}'`;
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
LandingModal.createEstimationSectionData = (input, output) => {
  const { title, imgUrl } = input;

  let query = `INSERT INTO airbuzz.estimation_landing 
                (title, image)
                VALUES ('${title}', '${imgUrl}');`;
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

//  open account
LandingModal.getOpenAccountData = (input, output) => {
  let query = `SELECT * FROM openAccount_landing`;

  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      console.log("getOpenAccountData", result);
      output(null, result[0]);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};
LandingModal.updateOpenAccountData = (input, output) => {
  const { id, title, description, imgUrl } = input;

  let query = `update openAccount_landing set title='${title}', description='${description}'`;
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
LandingModal.createOpenAccountData = (input, output) => {
  const { title, imgUrl, description } = input;

  let query = `INSERT INTO openAccount_landing
                (title, image, description)
                VALUES ('${title}', '${imgUrl}', '${description}');`;
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

//
//  Faq
LandingModal.getFaqData = (input, output) => {
  let query = `SELECT * FROM faq_landing`;

  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
        return; // Exit the function early to avoid further processing
      }

      if (result.length > 0) {
        // Replace "undefined" with null in the response
        result = result.map((faq) => ({
          ...faq,
          link: faq.link === "undefined" ? null : faq.link, // Fix the issue here
        }));
      }

      console.log("getFaqData", result);
      output(null, result[0]);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};
LandingModal.updateFaqData = (input, output) => {
  const { id, title, description, imgUrl } = input;

  let query = `update faq_landing set title='${title}', description='${description}'`;
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
LandingModal.createFaqData = (input, output) => {
  const { title, imgUrl, description } = input;

  let query = `INSERT INTO faq_landing
                (title, image, description)
                VALUES ('${title}', '${imgUrl}', '${description}');`;
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

// Airfreight
LandingModal.createAirfreightData = (input, output) => {
  const { title, description, imgUrl } = input;
  let query = `INSERT INTO airfreight_landing (title,description,image) VALUES ('${title}', '${description}', '${imgUrl}');`;
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

LandingModal.getAirfreightData = (input, output) => {
  let query = `SELECT * FROM airfreight_landing`;
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

LandingModal.updateAirfreight = (input, output) => {
  const { id, title, description, imgUrl } = input;

  let query = `update airfreight_landing set title='${title}',description='${description}'`;
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

// Articles
LandingModal.createArticlesData = (input, output) => {
  const {
    title,
    imgUrl_1,
    imgUrl_2,
    description,
    date,
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
  } = input;

  let query = `INSERT INTO articles_landing
                (title, description,date, image_1,sub_title_1,sub_para_1,sub_title_2,sub_para_2,sub_title_3,sub_para_3,sub_title_4,sub_para_4,image_2,sub_title_5,sub_para_5)
                VALUES ('${title}', '${description}','${date}','${imgUrl_1}', '${sub_title_1}','${sub_para_1}','${sub_title_2}','${sub_para_2}','${sub_title_3}','${sub_para_3}','${sub_title_4}','${sub_para_4}','${imgUrl_2}','${sub_title_5}','${sub_para_5}' );`;
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

LandingModal.createArticleDetails = (input, output) => {
  const { title, description, slug, status, imgUrl, date } = input;

  let query = `INSERT INTO articles_details (title, description, slug, status, img, date) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [title, description, slug, status, imgUrl, date],
    (err, result) => {
      if (err) {
        return output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      output(null, { message: "SUCCESS" });
    }
  );
};

LandingModal.getArticlesData = async (input, output) => {
  // let query = `SELECT * FROM articles_details`;
  let query = `SELECT * FROM articles_details`;
  // let query2 = `SELECT * FROM global_titles`;

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

LandingModal.getArticleDetails = async (input, output) => {
  let query = `SELECT * FROM articles_details`;
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
LandingModal.getSlugs = async (input, output) => {
  let query = `SELECT slug FROM articles_details`;
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

LandingModal.getArticleDetailsBySlug = (slug, callback) => {
  let query = `SELECT * FROM articles_details WHERE slug = ?`;

  db.query(query, [slug], (err, result) => {
    if (err) {
      callback(
        { error: { description: Environment.SERVER_ERROR_MESSAGE } },
        null
      );
    } else {
      callback(null, result);
    }
  });
};

// LandingModal.getArticlesData = async (input, output) => {
//   let query = `SELECT * FROM articles_landing`;
//   let query1 = `SELECT articles_title, articles_description FROM global_titles`;
//   try {
//     const method1 = new Promise((resolve, reject) => {
//       db.query(query, function (err, result) {
//         if (err) {
//           reject(
//             { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//             null
//           );
//           throw err;
//         } else {
//           resolve(result);
//         }
//       });
//     });
//     const method2 = new Promise((resolve, reject) => {
//       db.query(query1, function (err, result) {
//         if (err) {
//           reject(
//             { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//             null
//           );
//           throw err;
//         } else {
//           resolve(result);
//         }
//       });
//     });

//     try {
//       const [response1, response2] = await Promise.all([method1, method2]);
//       output(null, { ...response2[0], articles: response1 });
//     } catch (err) {
//       output(
//         { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//         null
//       );
//       throw err;
//     }
//   } catch (e) {
//     output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
//     throw e;
//   }
// };

LandingModal.updateArticlesData = (input, output) => {
  const {
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
  } = input;

  let query = `update articles_landing set title='${title}', description='${description}', date='${date}',
  sub_title_1='${sub_title_1}',sub_para_1='${sub_para_1}',sub_title_2='${sub_title_2}',
  sub_para_2='${sub_para_2}',
  sub_title_3='${sub_title_3}',sub_para_3='${sub_para_3}',sub_title_4='${sub_title_4}',sub_para_4='${sub_para_4}',sub_title_5='${sub_title_5}',sub_para_5='${sub_para_5}'`;
  if (image_1 && image_2) {
    query += `, image_1='${image_1}',image_2='${image_2}' where id=${id};`;
  } else if (image_1) {
    query += `, image_1='${image_1}' where id=${id};`;
  } else if (image_2) {
    query += `, image_2='${image_2}' where id=${id};`;
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

LandingModal.updateArticleDetails = (id, input, output) => {
  const { title, description, slug, status, imgUrl, date } = input;
  let query = `UPDATE articles_details SET title = ?, description = ?, slug = ?, status = ?, date = ?`;
  let params = [title, description, slug, status, date];
  if (imgUrl) {
    query += `, img = ?`;
    params.push(imgUrl);
  }

  query += ` WHERE id = ?`;
  params.push(id);

  try {
    db.query(query, params, (err, result) => {
      if (err) {
        return output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }
      output(null, { message: "SUCCESS" });
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
    throw e;
  }
};

LandingModal.deleteArticles = (input, output) => {
  const { id } = input;
  let query = `DELETE FROM articles_landing WHERE id=${id};`;
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

LandingModal.deleteArticleDetails = (id, output) => {
  let query = `DELETE FROM articles_details WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      return output(
        { error: { description: Environment.SERVER_ERROR_MESSAGE } },
        null
      );
    }
    if (result.affectedRows === 0) {
      return output(
        { error: { description: "No rows deleted. ID may not exist." } },
        null
      );
    }

    output(null, { message: "SUCCESS" });
  });
};

LandingModal.updateArticlesTitle = (input, output) => {
  const { articles_title, articles_description } = input;
  let query = `update global_titles set articles_title='${articles_title}', articles_description='${articles_description}' where id= 1;`;
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

// socilaMediaFeed
LandingModal.CreateSocialMedia = (input, output) => {
  const { content, imagUrl } = input;
  let query = `INSERT INTO feed_landing (content,image,date)VALUES('${content}','${imagUrl}',${new Date()});`;
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
    output(
      { error: { description: Environment.AUTHORIZATION_ERROR_MESSAGE } },
      null
    );

    throw e;
  }
};

LandingModal.getSocialFeeds = (input, output) => {
  let query1 = `SELECT * FROM airbuzz.feed_landing ORDER BY date DESC;`;
  let query2 = `SELECT * FROM airbuzz.global_titles;`;

  try {
    db.query(query1, function (err1, result1) {
      if (err1) {
        console.error("Error executing query1:", query1, err1);
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      } else {
        db.query(query2, function (err2, result2) {
          if (err2) {
            console.error("Error executing query2:", query2, err2);
            output(
              { error: { description: Environment.SERVER_ERROR_MESSAGE } },
              null
            );
          } else {
            output(null, { feeds: result1, global_title: result2 });
          }
        });
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};
LandingModal.getAllTitlesModal = (input, output) => {
  let query1 = `SELECT *  FROM global_titles`;
  try {
    db.query(query1, function (err, titlesResult) {
      if (err) {
        console.error("Error executing query:", query1, err);
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      }

      console.log("getTile", titlesResult[0]);
      output(null, titlesResult[0]);
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

// LandingModal.getSocialFeeds = async (input, output) => {
//   //   let query = `SELECT *
//   // FROM airbuzz.feed_landing
//   // ORDER BY
//   //   YEAR(STR_TO_DATE(airbuzz.feed_landing.date, '%a %b %d %Y %H:%i:%s GMT%T%z (%Z)')) DESC,
//   //   MONTH(STR_TO_DATE(airbuzz.feed_landing.date, '%a %b %d %Y %H:%i:%s GMT%T%z (%Z)')) DESC,
//   //   DAY(STR_TO_DATE(airbuzz.feed_landing.date, '%a %b %d %Y %H:%i:%s GMT%T%z (%Z)')) DESC;
//   // `;
//   let query = `SELECT * FROM airbuzz.feed_landing ORDER BY airbuzz.feed_landing.date DESC;`;
//   // let query = `SELECT * FROM airbuzz.feed_landing order by airbuzz.feed_landing.date ASC;`;
//   let query1 = `SELECT feeds as title FROM global_titles`;
//   try {
//     const method1 = new Promise((resolve, reject) => {
//       db.query(query, function (err, result) {
//         if (err) {
//           reject(
//             { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//             null
//           );
//           throw err;
//         } else {
//           resolve(result);
//         }
//       });
//     });
//     const method2 = new Promise((resolve, reject) => {
//       db.query(query1, function (err, result) {
//         if (err) {
//           reject(
//             { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//             null
//           );
//           throw err;
//         } else {
//           resolve(result);
//         }
//       });
//     });

//     try {
//       const [response1, response2] = await Promise.all([method1, method2]);
//       output(null, { ...response2[0], feeds: response1 });
//     } catch (err) {
//       output(
//         { error: { description: Environment.SERVER_ERROR_MESSAGE } },
//         null
//       );
//       throw err;
//     }
//   } catch (e) {
//     output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
//     throw e;
//   }
// };

LandingModal.updateSocialMedia_Feeds = (input, output) => {
  const { id, content, imgUrl, url_type, url } = input;
  let query = `update feed_landing set content='${content}',url_type='${url_type}',url='${url}', date = '${new Date()}'`;
  if (imgUrl) {
    query += `,image='${imgUrl}' where id=${id};`;
  } else {
    query += `where id=${id};`;
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
LandingModal.updateSocialMediaFeedsTitle = (input, output) => {
  const { title } = input;
  let query = `update global_titles set feeds='${title}' where id= 1;`;
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

// service Logictiscs
LandingModal.CreateServicesModal = (input, output) => {
  const {
    title,
    description,
    international_title,
    international_description,
    international_image,
    domestic_title,
    domestic_description,
    domestic_image,
  } = input;
  let query = `insert into services_landing(title,description,international_title,international_description,international_image,domestic_title, domestic_description,domestic_image)values('${title}','${description}','${international_title}','${international_description}','${international_image}','${domestic_title}','${domestic_description}','${domestic_image}');`;

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
    output(
      { error: { description: Environment.AUTHORIZATION_ERROR_MESSAGE } },
      null
    );
    throw e;
  }
};
LandingModal.getServiceDataModal = (input, output) => {
  let query = `SELECT * FROM services_landing;`;
  try {
    db.query(query, function (err, result) {
      if (err) {
        output(
          { error: { description: Environment.SERVER_ERROR_MESSAGE } },
          null
        );
      } else {
        console.log("getServiceDataModal", result);
        output(null, result[0]);
      }
    });
  } catch (e) {
    output({ error: { description: Environment.SERVER_ERROR_MESSAGE } }, null);
  }
};

LandingModal.updateServiceModal = (input, output) => {
  const {
    id,
    title,
    description,
    international_image,
    domestic_image,
    international_title,
    international_description,
    domestic_title,
    domestic_description,
  } = input;
  let query = `update services_landing set title='${title}',description='${description}',international_title='${international_title}',
               international_description='${international_description}',domestic_title='${domestic_title}',domestic_description='${domestic_description}'`;
  if (international_image && domestic_image) {
    query += `,international_image='${international_image}',domestic_image='${domestic_image}' where id=${id}`;
  } else if (international_image) {
    query += `,international_image='${international_image}' where id=${id}`;
  } else if (domestic_image) {
    query += `,domestic_image='${domestic_image}' where id=${id}`;
  } else {
    query += `where id=${id}`;
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

// service feeeds
LandingModal.getServicefeedsData = (input, output) => {
  let query = `SELECT * FROM airbuzz.services_feeds_landing`;

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
LandingModal.updateServiceFeeds = (input, output) => {
  const { id, title, description, imgUrl } = input;

  let query = `update services_feeds_landing set title='${title}',description='${description}'`;
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

module.exports = LandingModal;
