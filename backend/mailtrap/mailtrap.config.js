import { MailtrapClient } from "mailtrap";

const TOKEN = "5b08af77442416361f63752bd44c34c6";

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN || TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "CalmBot",
};
