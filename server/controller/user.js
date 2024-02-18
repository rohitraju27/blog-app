const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/UserSchema.js');

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(404)
        .json({ result: {}, message: 'Please enter proper credentials' });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(404)
        .json({ result: {}, message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ result: {}, message: 'Invalid credentials' });

    // jwt.sign(DATA, JWT_SECRET, OPTIONS);
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.TOKEN_EXPIRY}` }
    );

    res.status(200).json({ result: existingUser, token, message: '' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const signup = async (req, res) => {
  const { userName, email, password, image } = req.body;
  try {
    if (!email || !password || !userName || !image) {
      res
        .status(404)
        .json({ result: {}, message: 'Please enter proper credentials' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      username: userName,
      image,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.TOKEN_EXPIRY}` }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateUser = async (req, res) => {
  const userDetails = req.body;
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { ...userDetails, username: userDetails.userName }
    );

    res
      .status(200)
      .json({ message: 'User updated', status: 200, res: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Could not update user', status: 500 });
  }
};

module.exports = {
  signin,
  signup,
  updateUser,
};
