import nodemailer from "nodemailer";
export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: Number(process.env.MAIL_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyHub" <${process.env.MAIL_SMTP_USER}>`, // 👈 correct "from"
      to,
      subject,
      text,
    });

    console.log("📧 Mail Sent ✅", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Mail Error:", error.message);
    throw error;
  }
};
