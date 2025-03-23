import { MailtrapClient } from "mailtrap";

const TOKEN = "5b08af77442416361f63752bd44c34c6";

export const mailtrapClient = new MailtrapClient({
  token: '5b08af77442416361f63752bd44c34c6',
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "CalmBot",
};
