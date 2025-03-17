const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
router.post("/api/auth/google",async (req,res)=>{
    const {credential} = req.body;
   const isAdmin = await admin_check(credential.email);
  if (isAdmin) {
    const value = 'admin'
    res.status(200).json({ role: "admin" });
  } else {
    const isFaculty = await faculty_check(credential.email);
    if (isFaculty) {
      res.status(200).json({ role: "Faculty" });
    } else {
      res.status(200).json({ role: "Not Allowed" });
    }
  }
})
async function admin_check(email) {
    try {
      const adminUsers = await mongoose.connection.db.collection('admin_users').find({ 'email': email }).toArray();
      return adminUsers.length > 0; // Return true if admin user found, false otherwise
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  }
  
async function faculty_check(email) {
    try {
      const facultyUsers = await mongoose.connection.db.collection('faculty_users').find({ 'email': email }).toArray();
      return facultyUsers.length > 0; // Return true if faculty user found, false otherwise
    } catch (error) {
      console.log("Error", error);
      return false;
    }
}
module.exports = router;