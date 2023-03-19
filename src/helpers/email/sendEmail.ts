import Mailjet from "node-mailjet"
import { EmailFrom, EmailTo } from "../../types/email"

/**
 * Send emails using MailJet
 * @param from Object containing sender email and name.
 * @param to Object containing receivver email and name.
 * @param subject Subject of email.
 * @param body Email body to be displayed as HTML.
 */
export default async function sendEmail(
   from: EmailFrom,
   to: EmailTo,
   subject: string,
   body: string
) {
   const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
   )
   const data = {
      Messages: [
         {
            From: {
               Email: from.email,
               Name: from.name,
            },
            To: [
               {
                  Email: to.email,
                  Name: to.name,
               },
            ],
            Subject: subject,
            HTMLPart: body,
         },
      ],
   }

   const result = await mailjet
      .post("send", { version: "v3.1" })
      .request<any>(data)

   const { Status } = result.body.Messages[0]
   if (Status !== "success") {
      throw new Error(Status)
   }
   console.log("Email dispatched to: ", to.email)
}
