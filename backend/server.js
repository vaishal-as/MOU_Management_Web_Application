/* Required Modules*/
const express=require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path=require("path");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config({
  path:'./.env',

})

const app = express();

/*Cross Login Function */
app.use(cors(
  'http://localhost:8080'
));
app.use(bodyParser.json());

/*Creating SMTP Mail Transporter*/

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFERESH_TOKEN
  } 
});

/*DataBase Connection*/

function database_connection(){ 
  const URL = process.env.MONGO_URI;
  return mongoose.connect(URL)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.error("Database connection error", err);
    process.exit(1);
  });
}

// Function to generate HTML table

function generateHtmlTable(records) {
  if (records.length === 0) {
    return '<p>No MOUs have expired.</p>';
  }
      
  let table = `<table border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr>
        <th>MOU Name</th>
        <th>College Name</th>
        <th>Location</th>
        <th>About</th>
        <th>Outcome</th>
        <th>End Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>`;
      
  records.forEach(record => {
    table += `<tr>
      <td>${record.mouName}</td>
      <td>${record.name}</td>
      <td>${record.location}</td>
      <td>${record.about}</td>
      <td>${record.outcome}</td>
      <td>${record.endDate}</td>
      <td>${record.status}</td>
    </tr>`;
  });
  table += `</tbody></table>`;
  return table;
}

/*Function that Checks the Expire of Mou And Send Mail to admin users */

async function initial_activities(){
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  try {
    const instMouRecord = await mongoose.connection.db.collection("College-MOU").find({endDate:{$lt : formattedDate},status:"Active"}).toArray();
    const instMouResult = await mongoose.connection.db.collection("College-MOU").updateMany(
      {endDate : {$lt : formattedDate}},
      {$set : {status : "Inactive"}}
    );
    const deptMouRecord = await mongoose.connection.db.collection("Department-MOU").find({endDate:{$lt : formattedDate},status:"Active"}).toArray();
    const deptMouResult = await mongoose.connection.db.collection("Department-MOU").updateMany(
      {endDate : {$lt : formattedDate}},
      {$set : {status : "Inactive"}}
    );

    if(instMouResult.modifiedCount > 0 && instMouRecord.length > 0){
      const mailConfigurations = {
        from: process.env.GMAIL_ID,
        to: 'vaishal.cs22@bitsathy.ac.in',
        subject: 'Regarding The Expire Of Institute MOUs',
        html: `<p>Hello,</p>
               <p>The following Institute MOUs have expired and have been marked as "Inactive":</p>
               ${generateHtmlTable(instMouRecord)}`
      };
      transporter.sendMail(mailConfigurations, function(error, info) {
        if (error){
          console.log("Error In sending Mail")
        }
        else{
          console.log('Institute Email Sent Successfully');
        }
      });
    }
    if(deptMouResult.modifiedCount > 0 && deptMouRecord.length > 0){
      const mailConfigurations = {
        from: process.env.GMAIL_ID,
        to: 'vaishal.cs22@bitsathy.ac.in',
        subject: 'Regarding The Expire Of Department MOUs',
        html: `<p>Hello,</p>
               <p>The following Department MOUs have expired and have been marked as "Inactive":</p>
               ${generateHtmlTable(deptMouRecord)}`
      };
      transporter.sendMail(mailConfigurations, function(error, info) {
        if (error){
          console.log("Error In sending Mail")
        }
        else{
          console.log('Institute Email Sent Successfully');
        }
      });
    }
  } catch (error) {
    console.log("Error in Updating the Document");
  }
  
}


/* Routing to corresponding file */
app.use("/events", require("./routes/events"));
app.use("/mou", require("./routes/mou"));
app.use("/aruth",require("./routes/login"))
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  database_connection().then(()=>{
    const intervalInMilliseconds = 10 * 1000;
    initial_activities();
    setInterval(() => {
      initial_activities();
    }, intervalInMilliseconds);
  })
});


