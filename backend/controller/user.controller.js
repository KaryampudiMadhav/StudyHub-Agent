import { userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { inngest } from './../inngest/client.js';
import { generateToken } from './../utils/userAuth.js';
import cloudinary from "./../utils/cloudinary.js";

export const SignUp = async(req,res)=>{
    const {email,password,fullName} = req.body;

    if(!email || !password || !fullName ){
        return res.status(401).json({sucess : false,error : "Enter All the Fields."})
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ sucess: false, error: "Password Mismacth.." });
    }
    try {
        const user  = await userModel.findOne({email})
        if(user){
            return res.status(400).json({sucess : false,error : "User already exists"});
        }
        const hashed  = await bcrypt.hash(password,10);
        const newUser = await userModel({
            email,
            password : hashed,
            fullName
        });
       
        await newUser.save()

        await inngest.send({
            name : "user/signup",
            data : {
                email : newUser.email
            },
        })

        console.log("inngest working")

        generateToken(newUser._id,res)
        res.status(201).json({user : newUser});

    } catch (error) {
        console.log(error);
        return res.status(501).json({error: "Internal Server Error"})
    }
}

export const Login = async(req,res)=>{
   const {email,password,confirmPassword} = req.body;

   if(!email || !password || !confirmPassword){
    return res.status(400).json({error : "All Fields are required.."});
   }

   if(password !== confirmPassword){
    return res.status(400).json({ error: "Password does not match" });
   }
   if (password.length < 6) {
     return res
       .status(400)
       .json({ sucess: false, error: "Password Mismacth.." });
   }
   try {
    
    const isUserExists = await userModel.findOne({email})

    if(!isUserExists){
        return res.status(404).json({ error: "User NotFound" });
    }

    const isCorrect = await bcrypt.compare(password,isUserExists.password);

    if(!isCorrect){
        return res.status(400).json({ error: "Incorrect Password.." });
    }

    generateToken(isUserExists._id,res)

    res.status(201).json({user : isUserExists})

   } catch (error) {
     console.log(error)
     return res.status(501).json({ error: "Internal Server Error" });
   }
}

export const Logout = async(req,res)=>{
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(201).json({message : "Logout Sucessfull"});

    } catch (error) {
        console.log(error);
        res.status(501).json({error : error});
    }
}

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const user = req.user._id;
  console.log(user , "in updating profile")
  if (!profilePic) {
    return res.status(400).json({ message: "The ProfilePic is not provided." });
  }

  try {
    const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    console.log(uploadedResponse.secure_url);
    const updatedData = await userModel.findByIdAndUpdate(
      user,
      { profilePic: uploadedResponse.secure_url },
      { new: true }
    );

    console.log(updatedData);
    res.status(200).json(updatedData);
  } catch (error) {
    console.log("Error in updating pic:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getuser = async(req,res)=>{
    try {
   
        const userAuth = await userModel.findById(req.user._id).select("-password");

        res.status(201).json({user : userAuth});

    } catch (error) {
        console.log(error);
        res.status(501).json({ error: error });
    }
}

export const postSkill = async (req, res) => {
  const { frontSkill } = req.body;
  const user = req.user;

  if (!frontSkill || typeof frontSkill !== "string") {
    return res.status(400).json({ error: "Skill must be a valid string." });
  }

  try {
    // 1. Add skill to user if not already present
    const userUpdated = await userModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { skills: frontSkill } },
      { new: true }
    );

     await inngest.send({
       name: "user/analyze.skills",
       data : {
        userId : userUpdated._id,
        skills : [frontSkill]
       }
     });
    // 4. Respond
    //  await inngest.send({
    //    name: "user/skills",
    //    data: {
    //      email: userUpdated.email,
    //      skill : frontSkill
    //    },
    //  });
    return res.status(201).json({
      message: "Skill added and analyzed successfully.",
      skills: userUpdated.skills,
    });
  } catch (error) {
    console.error("❌ postSkill error:", error);
    return res.status(500).json({ error: "Failed to add and analyze skill." });
  }
};

export const getSkills = async (req,res) => {
    const user = req.user;
    
    try {
      const showSkills = await userModel.findById(user._id);
      res.status(200).json({skills : showSkills.skills})
    } catch (error) {
      console.log(error);
      res.status(500).json({error : "Error in skills.."});
    }
}
