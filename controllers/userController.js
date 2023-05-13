const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()


  


module.exports.register = async (req, resp) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return resp.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let User = await userModel.findOne({ email })
        if (User) {
            return resp.status(400).json({ message: `This Account is already Exist` })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        User = new userModel({
            name,
            email,
            password: hashPassword,
        })

        await User.save()

        return resp.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.log(error.message)
        resp.status(500).send('Server Error')
    }
}

module.exports.login = async (req, resp) => {
    const { email, password } = req.body
    if (!email || !password) {
        return resp.status(400).json({ error: "email and password are required" })
    }
    try {
        let User = await userModel.findOne({ email })
        if (!User) {
            return resp.status(400).json({ message: `This Account is not  Exist` })
        }
        const doMatch = await bcrypt.compare(password, User.password)
        if (doMatch) {
            const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRETS)
            resp.status(201).json({ token })
            console.log(token)
        } else {
            return resp.status(401).json({ error: "email & password is invalid" })
        }

    } catch (err) {
        console.log(err);
    }
}


exports.getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.name });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };

