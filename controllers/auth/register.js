const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');;

const { sendEmail } = require("../../helpers/sendEmail");
const { User } = require("../../models/users");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exsist`);
  }
  

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const newUser = new User({ email, subscription, avatarURL, verificationToken});

 
  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Confirm your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`,
  };
  
  await sendEmail(mail);

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