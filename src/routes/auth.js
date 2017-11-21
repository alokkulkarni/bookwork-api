import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
	
  const { credentials } = req.body;

  User.findOne({ email: credentials.email }).then(user => {
  	
  	console.log(credentials.email);
  	console.log(user.email);

    if (user && user.isValidPassword(credentials.password)) {
      	res.json({ user: user.toAuthJSON() });
    } else {
    	console.log("reaching here as user is null and not connected to mongo db");
      	res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
})


export default router;