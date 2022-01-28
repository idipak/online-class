const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const studentController = require('../controller/studentController');



router.get('/', userController.login);
router.post('/', userController.loginRequest);
router.get('/registration', userController.registraionOption);
router.post('/registration', userController.registration);

router.get('/admin-reg', userController.adminReg);
router.post('/admin-reg', userController.adminSave);

router.get('/company-reg', userController.companyReg);
router.post('/company-reg', userController.companySave);

router.get('/teacher-reg', userController.teacherReg);
router.post('/teacher-reg', userController.teacherSave);

router.get('/student-reg', userController.studentReg);
router.post('/student-reg', userController.studentSave);

router.get('/student', studentController.home);

router.get('/success', userController.success);

module.exports = router;