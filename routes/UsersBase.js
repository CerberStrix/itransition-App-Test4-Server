const express = require('express');
const router = express.Router();
const { UsersBase } = require('../models')  
const { accessCheck } = require("../middlewares/accessCheck")

router.get('/:email', async (req, res) => {
  const listOfUsers = await UsersBase.findAll();
  res.json(listOfUsers);
});

router.patch('/blocking/:email', accessCheck, async (req, res) => {
  const ids = req.body.ids;
  await UsersBase.update({
    status: "Blocked"
    }, {
    where: { id: ids }
    }
  )
  res.json("SUCCESS")
});

router.patch('/unblocking/:email', accessCheck, async (req, res) => {
  const ids = req.body.ids;
  await UsersBase.update({
    status: "Unlocked"
    }, {
    where: { id: ids }
    }
  )
  res.json("SUCCESS")
});

router.patch('/destroy/:email', accessCheck, async (req, res) => {
  const ids = req.body.ids;
  await UsersBase.destroy({
    where: { id: ids }
    }
  )
  res.json("SUCCESS")
});

module.exports = router;