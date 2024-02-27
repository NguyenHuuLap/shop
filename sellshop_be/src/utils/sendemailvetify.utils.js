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

    const otp = generateOtp();

    const mailOptions = {
        from: 'nguyenlap1910@gmail.com',
        to: email,
        subject: 'Xác thực OTP',
        text: `Mã OTP của bạn là: ${otp}`,
    }
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent: ' + info.response)
    }catch(err){
        console.error('Error sending email:', error)
    }
}

const generateOtp = () => {
    // Implement your OTP generation logic
    return '123456'; // Replace with your actual OTP
  };
  
export default SendEmailVertify;
