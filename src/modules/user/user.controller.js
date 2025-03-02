import { Router } from "express";
import * as validators from "../user/user.validation.js"
import { validation } from "../../middlewere/validation.middlewere.js";
import { authentication, authorization } from "../../middlewere/authontcation.middlewere.js";
import { coverimages, Getloginuseraccount, updateimage, updatepassword, Updateuseraccount, Getprofiledata, deleteProfileImage, deleteCoverImage } from "./service/profile.service.js";
import { fileValidationTypes, uploadCloudFile } from "../../utlis/multer/cloud.multer.js";

const router = Router()




router.get("/Getloginuseraccount", authentication(), Getloginuseraccount)
router.patch("/Updateuseraccount", authentication(), Updateuseraccount)
router.patch("/updatepassword", authentication(), updatepassword)
router.get("/Getprofiledata", authentication(), Getprofiledata)


router.patch("/profile/coverimage", authentication(),
  
    uploadCloudFile(fileValidationTypes.image).array('image', 2),


    coverimages);


router.patch("/profile/image", authentication(),
   
    uploadCloudFile(fileValidationTypes.image).single('image')
    , updateimage);

router.delete("/deleteProfileImage", authentication(), deleteProfileImage)
router.delete("/deleteCoverImage", authentication(), deleteCoverImage)
export default router