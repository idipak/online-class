
-- Create table for student registraion
CREATE TABLE `online_class`.`student_reg` ( `s_id` INT NOT NULL AUTO_INCREMENT , `password` VARCHAR(30) NOT NULL , `roll` INT NOT NULL , `name` VARCHAR(50) NOT NULL , `class` INT NOT NULL , `dob` DATE NOT NULL , `father_name` VARCHAR(50) NOT NULL , `mobile` VARCHAR(20) NOT NULL , `view_data` VARCHAR(255) NOT NULL , `comment` VARCHAR(255) NOT NULL , PRIMARY KEY (`s_id`)) ENGINE = InnoDB;

-- Create table for company
CREATE TABLE `online_class`.`company` ( `comp_id` INT NOT NULL AUTO_INCREMENT , `password` VARCHAR(50) NOT NULL , `name` VARCHAR(50) NOT NULL , `mobile` VARCHAR(50) NOT NULL , PRIMARY KEY (`comp_id`)) ENGINE = InnoDB;

-- Create table for teacher
CREATE TABLE teacher(t_id INT NOT NULL AUTO_INCREMENT, t_pass VARCHAR(50) NOT NULL, name VARCHAR(50) NOT NULL, PRIMARY KEY (t_id));

-- Create table for admin
CREATE TABLE admin(admin_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, city VARCHAR(50), PRIMARY KEY (admin_id));