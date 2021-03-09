const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Standard BodyParser text
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // tells body parser to use standard encoding
app.use(bodyParser.json());

//Put Pusher credentials here
const pusher = new Pusher({
  appId: "1161352",
  key: "3208d14fa83564075d3c",
  secret: "083170048dda107c6d3c",
  cluster: "ap1",
  encrypted: true,
});

//Sets the port number
app.set("PORT", process.env.PORT || 5000); //Set port number

//used to trigger an event
app.post("/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("chat", "message", payload);
  res.send(payload);
});

// app.post("/testMessage", (req, res) => {
//   const payload = req.body;
//   pusher.trigger("chat", "testEvent", payload);
//   res.send(payload);
//   //lets see if you need the res.send
// });

app.listen(app.get("PORT"), () =>
  console.log("Listening at " + app.get("PORT"))
);
