const express=require('express');
const { RegiterController, LoginController, myporfileController, updateController } = require('../controllers/userController');
const authMiddleware=require("../Middleware/authMiddleware")

const router=express.Router();



router.post('/signup',RegiterController);
router.post('/login',LoginController);
// router.get("/myprofile",  authMiddleware, myporfileController);

router
    .route("/myprofile").get(authMiddleware,myporfileController).put(authMiddleware,updateController)
    



module.exports=router;