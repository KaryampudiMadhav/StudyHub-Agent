import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import { userModel } from "./../../models/user.model.js";
import { sendMail } from "./../../utils/mailer.js";

export const onSignUp = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    const { email } = event.data;

    // Step 1: Get the user
    const userData = await step.run("get-user-email", async () => {
      const user = await userModel.findOne({ email });
      if (!user) throw new NonRetriableError("User no longer exists.");
      return {
        email: user.email,
        name: user.fullName || "User", // fallback if no name
      };
    });

    // Step 2: Send welcome mail (no nesting!)
    await step.run("send-welcome-message", async () => {
      const subject = `Jai Shree Ram – WELCOME!`;
      const message = `Hi ${userData.name},

Thanks for signing up — we’re glad to have you onboard! 🙌

– Team StudyHub`;

      console.log("📧 Sending mail to:", userData.email);
      await sendMail(userData.email, subject, message);
      console.log("✅ Mail sent");
    });

    return { success: true };
  }
);
