const jwt = require('jsonwebtoken')
// const { CustomAPIError } = require('../errors/custom-error')
const CustomAPIError = require('../errors/custom-error');

const login = async (req,res) => {
    const {username, password} = req.body
    console.log('Request body', req.body);
    if(!username || !password) {
        console.log('No token provided or incorrect token format.');
        throw new CustomAPIError('Please provide username or password', 400)
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
    res.status(200).json({ msg: 'User created', token })

}

const dashboard = async (req,res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = {
    login,
    dashboard,
}
