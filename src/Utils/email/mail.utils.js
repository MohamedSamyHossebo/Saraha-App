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
  confirmEmailSuccess: "Confirm Your Email Success",
  resetPassword: "Reset Your Password",
  welcome: "Welcome to Saraha App",
  contactUs: "Contact Us",
};

export const emailHTML = {
  confirmEmail: (otp) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border: 1px solid #e1e4e8; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <div style="margin-bottom: 24px;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700;">Confirm Your Email</h1>
        <p style="color: #4a5568; font-size: 16px; margin-top: 12px;">Welcome to Saraha! Please use the verification code below to confirm your account.</p>
      </div>
      
      <div style="margin: 32px 0;">
        <div style="display: inline-block; background: #000000; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-size: 32px; font-weight: 700; letter-spacing: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          ${otp}
        </div>
      </div>

      <p style="color: #718096; font-size: 14px; margin-bottom: 0;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `,
  confirmEmailSuccess: (name) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border: 1px solid #e1e4e8; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <div style="margin-bottom: 24px;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700;">Confirm Your Email Success</h1>
        <p style="color: #4a5568; font-size: 16px; margin-top: 12px;">Welcome to Saraha! Your email has been confirmed successfully.</p>
      </div>
      
      <div style="margin: 32px 0;">
        <div style="display: inline-block; background: #000000; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-size: 32px; font-weight: 700; letter-spacing: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          ${name}
        </div>
      </div>

      <p style="color: #718096; font-size: 14px; margin-bottom: 0;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `,
  resetPassword: (otp) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border: 1px solid #e1e4e8; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <div style="margin-bottom: 24px;">
        <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700;">Reset Your Password</h1>
        <p style="color: #4a5568; font-size: 16px; margin-top: 12px;">We received a request to reset your password. Use the following code to proceed.</p>
      </div>
      
      <div style="margin: 32px 0;">
        <div style="display: inline-block; background: #000000; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-size: 32px; font-weight: 700; letter-spacing: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          ${otp}
        </div>
      </div>

      <p style="color: #718096; font-size: 14px; margin-bottom: 0;">This code is valid for a limited time. If you didn't request this change, please ignore this email.</p>
    </div>
  `,
  welcome: (name) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border: 1px solid #e1e4e8; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <h1 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700; text-align: center;">Welcome to Saraha!</h1>
      <div style="margin-top: 24px; color: #4a5568; line-height: 1.6;">
        <p style="font-size: 18px; font-weight: 600; color: #1a1a1a;">Hello ${name},</p>
        <p>Thank you for joining Saraha App. We're excited to have you on board!</p>
        <p>You can now log in and start sharing or receiving honest feedback from your friends and colleagues.</p>
        
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e1e4e8; font-size: 14px; color: #718096;">
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 4px 0 0 0; font-weight: 600; color: #1a1a1a;">The Saraha App Team</p>
        </div>
      </div>
    </div>
  `,
  contactUs: (name, email, message) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 16px; background: #ffffff; border: 1px solid #e1e4e8; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
      <h1 style="color: #1a1a1a; margin: 0; font-size: 24px; font-weight: 700; border-bottom: 2px solid #000000; padding-bottom: 12px; display: inline-block;">New Contact Message</h1>
      
      <div style="margin-top: 32px;">
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 1px;">From</label>
          <p style="margin: 4px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">${name} (${email})</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: #718096; text-transform: uppercase; letter-spacing: 1px;">Message</label>
          <div style="margin: 8px 0; padding: 16px; background-color: #f7fafc; border-radius: 8px; color: #2d3748; line-height: 1.6; border-left: 4px solid #000000;">
            ${message}
          </div>
        </div>
      </div>
    </div>
  `,
};

export const emailText = {
  confirmEmail: (otp) => `
    Confirm Your Email
    
    Welcome to Saraha! Please use the verification code below to confirm your account:
    
    ${otp}
    
    If you didn't request this, you can safely ignore this email.
  `,
  confirmEmailSuccess: (name) => `
    Confirm Your Email Success
    
    Welcome to Saraha! Your email has been confirmed successfully.
    
    ${name}
    
    If you didn't request this, you can safely ignore this email.
  `,
  resetPassword: (otp) => `
    Reset Your Password
    
    We received a request to reset your password. Use the following code to proceed:
    
    ${otp}
    
    If you didn't request this change, please ignore this email.
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
  confirmEmailSuccess: (name) => [
    {
      filename: "confirm-email-success.html",
      content: emailHTML.confirmEmailSuccess(name),
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
