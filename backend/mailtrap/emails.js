import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemp.js"
import { mailtrapClient, sender } from "./mailtrap.js"

export const sendVerificationEmail = async(email,verificationCode) => {
  const recipient = [{ email }]
  
  try {
    const response = await mailtrapClient.send({
      from: sender,
      recipient: recipient,
      subject: 'Verification Code',
      html: VERIFICATION_EMAIL_TEMPLATE(
        '{verificationToken}',
        verificationCode
      ),
      category: 'Email Verification Code',
    });
    console.log('Verification email sent successfully:', response);
  } catch (error) {
    throw new Error(`Error sending verification message:${error.message}`)
  }
}


export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "522c1f1a-2a86-4e61-81b7-96e50bf86a82",
      template_variables: {
        company_info_name: "Authorization Company",
        name : name,
      },
      subject: 'Welcome to our platform',
      html: `Welcome to our platform ${name}`,
      category: 'Welcome Email',
    });
    console.log('Welcome email sent successfully:', response);
  } catch (error) {
    throw new Error(`Error sending welcome message:${error.message}`);
  }
 }