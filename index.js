require('dotenv').config();

const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.get('/',(req,res)=>{
  res.json({"message":"welcome to app"});
})
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
    // Get or create user on Chat Engine!
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "Private-Key": "23592a7b-4b5a-4ffe-899c-93f5408fbce2" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
});

app.listen(process.env.PORT);