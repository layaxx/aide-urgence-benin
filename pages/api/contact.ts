import sendgrid from "@sendgrid/mail"
import { NextApiHandler } from "next"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "")

const sendEmail: NextApiHandler = async (req, res) => {
  try {
    if (!req.body.message) {
      throw new Error("Invalid Request")
    }
    await sendgrid.send({
      to: "aideurgencebenin@gmail.com",
      from: "dev@y-lang.eu",
      subject: `[Contact Submission] | a-u-b.org`,
      html: `
  <div class="container" style="margin-left: 20px;margin-right: 20px;">
    <h3>You've got a new mail from ${
      req.body.name ?? "anonymous"
    }, their email is: ${req.body.email ?? "anonymous"} </h3>
    <div style="font-size: 16px;">
      <p>Message:</p>
      <p>${req.body.message}</p>
    </div>
  </div>
  `,
    })
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: "" })
}

export default sendEmail
