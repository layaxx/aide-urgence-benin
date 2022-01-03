import sendgrid from "@sendgrid/mail"
import { NextApiHandler } from "next"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "")

const sendEmail: NextApiHandler = async (req, res) => {
  try {
    await sendgrid.send({
      to: "dev@arbeitskreis.video",
      from: "dev@y-lang.eu",
      subject: `[Contact Submission]`,
      html: `
  <div class="container" style="margin-left: 20px;margin-right: 20px;">
    <h3>You've got a new mail from ${
      req.body.name ?? "anonymous"
    }, their email is: ✉️${req.body.email ?? "anonymous"} </h3>
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
