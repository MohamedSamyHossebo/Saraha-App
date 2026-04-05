import { EventEmitter } from "node:events";
import {
  sendEmail,
  emailSubject,
  emailHTML,
  emailText,
} from "../email/mail.utils.js";

export const emailEmitter = new EventEmitter();

emailEmitter.on("confirmEmail", async (data) => {
  await sendEmail({
    to: data.email,
    subject: emailSubject.confirmEmail,
    text: emailText.confirmEmail(data.otp),
    html: emailHTML.confirmEmail(data.otp),
  }).catch((err) => {
    console.log(err);
  });
});

emailEmitter.on("resetPassword", async (data) => {
  await sendEmail({
    to: data.email,
    subject: emailSubject.resetPassword,
    text: emailText.resetPassword(data.otp),
    html: emailHTML.resetPassword(data.otp),
  }).catch((err) => {
    console.log(err);
  });
});

emailEmitter.on("welcome", async (data) => {
  await sendEmail({
    to: data.email,
    subject: emailSubject.welcome,
    text: emailText.welcome(data.name),
    html: emailHTML.welcome(data.name),
  }).catch((err) => {
    console.log(err);
  });
});

emailEmitter.on("contactUs", async (data) => {
  await sendEmail({
    to: data.email,
    subject: emailSubject.contactUs,
    text: emailText.contactUs(data.name, data.email, data.message),
    html: emailHTML.contactUs(data.name, data.email, data.message),
  }).catch((err) => {
    console.log(err);
  });
});

