import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

export async function sendEmail(req: Request, res: Response) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log(resend);
  const { email, message, name } = req?.body;
  console.log(email, name, message);
  try {
    const data = await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: ["sujitadroja07@gmail.com"],
      replyTo: email,
      subject: "Hello World",
      html: `<div><h3 style="margin-bottom: 20px">Hello ${name}</h3><p>${message}</p></div>`,
    });
    console.log("Email sent successfully:", data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
}
