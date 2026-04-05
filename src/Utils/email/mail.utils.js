import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../../../config/config.service.js";

export async function sendEmail({
  to = "",
  subject = "",
  text = "",
  html = "",
  attachments = [],
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments,
    });
    console.log("Email sent:", info);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}

export const emailSubject = {
  confirmEmail: "Confirm Your Email",
  resetPassword: "Reset Your Password",
  welcome: "Welcome to Saraha App",
  contactUs: "Contact Us",
};

export const emailHTML = {
  confirmEmail: (otp) => `
    <h1>Confirm Your Email</h1>
    <p>Click the link below to confirm your email</p>
    <a href="http://localhost:3000/auth/confirm-email/${otp}">Confirm Email</a>
  `,
  resetPassword: (otp) => `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="http://localhost:3000/auth/reset-password/${otp}">Reset Password</a>
  `,
  welcome: (name) => `
    <h1>Welcome to Saraha App</h1>
    <p>Hello ${name},</p>
    <p>Thank you for joining Saraha App. We're excited to have you on board!</p>
    <p>You can now log in and start using our services.</p>
    <p>Best regards,</p>
    <p>The Saraha App Team</p>
  `,
  contactUs: (name, email, message) => `
    <h1>Contact Us</h1>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Message: ${message}</p>
  `,
};

export const emailText = {
  confirmEmail: (otp) => `
    Confirm Your Email
    Click the link below to confirm your email
    http://localhost:3000/auth/confirm-email/${otp}
  `,
  resetPassword: (otp) => `
    Reset Your Password
    Click the link below to reset your password
    http://localhost:3000/auth/reset-password/${otp}
  `,
  welcome: (name) => `
    Welcome to Saraha App
    Hello ${name},
    Thank you for joining Saraha App. We're excited to have you on board!
    You can now log in and start using our services.
    Best regards,
    The Saraha App Team
  `,
  contactUs: (name, email, message) => `
    Contact Us
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `,
};

export const emailAttachments = {
  confirmEmail: (otp) => [
    {
      filename: "confirm-email.html",
      content: emailHTML.confirmEmail(otp),
    },
  ],
  resetPassword: (otp) => [
    {
      filename: "reset-password.html",
      content: emailHTML.resetPassword(otp),
    },
  ],
  welcome: (name) => [
    {
      filename: "welcome.html",
      content: emailHTML.welcome(name),
    },
  ],
  contactUs: (name, email, message) => [
    {
      filename: "contact-us.html",
      content: emailHTML.contactUs(name, email, message),
    },
  ],
};
