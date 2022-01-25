

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

exports.companyReg = (req, res) => {
    res.render("company_reg");
}

exports.teacherReg = (req, res) => {
    res.render("teacher_reg");
}

exports.studentReg = (req, res) => {
    res.render("student_reg");
}

exports.registration = (req, res) => {
    res.redirect(`${req.body.type}-reg`);
    console.log(req.body.type);
}