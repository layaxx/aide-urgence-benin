import { NextApiHandler } from "next"

const sendEmail: NextApiHandler = async (req, res) => {
  try {
    if (!req.body.message) {
      throw new Error("Invalid Request")
    }

    const formData = new URLSearchParams()
    formData.append(
      "from",
      `Mailgun Sandbox <postmaster@${process.env.MAILGUN_SENDER_ID}>`,
    )
    formData.append("to", "A-U-B Notifications <aide-urgence-benin@y-lang.eu>")
    formData.append("subject", "[Contact Submission] | a-u-b.org")
    formData.append(
      "text",
      `You've got a contact form submission from ${req.body.name || "anonymous"}. ${req.body.email ? `Their E-Mail address is ${req.body.email}.` : ""}
      
      ${req.body.message}      
`,
    )
    formData.append(
      "html",
      `<div class="container" style="margin-left: 20px;margin-right: 20px;">
    <h3>You've got a contact form submission from ${
      req.body.name || "anonymous"
    }, their email is: ${req.body.email || "[none-provided]"} </h3>
    <div style="font-size: 16px;">
      <p>Message:</p>
      <p>${req.body.message}</p>
    </div>
  </div>
  `,
    )

    await fetch(
      `https://api.mailgun.net/v3/${process.env.MAILGUN_SENDER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("api:" + process.env.MAILGUN_API_KEY).toString(
              "base64",
            ),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      },
    ).then(async (response) => {
      console.info(await response.text())
      if (!response.ok) {
        throw new Error("Failed to send email")
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(500).json({ error: "An unknown error occurred" })
  }

  return res.status(200).json({ success: true })
}

export default sendEmail
