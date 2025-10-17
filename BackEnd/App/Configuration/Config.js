const mysql = require("mysql2");
const Environment = require("./Environment");

const db = mysql.createPool({
  host: Environment.DATABASEHOST,
  user: Environment.DBUSERNAME,
  password: Environment.DBPASSWORD,
  database: Environment.DATABASENAME,
  port: Environment.DATABASEPORT,
  multipleStatements: true,
  connectionLimit:20,
  queueLimit:5,
  // typeCast: function (field, next) {
  //   if (field.type === "TINY" && field.length === 4) {
  //     return field.string() === "1"; // 1 = true, 0 = false
  //   } else {
  //     return next();
  //   }
  // },
});

let createLandingHeader = `CREATE TABLE if not exists header_landing (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(70) NOT NULL,
  para1 varchar(220) NOT NULL,
  para2 varchar(270) NOT NULL,
  para3 varchar(200) NOT NULL,
  para4 varchar(220) NOT NULL,
  image varchar(50) NOT NULL,
  path varchar(30) NOT NULL,
  button_name varchar(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createLandingEstimation = `CREATE TABLE if not exists estimation_landing (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createSocialMedia = `CREATE TABLE if not exists feed_landing(
  id int NOT NULL AUTO_INCREMENT,
  content varchar(260) NOT NULL,
  image varchar(50) NOT NULL,
  url varchar(100) NOT NULL,
  url_type varchar(20) NOT NULL,
  date varchar(512) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createLandingOpenAccountSection = `CREATE TABLE if not exists openAccount_landing (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  description varchar(380) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createServicesDb = `create table if not exists services_landing(
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50)NOT NULL,
  description varchar(300) NOT NULL,
  international_title varchar(30) NOT NULL ,
  international_description varchar(300) NOT NULL ,
  international_image varchar(50)NOT NULL,
  domestic_title varchar(30) NOT NULL ,
  domestic_description varchar(300) NOT NULL ,
  domestic_image varchar(50) NOT NULL ,
  PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createFaqSection = `CREATE TABLE if not exists faq_landing (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  description varchar(560) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createArticles = `CREATE TABLE if not exists articles_landing (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  description varchar(1000) NOT NULL,
  date varchar(20) NOT NULL,
  sub_title_1 varchar(200) NOT NULL,
  sub_para_1 varchar(1500) NOT NULL,
  sub_title_2 varchar(200) DEFAULT NULL,
  sub_para_2 varchar(1500) DEFAULT NULL,
  sub_title_3 varchar(200) DEFAULT NULL,
  sub_para_3 varchar(1500) DEFAULT NULL,
  sub_title_4 varchar(200) DEFAULT NULL,
  sub_para_4 varchar(1500) DEFAULT NULL,
  sub_title_5 varchar(200) DEFAULT NULL,
  sub_para_5 varchar(1500) DEFAULT NULL,
  image_1 varchar(50) NOT NULL,
  image_2 varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
) 
;`;
let createArticlesDetails = `CREATE TABLE if not exists articles_details (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(5000) NOT NULL,
 description longtext NOT NULL,
  date varchar(20) NOT NULL,
  slug varchar(5000) NOT NULL,
  img varchar(50) NOT NULL,
  status Boolean NOT NULL,
  PRIMARY KEY (id)
)
  ;`;
let createProvidServices = `CREATE TABLE IF NOT EXISTS provideServices (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    description VARCHAR(300) NOT NULL,
    image VARCHAR(50) NOT NULL,
    service_type varchar(15) NOT NULL,
    button_name varchar(20) NOT NULL,
    path varchar(30) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
let createMissionVision = `CREATE TABLE if not exists mission_vission_about (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(40) NOT NULL,
  subTitle varchar(180) NOT NULL,
  para1 varchar(200) NOT NULL,
  para2 varchar(200) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createOurStory = `CREATE TABLE if not exists about_ourstory_adminpanel (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createSlide = `CREATE TABLE if not exists about_slide_adminpanel (
  id int NOT NULL AUTO_INCREMENT,
  para1 varchar(200) NOT NULL,
  para2 varchar(260) NOT NULL,
  author varchar(50) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createChooseUs = `CREATE TABLE if not exists choose_us_about  (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  para varchar(200) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createSupportFaq = `CREATE TABLE if not exists support_faq_adminpanel (
  id int NOT NULL AUTO_INCREMENT,
  question varchar(70) NOT NULL,
  answer varchar(250) DEFAULT NULL,
  link varchar(250) DEFAULT NULL,
  image varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
) 
;`;
let createSupportDocuments = `CREATE TABLE if not exists support_documents_adminpanel (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(20) NOT NULL,
  para_1 varchar(350) NOT NULL,
  para_2 varchar(600) NOT NULL,
  para_3 varchar(200) NOT NULL,
  image varchar(50) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createSupportDocFile = `CREATE TABLE if not exists support_docfile_adminpanel (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  description varchar(60) NOT NULL,
  docfile varchar(50) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createCareerTable = `create table if not exists careerTable(
  id int NOT NULL AUTO_INCREMENT,
  title varchar(60) NOT NULL,
  para_1 varchar(150) NOT NULL,
  para_2 varchar(270) NOT NULL,
  para_3 varchar(270) NOT NULL,
  para_4 varchar(200) NOT NULL,
  image varchar(50)NOT NULL ,
  PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

let createFranchise = `CREATE TABLE if not exists franchise_adminpanel (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(60) NOT NULL,
  para1 varchar(220) NOT NULL,
  para2 varchar(350) NOT NULL,
  para3 varchar(200) NOT NULL,
  para4 varchar(220) NOT NULL,
  para5 varchar(100) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createAirfreight = `CREATE TABLE if not exists airfreight_landing (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(256) NOT NULL,
  description varchar(512) NOT NULL,
  image varchar(256) NOT NULL,
  PRIMARY KEY (id)
) 
;`;
let createServiceFeeds = `create table if not exists services_Feeds_landing(id int NOT NULL AUTO_INCREMENT,title varchar(255)NOT NULL,
 description varchar(912) NOT NULL,image varchar(256) NOT NULL , PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

let createUser = `CREATE TABLE IF NOT EXISTS admin_users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;
let createTitles = `CREATE TABLE IF NOT EXISTS global_titles (
    id INT NOT NULL AUTO_INCREMENT,
    feeds VARCHAR(20) NOT NULL,
    articles_title VARCHAR(50) NOT NULL,
    articles_description VARCHAR(1000) NOT NULL,
    international_service_title VARCHAR(30) NOT NULL,
    international_service_Para_1 VARCHAR(300) NOT NULL,
    international_service_Para_2 VARCHAR(450) NOT NULL,
    domestic_service_title VARCHAR(30) NOT NULL,
    domestic_service_Para_1 VARCHAR(300) NOT NULL,
    domestic_service_Para_2 VARCHAR(450) NOT NULL,
    resons_to_join_title VARCHAR(40) NOT NULL,
    button_name varchar(20) DEFAULT NULL,
    path varchar(30),
    faq_title varchar(40) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;
let createmetatitile = `CREATE TABLE if not exists meta_title (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(70) NOT NULL,
  description varchar(500) NOT NULL,
  PRIMARY KEY (id)
);`;

let careerFormData = `CREATE TABLE if not exists career_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  pdf VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

let addUser = `INSERT INTO admin_users (name, email, password) VALUES ('airbuzz', 'info@airbuzz.in', 'admin');`;
// db.connect(function (err) {
//   if (err) throw err;
//   else {
    console.log("Connected!");
//   }
  try {
    db.query(createmetatitile, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createLandingHeader, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    db.query(createLandingEstimation, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    db.query(createLandingOpenAccountSection, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createFaqSection, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createAirfreight, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createArticles, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createArticlesDetails, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createSocialMedia, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    db.query(createServicesDb, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createServiceFeeds, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createCareerTable, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createFranchise, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createSupportFaq, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createMissionVision, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createOurStory, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createSlide, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createChooseUs, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createSupportDocuments, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createSupportDocFile, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createProvidServices, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createUser, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(createTitles, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(careerFormData, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      }
    });
    db.query(`SELECT * FROM airbuzz.admin_users;`, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        if (!result.length) {
          db.query(addUser, (err) => {
            console.log(err);
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
// });
module.exports = db;
