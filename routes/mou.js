const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

router.post("/count", async (req, res) => {
    try {
        const college_mou_count = (await mongoose.connection.db.collection("College-MOU").countDocuments()).toString();
        const dept_mou_count = (await mongoose.connection.db.collection("Department-MOU").countDocuments()).toString();
        const event_count = (await mongoose.connection.db.collection("Events").countDocuments()).toString();

        res.status(200).json({
            college_mou_count:college_mou_count,
            dept_mou_count:dept_mou_count,
            event_count:event_count
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "Error: Failed to retrieve counts" });
    }
});

router.post("/record",async (req,res)=>{
    try {
        const type = req.body.type;
        
        if (type === 'Institute') {
            const activeRecords = await mongoose.connection.db.collection('College-MOU').find({ 'status': 'Active' }).toArray();
            const inactiveRecords = await mongoose.connection.db.collection('College-MOU').find({ 'status': 'Inactive' }).toArray();
            res.status(200).json({ activerecords:activeRecords, inactiverecords:inactiveRecords });
        } else {
            const activeRecords = await mongoose.connection.db.collection('Department-MOU').find({ 'Dept': type, 'status': 'Active' }).toArray();
            const inactiveRecords = await mongoose.connection.db.collection('Department-MOU').find({ 'Dept': type, 'status': 'Inactive' }).toArray();
            res.status(200).json({ activerecords:activeRecords, inactiverecords:inactiveRecords });
        }
        } catch (error) {
            console.error("Error fetching records:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
})
router.post("/addmou",async (req,res)=>{
    const{moutype,mou_name,c_name,c_location,c_about,mou_des,outcome,rpi_name,rpi_email,rpi_phone,rpc_name,rpc_email,rpc_phone,cont_type,cont_des,amount,start_date,end_date,status} = req.body;
    if(moutype === 'Institute'){
        const data = await mongoose.connection.db.collection("College-MOU").find({location:c_location,mouName:mou_name,name:c_name,outcome:outcome}).toArray();
        if(data.legth>0){
            res.status(200).json({message:"Already Exists"});
        }else{
        const responce = await mongoose.connection.db.collection("College-MOU").insertOne({
            mouName:mou_name,
            name:c_name,
            location:c_location,
            about:c_about,
            description:mou_des,
            outcome:outcome,
            responsiblePersonInstitute:rpi_name,
            responsiblePersonInstituteEmail:rpi_email,
            responsiblePersonInstitutePhone:rpi_phone,
            responsiblePersonCompany:rpc_name,
            responsiblePersonCompanyEmail:rpc_email,
            responsiblePersonCompanyPhone:rpc_phone,
            contributionType:cont_type,
            contributionDescription:cont_des,
            amount:amount,
            startDate:start_date,
            endDate:end_date,
            status:status});
        if(responce.acknowledged){
            res.status(200).json({message:"Success"})
        }else{
            res.status(200).json({message:"Some Error Has occured!!!"});
        }
        }
    }else{
        const data = await mongoose.connection.db.collection("Department-MOU").find({location:c_location,mouName:mou_name,name:c_name,outcome:outcome}).toArray();
        if(data.length>0){
            res.status(200).json({message:"Already Exists"});
        }else{
        const responce = await mongoose.connection.db.collection("Department-MOU").insertOne({
            Dept:moutype,
            mouName:mou_name,
            name:c_name,
            location:c_location,
            about:c_about,
            description:mou_des,
            outcome:outcome,
            responsiblePersonInstitute:rpi_name,
            responsiblePersonInstituteEmail:rpi_email,
            responsiblePersonInstitutePhone:rpi_phone,
            responsiblePersonCompany:rpc_name,
            responsiblePersonCompanyEmail:rpc_email,
            responsiblePersonCompanyPhone:rpc_phone,
            contributionType:cont_type,
            contributionDescription:cont_des,
            amount:amount,
            startDate:start_date,
            endDate:end_date,
            status:status});
            if(responce.acknowledged){
                res.status(200).json({message:"Success"})
            }else{
                res.status(200).json({message:"Some Error Has occured!!!"});
            }
        }
    }
})

router.post("/delete", async (req,res)=>{
    const {id,dept} = req.body;
    if(dept == 'Institute'){
        const record = await mongoose.connection.db.collection("College-MOU").find({_id:new mongoose.Types.ObjectId(id)}).toArray();
        if(record){
            await mongoose.connection.db.collection("Deleted-mou").insertMany(record);
            await mongoose.connection.db.collection("College-MOU").deleteOne({_id:new mongoose.Types.ObjectId(id)});
            res.status(200).json({message:"Record Deleted Successfully"});
        }else{
            res.status(200).json({message:"Record Not found"});
        }
    }else{
        const record = await mongoose.connection.db.collection("Department-MOU").find({_id:new mongoose.Types.ObjectId(id)}).toArray();
        if(record){
            await mongoose.connection.db.collection("Deleted-mou").insertMany(record);
            await mongoose.connection.db.collection("Department-MOU").deleteOne({_id:new mongoose.Types.ObjectId(id)});
            res.status(200).json({message:"Record Deleted Successfully"});
        }else{
            res.status(200).json({message:"Record Not found"});
        }
    }
})
router.post("/editmou",async (req,res)=>{
    const {rec,type} = req.body;
    const{_id,...record} = rec;
    if(type == 'Institute'){
        const result = await mongoose.connection.db.collection("College-MOU").updateMany({_id:new mongoose.Types.ObjectId(_id)},{$set:record})
        if(result.modifiedCount>0){
            res.status(200).json({message:"Record Updated"});
        }else{
            res.status(404).json({message:"Record Not Updated"})
        }
    }else{
        const result = await mongoose.connection.db.collection("Department-MOU").updateMany({_id:new mongoose.Types.ObjectId(_id)},{$set:record});
        if(result.modifiedCount>0){
            res.status(200).json({message:"Record Updated"});
        }else{
            res.status(404).json({message:"Record Not Updated"})
        }
    }
    // res.status(200).json({message:"Ok"})
})

module.exports=router;