const User = require('../models/User');
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const signIn = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user =await User.findOne({email});
    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();
      res.status(201).json(newUser);
    }
    else{
      res.status(400).json({error:"Email Already exist"});
    }
  }
  catch(err){
    res.status(401).json(err);
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect Curerent password' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password =hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
module.exports = { login, signIn ,changePassword};
