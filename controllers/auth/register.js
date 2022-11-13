const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models/users");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exsist`);
  }
  

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, subscription, avatarURL });

 
  newUser.setPassword(password);

  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    date: {
      user: {
        email,
        subscription,
        avatarURL
      },
    },
    
  });
};

module.exports = register;