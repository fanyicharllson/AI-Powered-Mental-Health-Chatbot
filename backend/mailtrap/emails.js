import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "c41d42c4-d543-475f-8fc7-79a029e17701",
      template_variables: {
        company_info_name: "CalmBot.org",
        name: username,
      },
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email: ${error}`);
    throw new Error("Error sending email: ", error);
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetToken),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    throw new Error("Error sending password reset email: ", error);
  }
};

export const sentResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email: ${error}`);
    throw new Error("Error sending password reset success email: ", error);
  }
};
