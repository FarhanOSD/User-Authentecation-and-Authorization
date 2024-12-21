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
