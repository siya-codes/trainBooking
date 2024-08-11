import { Router, urlencoded } from 'express';
import  { AdminLogin, Login, Signupcontroller, handleFiles } from '../controllers/basic.js'
import upload from '../middlewares/images.js';
import { Authenticate } from '../middlewares/authenticate.js';
import multer from 'multer'
import {Bookticket, CreateTraindata, DeleteTrain, Generateotp, Getalltraindetails, Getbookingsofuser, Getticket, Gettraindatabyid, Sendmails, Trainfilters, Updatetrain, Verifyotp, getUserDetailsWithBookings}from '../controllers/Train.controllers.js';
export const router=Router()

// router.route('/home').get(Basic);
router.route('/signup').post(Signupcontroller);
router.route('/login').post(Login);
router.route('/adminlogin').post(AdminLogin);
router.route('/addtrain').post(CreateTraindata);
router.route('/getalltrains').get(Getalltraindetails);
router.route('/updatetrain').put(Updatetrain);
router.route('/gettrainbyid').get(Gettraindatabyid);
router.route('/deletetrain').delete(DeleteTrain);
router.route('/booktrain').post(Bookticket,Sendmails);
router.route('/getbookings').get(getUserDetailsWithBookings);
router.route('/getbookingbyuserid').get(Getbookingsofuser);
router.route('/filtertrain').get(Trainfilters);
router.route('/getticket').get(Getticket);
router.route('/generateotp').post(Generateotp);
router.route('/verifyotp').post(Verifyotp);
router.route('/mail').get(Sendmails);

router.route('/update').put(upload.single('profile'),handleFiles);
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      next();
    }
  });