const mysql = require("mysql");
const PoolCluster = require("mysql/lib/PoolCluster");

const pool = mysql.createPool({
    connectionLimit    : 100,
    host               : process.env.DB_HOST,
    user               : process.env.DB_USER,
    password           : process.env.DB_PASS,
    database           : process.env.DB_NAME
});


exports.login = (req, res) =>{
    res.render("login");
}

exports.loginRequest = (req, res) =>{
    res.send(req.body);
}

exports.registraionOption = (req, res) =>{
    res.render("registration");
}

exports.adminReg = (req, res) => {
    res.render("admin_reg");
}

exports.adminSave = (req, res) => {
    const {name, city, mobile, password} = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query('INSERT INTO admin SET name = ?, city = ?, mobile = ?, password = ?', [name, city, mobile, password], (err, rows) =>{
            if(!err){
                res.render('reg_success');
            } else {
                console.log('Error' + err);
            }
        });
    });
}

exports.companyReg = (req, res) => {
    res.render("company_reg");
}

exports.companySave = (req, res) => {
    const {name, password, mobile} = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query('INSERT INTO company SET name = ?, password = ?, mobile = ?', [name, password, mobile], (err, rows) => {
            connection.release();

            if(!err){
                res.render('reg_success');
            } else{
                console.log("Error" + err);
            }
        })
    });
}

exports.teacherReg = (req, res) => {
    res.render("teacher_reg");
}

exports.teacherSave = (req, res) => {
    const {name, mobile, t_pass} = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err;

        connection.query('INSERT INTO teacher SET name = ?, mobile = ?, t_pass = ?', [name, mobile, t_pass], (err, rows) =>{
            if(!err){
                res.render('reg_success');
            } else {
                console.log('Error' + err);
            }
        });
    });
}

exports.studentReg = (req, res) => {
    res.render("student_reg");
}

exports.studentSave = (req, res) => {
    const {name, s_class, father_name, mobile, roll, password, dob, comment} = req.body;

    pool.getConnection((err, connection) =>{
        if(err) throw err;

        connection.query('INSERT INTO student_reg SET name = ?, s_class = ?, father_name = ?, mobile = ?, roll = ?, password = ?, dob = ?, comment = ?', [name, s_class, father_name, mobile, roll, password, dob, comment], (err, rows) =>{
            connection.release();

            if(!err){
                res.render('reg_success');
            } else {
                console.log('Error' +  err);
            }
        });
    });
}

exports.registration = (req, res) => {
    res.redirect(`${req.body.type}-reg`);
    console.log(req.body.type);
}

exports.success = (req, res) => {
    res.render("reg_success");
}