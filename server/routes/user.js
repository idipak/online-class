const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const studentController = require('../controller/studentController');



router.get('/', userController.login);
router.post('/', userController.loginRequest);
router.get('/registration', userController.registraionOption);
router.post('/registration', userController.registration);

router.get('/admin-reg', userController.adminReg);
router.get('/company-reg', userController.companyReg);
router.get('/teacher-reg', userController.teacherReg);
router.get('/student-reg', userController.studentReg);

router.get('/student', studentController.home);

module.exports = router;