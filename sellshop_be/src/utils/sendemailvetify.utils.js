import nodemailer from 'nodemailer';
import ApiErrorUtils from './ApiErrorUtils.js';


const SendEmailVertify = async(email, userId, confirmationToken) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'nguyenlap1910@gmail.com',
            pass: 'fscu qdfv ujco kytc',
        },
    });
    const mailOptions = {
        from: 'nguyenlap1910@gmail.com',
        to: email,
        subject: 'Xác nhận tài khoản',
        text: `Nhấn vào đường link để xác nhận tài khoản: http://localhost:3000/confirm/${userId}/${confirmationToken}`,
    }
    try{
        await transporter.sendMail(mailOptions);
        return true;
    }catch(err){
        throw ApiErrorUtils.simple('Đã có lỗi khi gửi mail' + info.response);
    }
}
export default SendEmailVertify;