const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1121986@vV",
  database: "srp_db"
});
db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL connected");
});


app.post("/login", (req, res) => {
  console.log("✅ /login route hit");
  console.log("Headers:", req.headers);  // Log the headers
  console.log("Request body:", req.body); // Log the request body
  const { email, password } = req.body;
  console.log("Email:", email, "Password:", password); // Log individual values
  const sql = "SELECT * FROM registered_users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
      if (err) {
          console.error("❌ Login error:", err);
          return res.status(500).send("❌ Login failed");
      }
      console.log("DB Results:", results);
      if (results.length > 0) {
        
          res.json({ message: "Login successful", email: results[0].email });

      } else {
          res.status(401).json({message: "Invalid email or password"});
      }
  });
});

app.post("/register", (req, res) => {
  console.log("✅ /register route hit");
  console.log("Headers:", req.headers);  // Log the headers
  console.log("Request body:", req.body);  // Log the request body
  const { name, email, password } = req.body;
  console.log("Name:", name, "Email:", email, "Password:", password); // Log individual values
  if (!name || !email || !password) {
      console.error("❌ Missing fields:", { name, email, password });
      return res.status(400).send("Please fill in all fields");
  }
  const checkSql = "SELECT * FROM registered_users WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
      if (err) {
          console.error("❌ Email check error:", err);
          return res.status(500).send("Registration failed");
      }
      if (results.length > 0) {
          return res.status(400).send("Email already registered");
      }
      const insertSql = "INSERT INTO registered_users (name, email, password) VALUES (?, ?, ?)";
      db.query(insertSql, [name, email, password], (err, result) => {
          if (err) {
              console.error("❌ Registration error:", err);
              return res.status(500).send("Registration failed");
          }
          console.log("DB Insert Result:", result);
          res.send("Registered successfully");
      });
  });
});


app.post("/submit-biodata", upload.any(), (req, res) => { 
  const data = req.body;
  const files = req.files;
const profilePicFile = files.find(f => f.fieldname === "profile_picture");
const idProofFile = files.find(f => f.fieldname === "id_proof");

  console.log("📝 Received:", data);

  const category = data.category;
  if (!category) return res.status(400).send("❌ Category is required");

  let sql = "";
  let values = [];

  if (category === "matrimony") {
    sql = `INSERT INTO biodata_matrimony (full_name, date_of_birth, gender, marital_status, religion, caste, mother_tongue, nationality, complexion, physical_disability, current_location, contact_number, email, height, weight, profile_picture, id_proof)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    values = [
      data.full_name || "",
      data.date_of_birth || null,
      data.gender || "",
      data.marital_status || "",
      data.religion || "",
      data.caste || "",
      data.mother_tongue || "",
      data.nationality || "",
      data.complexion || "",
      data.physical_disability || "",
      data.current_location || "",
      data.contact_number || "",
      data.email || "",
      parseInt(data.height) || 0,
      parseInt(data.weight) || 0,
      profilePicFile ? profilePicFile.filename : "",
      idProofFile ? idProofFile.filename : "",
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ MySQL error (matrimony):", err);
        return res.status(500).send("Failed to insert biodata.");
      }
    });
    
      const ssql = `INSERT INTO shaadi (full_name, date_of_birth, gender, marital_status, religion, caste, mother_tongue, nationality, complexion, physical_disability, current_location, contact_number, email, height, weight, profile_picture, id_proof)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
svalues = [
 data.full_name || "",
 data.date_of_birth || null,
 data.gender || "",
 data.marital_status || "",
 data.religion || "",
 data.caste || "",
 data.mother_tongue || "",
 data.nationality || "",
 data.complexion || "",
 data.physical_disability || "",
 data.current_location || "",
 data.contact_number || "",
 data.email || "",
 parseInt(data.height) || 0,
 parseInt(data.weight) || 0,
 profilePicFile ? profilePicFile.filename : "",
 idProofFile ? idProofFile.filename : "",
];
db.query(ssql, svalues, (err2, result2) => {
  if (err2) {
    console.error("❌ MySQL error (shaadi_com):", err2);
    //return res.status(500).send("Inserted into matrimony, but failed to insert into shaadi.com.");
  }

  res.send("✅ Matrimony biodata inserted and also saved to shaadi.com table.");
});
  }


  else if (category === "job") {
    const resumeFile = req.files.find(file => file.fieldname === 'resume');
  const expLetterFile = req.files.find(file => file.fieldname === 'experience_letter');

    sql = `INSERT INTO biodata_job (full_name, email, contact_number, current_address, linkedin_url, portfolio_url,  work_experience, education, skills, projects, certifications, reference, resume, experience_letter)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    values = [
      data.full_name || "",
      data.email || "",
      data.contact_number || "",
      data.current_address || "",
      data.linkedin_url || "",
      data.portfolio_url || "",
      data.work_experience || "",
      data.education || "",
      data.skills || "",
      data.projects || "",
      data.certifications || "",
      data.reference || "",
          resumeFile ? resumeFile.filename : "",
    expLetterFile ? expLetterFile.filename : ""
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ MySQL error (job):", err);
        //return res.status(500).send("❌ Job details not inserted.");
      }
      res.send("✅ Job biodata inserted to biodata_job table.");
    });

    
      
  
  }

  else if (category === "insurance") {
    const idProof = req.files.find(file => file.fieldname === 'id_proof');
  const medicalCert = req.files.find(file => file.fieldname === 'medical_certificate');

    sql = `INSERT INTO biodata_insurance (
      full_name, date_of_birth, gender, marital_status,
      occupation, annual_income, nationality, current_address,
      contact_number, email, pan_number, id_proof, medical_certificate,height, weight,
     medical_conditions, habits,
      nominee_name, nominee_relationship, nominee_dob, nominee_address,
      vehicle_registration, vehicle_make_model, vehicle_year,
      property_address, property_type
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    values = [
      data.full_name || "",
      data.date_of_birth || null,
      data.gender || "",
      data.marital_status || "",
      data.occupation || "",
      data.annual_income || "",
      data.nationality || "",
      data.current_address || "",
      data.contact_number || "",
      data.email || "",
      data.pan_number || "",
      idProof ? idProof.filename : "",
      medicalCert ? medicalCert.filename : "",
      parseInt(data.height) || 0,
      parseInt(data.weight) || 0,
      data.medical_conditions || "",
      data.habits || "",
      data.nominee_name || "",
      data.nominee_relationship || "",
      data.nominee_dob || null,
      data.nominee_address || "",
      data.vehicle_registration || "",
      data.vehicle_make_model || "",
      parseInt(data.vehicle_year) || 0,
      data.property_address || "",
      data.property_type || "",
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ MySQL error (job):", err);
        //return res.status(500).send("Failed to insert job biodata.");
      }
      res.send("✅ Insurance biodata inserted successfully.");
    });
  }
  
  else {
    return res.status(400).send("❌ Invalid category");
  }
 
  
});

