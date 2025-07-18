import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "student-trainee",
  name: "StudyHub",
  eventUrl: "http://localhost:7000/api/inngest", // 👈 this is critical
});
