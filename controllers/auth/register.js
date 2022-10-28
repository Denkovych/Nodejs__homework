const { Conflict } = require("http-errors");


const { User } = require("../../models/users");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exsist`);
  }
  
  const newUser = new User({ email, subscription });

 
  newUser.setPassword(password);

  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    date: {
      user: {
        email,
        subscription,
      },
    },
    
  });
};

module.exports = register;