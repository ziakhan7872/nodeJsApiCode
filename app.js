const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("hifz.db");

var multer = require("multer");

const router = express.Router();

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./images"));
const PORT = 3000;
const ip = "192.168.10.11";

// for parsing application/json
//app.use(bodyParser.json());

// for parsing application/xwww-
//app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// GET FROM STUDENTS TABLE
app.get("/AllStudents", (req, res) => {
  db.all("Select * from Students", (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.status(404).send(err);
    }
  });
});

// INSERT INTO STUDENTS TABLE
app.post("/RegisterStudent", upload.single("image"), (req, res) => {
  console.log("req.body =", JSON.stringify(req.body));
  db.all(
    "Insert into Students values(null,?,?,?,?,?,?,?,?)",
    [
      req.body.RollNumber,
      req.body.studentName,
      req.body.dateOfBirth,
      req.body.fatherName,
      req.body.address,
      req.body.phoneNumber,
      req.body.admissionDate,
      req.file.filename,
    ],
    (err, row) => {
      if (row) {
        res
          .status(200)
          .json({ msg: "طالب علم کا اندراج کامیابی کے ساتھ مکمل ہوا۔" });
      } else {
        res.status(404).send(err);
      }
    }
  );
});

// GET FROM ATTENDANCE TABLE
app.get("/Attendance", (req, res) => {
  db.all("Select * from Attendance", (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.status(404).send(err);
    }
  });
});

// INSERT INTO ATTENDANCE TABLE
app.post("/AddAttendance", (req, res) => {
  console.log("Req.body =", JSON.stringify(req.body));
  db.all(
    "Insert into Attendance values(null,?,?,?,?,?,?)",
    [
      req.body.student_id,
      req.body.RollNumber,
      req.body.category,
      req.body.time,
      req.body.date,
      req.body.attendance,
    ],
    (err, row) => {
      if (row) {
        res
          .status(200)
          .json({ msg: "حاضری کا اندراج کامیابی کے ساتھ مکمل ہوا۔" });
      } else {
        res.status(404).send(err);
      }
    }
  );
});

// GET FROM SABAQ TABLE
app.get("/SABAQ", (req, res) => {
  db.all("Select * from SABAQ", (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.status(404).send(err);
    }
  });
});

// INSERT INTO SABAQ TABLE
app.post("/AddSABAQ", (req, res) => {
  console.log("Req.body =", JSON.stringify(req.body));
  db.all(
    "Insert into SABAQ values(null,?,?,?,?,?,?)",
    [
      req.body.student_id,
      req.body.RollNumber,
      req.body.paraNo,
      req.body.rukuNo,
      req.body.ayatNo,
      req.body.mistakes,
      req.body.atkinay,
    ],
    (err, row) => {
      if (row) {
        res
          .status(200)
          .json({ msg: "سبق کا اندراج کامیابی کے ساتھ مکمل ہوا۔" });
      } else {
        res.status(404).send(err);
      }
    }
  );
});

// LISTENING SERVER
app.listen(PORT, ip, () => {
  console.log("Server is listening at http://" + ip + ":" + PORT);
});
