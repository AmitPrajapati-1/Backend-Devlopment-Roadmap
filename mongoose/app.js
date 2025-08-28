const mongoose=require('mongoose');
const {v4:uuidv4}=require('uuid');
const AutoIncreament=require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://localhost:27017/learning').then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.error("Could not connect to MongoDB", err);
});

const userSchema=new mongoose.Schema({
    // user_id:{ type:String, default: uuidv4, required: true },//user_id:{ type:String, unique:true, required: true } manually entering id 
    name:{ type:String, required:true },
    email:{ type:String, required:true },
    age:{ type:Number, min:0 },
    isActive:{ type:Boolean, default:true },
    tags:[{ type:String }],
    createdAt:{ type:Date, default:Date.now }
})//using {id:false}
 userSchema.plugin(AutoIncreament, {inc_field: 'user_id'});
const User=mongoose.model('User',userSchema);

async function runQueryexamples() {
    try{
        // const newuser=await User.create({
        //     name:"John Doe",
        //     email:"john@example.com",
        //     age:30,
        //     isActive:true,
        //     tags:["developer","javascript"],
        //     createdAt:new Date()
        // })
        const newuser=new User({
            name:"Jane Smith",
            email:"jane@example.com",
            age:25,
            isActive:false,
            tags:["designer","figma"],
            createdAt:new Date()
        })
        await newuser.save()
        console.log("New User Created:", newuser);

        const allusers=await User.find()
        console.log("All Users:", allusers);

        // const getuserofactivefalse=await User.find({isActive:false})
        // console.log("Inactive Users:", getuserofactivefalse);
        const getuserofactivefalse=await User.findOne({isActive:false})
        console.log("Inactive Users:", getuserofactivefalse);

        // const getlastusercreatedbyid=await User.findById(newuser._id);
        // console.log("Last User Created:", getlastusercreatedbyid);

        const selectedproperties=await User.find().select('name email -_id')
        console.log("Selected Properties:", selectedproperties);

        const limiteduser=await User.find().limit(5).skip(5)
        console.log("Limited Users:", limiteduser);

        const sortedusers=await User.find().sort({age:-1})
        console.log("Sorted Users:", sortedusers);

        const countusers=await User.countDocuments({isActive:false})
        console.log("Count of Active Users:", countusers);


        // const deleteduser=await User.findByIdAndDelete(newuser._id);
        // console.log("Deleted User:", deleteduser);

        const updateduser=await User.findByIdAndUpdate(newuser._id,{
            $set:{age:100,email:"jane.smith@example.com"}, $push:{tags:"updated"}
        },{new:true});
        console.log("Updated User:", updateduser);
    }   catch(err){
        console.error("Error during query examples", err);
    } finally {
        await mongoose.connection.close();
    }
}
runQueryexamples();