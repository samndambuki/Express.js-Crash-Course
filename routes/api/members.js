const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//simple rest api
//gets all members
//middleware functions have access to req, res
router.get("/", (req, res) => {
  res.json(members);
});

//get a single member
//id is a url parameter
router.get("/:id", (req, res) => {
  // res.send(req.params.id)
  //for each member

  //some returns true or false
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    //400 is a bad request
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

//Create Member
router.post("/", (req, res) => {
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    //bad request
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  //return the entire array
  res.json(members);
});

//update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);

  if (found) {
    const updateMember = req.body;
    members.forEach(member=>{
      if(member.id === parseInt(req.params.id)){
        member.name = req.body.name;
        member.email = req.body.email
      }
    });

  } else {
    res.status(400).json({ msg: `No memmber with id of ${req.params.id}` });
  }
});

module.exports = router;
