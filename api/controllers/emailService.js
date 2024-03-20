// emailService.js

import nodemailer from 'nodemailer';

// Create a transporter for sending emails using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'masahmagdi7@gmail.com', // Your Gmail email address
        pass: 'vmem yntv fjfo woei', // Your Gmail password
    },
});

// Function to send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: 'masahmagdi7@gmail.com', // Sender email address
            to: email, // Receiver email address
            subject: 'Email Verification',
            html: `<p>Click <a href="http://localhost:3000/">here</a> to verify your email.</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

