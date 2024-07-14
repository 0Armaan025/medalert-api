const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

// https://static.staticsave.com/twiliodemo/demo.xml

const app = express();
const port = 3001;

const accountSid = "ACb4cf88e58cb192edd990d56ffc944198";
const authToken = "f370ab958783c259a622e632f9771fb0";
const twilioNumber = "+12516517622";

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to make an emergency call
app.post("/makeEmergencyCall", async (req, res) => {
  try {
    const { to } = req.body;

    const call = await client.calls.create({
      url: "https://static.staticsave.com/twiliodemo/demo.xml",
      to,
      from: twilioNumber,
    });

    console.log(call.sid);
    res.status(200).json({ message: "Call initiated successfully." });
  } catch (error) {
    console.error("Error making Twilio call:", error);
    res.status(500).json({ error: "Error making Twilio call." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