/// Route to fetch user + others from the correct table
const tables = ["shaadi"];
// Clean version of /fetch-profile
app.get("/fetch-profile", (req, res) => {
  console.log("🔍 Fetch profile route hit");

  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // Assume you want matrimonial profiles only for now
  const sql = "SELECT * FROM shaadi WHERE email = ?";
  
  db.query(sql, [email], (err, userResults) => {
    if (err) {
      console.error("❌ DB error (user lookup):", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (userResults.length === 0) {
      return null; //res.status(404).json({ error: "User not found" });
    }

    const user = userResults[0];
    const gender = user.gender.toLowerCase();
    const oppositeGender = gender === "male" ? "female" : "male";

    const othersSql = "SELECT * FROM shaadi WHERE gender = ? AND email != ?";
    db.query(othersSql, [oppositeGender, email], (err2, othersResults) => {
      if (err2) {
        console.error("❌ DB error (others lookup):", err2);
        return res.status(500).json({ error: "Database error" });
      }

      return res.json({
        user,
        others: othersResults,
      });
    });
  });
});



// New route to fetch available jobs from naukri table
app.get("/fetch-jobs", (req, res) => {
  console.log("🔍 Fetch available jobs from naukri");

  const sql = "SELECT * FROM naukri";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching jobs:", err);
      return res.status(500).json({ error: "Database error while fetching jobs." });
    }
    res.json(results); // send available jobs
  });
});

// Route to fetch user's job profile separately
app.get("/fetch-job-profile", (req, res) => {
  console.log("🔍 Fetch job profile route");

  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const sql = "SELECT * FROM biodata_job WHERE email = ?";
  
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ Database error (job):", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      res.json({ profile: results[0] });  // sending profile object
    } else {
      res.status(404).json({ error: "Job profile not found" });
    }
  });
});
// Route to fetch user's insurance biodata
app.get("/fetch-insurance-profile", (req, res) => {
  console.log("🔍 Fetch insurance profile route");

  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const sql = "SELECT * FROM biodata_insurance WHERE TRIM(LOWER(email)) = TRIM(LOWER(?))";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("❌ Database error (insurance):", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      res.json({ profile: results[0] });
    } else {
      res.status(404).json({ profile: null });
    }
  });
});

app.get("/fetch-available-insurances", (req, res) => {
  console.log("🔍 Fetch available insurances route hit");

  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // Step 1: Check if email exists in biodata_insurance
  const checkInsuranceSql = "SELECT * FROM biodata_insurance WHERE email = ?";
  db.query(checkInsuranceSql, [email], (err, insuranceResults) => {
    if (err) {
      console.error("❌ Error checking insurance biodata:", err);
      return res.status(500).json({ error: "Database error during biodata check" });
    }

    if (insuranceResults.length > 0) {
      // Step 2: If user has biodata, fetch available insurance plans
      const availableInsuranceSql = "SELECT * FROM available_insurances";
      db.query(availableInsuranceSql, (err2, insuranceList) => {
        if (err2) {
          console.error("❌ Error fetching available insurances:", err2);
          return res.status(500).json({ error: "Database error fetching insurances" });
        }

        return res.json({
          hasInsuranceBiodata: true,
          availableInsurances: insuranceList
        });
      });

    } else {
      // No biodata for this user
      console.log("❌ No insurance biodata for user");
      return res.json({
        hasInsuranceBiodata: false,
        availableInsurances: []
      });
    }
  });
});


// Start server
app.listen(3000, () => {
  console.log(`🚀 Server running on http://localhost:3000`);
});