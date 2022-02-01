const mysql = require("mysql");
const PoolCluster = require("mysql/lib/PoolCluster");

const pool = mysql.createPool({
    connectionLimit    : 100,
    host               : process.env.DB_HOST,
    user               : process.env.DB_USER,
    password           : process.env.DB_PASS,
    database           : process.env.DB_NAME
});

var userId;
var tableName;
var role;

exports.login = (req, res) =>{
    res.render("login");
}

exports.loginRequest = (req, res) =>{
    var user = req.body.id;
    var pass = req.body.password;
    
    pool.getConnection((err, connection) => {
        if(err) throw err;

        if(user && pass){
            connection.query('SELECT * FROM student_reg WHERE mobile = ? AND password = ?', [user, pass], (error, result, fields) =>{
                if(result.length > 0){
                    userId = user;
                    tableName = 'student_reg';
                    role = 'Student';
                    res.redirect('dashboard');
                } else{
                    connection.query('SELECT * FROM teacher WHERE mobile =  ? AND t_pass = ?', [user, pass], (err, result, fields) =>{
                        if(result.length > 0){
                            userId = user;
                            tableName = 'teacher';
                            role = 'Teacher';
                            res.redirect('dashboard');
                        } else {
                            connection.query('SELECT * FROM admin WHERE mobile =  ? AND password = ?', [user, pass], (err, result, fields) =>{
                                if(result.length > 0){
                                    userId = user;
                                    tableName = 'admin';
                                    role = 'Admin';
                                    res.redirect('dashboard');
                                } else {
                                    connection.query('SELECT * FROM company WHERE mobile =  ? AND password = ?', [user, pass], (err, result, fields) =>{
                                        if(result.length > 0){
                                            userId = user;
                                            tableName = 'company';
                                            role = 'Company';
                                            res.redirect('dashboard');
                                        } else{
                                            res.redirect('failed');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.redirect('failed');
        }
    });
}

exports.dashboard = (req, res) => {
    
    pool.getConnection((err, connection) =>{
        if(err) throw err;

        connection.query(`SELECT * FROM ${tableName} WHERE mobile = ${userId}`, (err, result) =>{
            console.log(result[0].name);
            res.render("dashboard", {name : result[0].name, id : userId, role : role, profile: result[0].Profile_Url});
        });
    });

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

exports.post = (req, res) => {
    var post = req.body.post;
    
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        connection.query('INSERT INTO post SET Content  = ?, Post_By = ? Profile_Url = ?, Post_By_Id = ?', [post, '', ])
    });
}

exports.registration = (req, res) => {
    res.redirect(`${req.body.type}-reg`);
    console.log(req.body.type);
}

exports.success = (req, res) => {
    res.render("reg_success");
}

exports.failed = (req, res) => {
    res.render("failed_msg");
}