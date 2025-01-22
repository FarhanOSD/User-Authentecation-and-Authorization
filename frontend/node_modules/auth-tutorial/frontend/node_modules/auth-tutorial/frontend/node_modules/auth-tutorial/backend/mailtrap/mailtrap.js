
import { MailtrapClient } from 'mailtrap';
import dotenv from "dotenv";

dotenv.config();


export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.HOST,
  token: process.env.TOKEN,
});
//hello@demomailtrap.com
export const sender = {
  email: 'mailtrap@demomailtrap.com',
  name: 'Farhan',
};