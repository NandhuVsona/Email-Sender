const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});
app.post("/submit", (req, res) => {
  try {
    const { name, email} = req.body;
    let text = `<h1>Hi ${name},</h1>
<p>Thank you for signing up for <strong>Your App Name</strong>! We're excited to have you on board.</p>
<p>Here’s what you can do next:</p>
<ul>
    <li>Explore the features of our app.</li>
    <li>Customize your profile.</li>
</ul>
<p>Best regards,<br>The Your App Name Team</p>
<p>Stay tuned for updates and new features coming soon!</p>`;
    sendMail(email, "Registration Success", text);
    res.status(200).sendFile(path.join(__dirname, "view", "submit.html"));
  } catch (err) {
    res.status(500).json(err);
  }
});
const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "nandhuv139@gmail.com",
    pass: "soex tbkr rymn btdg",
  },
});
function sendMail(to, sub, msg) {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
}

app.listen(3000, () => console.log("listening"));
