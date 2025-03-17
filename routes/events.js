const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

router.post("/display-record",async (req,res)=>{
    const{cat} = req.body;
    if(cat == 'all'){
        const records = await (await mongoose.connection.db.collection("Events")).find({}).toArray()
        res.status(200).json({message:records});
    }else{
        const records = await (await mongoose.connection.db.collection("Events")).find({mouName:cat}).toArray()
        res.status(200).json({message:records});
    }
});

router.post("/searchMou",async (req,res)=>{
    const {mou_name} = req.body;
    try {
        const db = mongoose.connection.db;
        const [collegeMou, departmentMou] = await Promise.all([
            db.collection("College-MOU").find({ mouName: { $regex: mou_name, $options: 'i' },status:'active' }).toArray(),
            db.collection("Department-MOU").find({ mouName: { $regex: mou_name, $options: 'i'},status:'active' }).toArray()
        ]);
        const combinedResults = [...collegeMou, ...departmentMou];
        res.status(200).json({ message: "success", data: combinedResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred while searching" });
    }
    // res.status(200).json({message:"success"});
})
router.post("/addEvent",async (req,res)=>{
    const{mou_name,event_name,event_about,participants,chief_guest,expenditure,amount,event_date} = req.body;
    try {
        const event = await mongoose.connection.db.collection("Events").find({mouName:mou_name,eventName:event_name}).toArray();
        if(event.length === 0){
            try {
                const db = mongoose.connection.db;
                const [collegeMou, departmentMou] = await Promise.all([
                    db.collection("College-MOU").find({ mouName: mou_name }).toArray(),
                    db.collection("Department-MOU").find({ mouName: mou_name }).toArray()
                ]);
                const combinedResults = [...collegeMou, ...departmentMou];
                if(combinedResults.length>0){
                    try {
                        const responce = await mongoose.connection.db.collection("Events").insertOne({
                            mouName:mou_name,
                            eventName:event_name,
                            eventAbout:event_about,
                            totalParticipants:participants,
                            chiefGuest:chief_guest,
                            expenditure:expenditure,
                            amountGenerated:amount,
                            eventDate:event_date
                        })
                        res.status(200).json({message:"Event Added Successfully"});
                    } catch (error) {
                        res.status(200).json({message:"Error In Adding Event"});
                    }
                }
                else{
                    res.status(200).json({message:"The Mentioned Mou does Not Exists"});
                }
            } catch (error) {
                console.log(error)
                res.status(200).json({message:"Error In Adding Event"});
            }
        }else{
            res.status(200).json({message:"Event Already Added"});
        }
    } catch (error) {
     res.status(200).json({message:"Error In Adding Event"})   
    }
})
module.exports = router;