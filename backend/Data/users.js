var bcrypt = require('bcryptjs');

const users = [
    {
        name: "Dedaldino Papelo",
        email: "kelsonpapelo98@gmail.com",
        password: bcrypt.hashSync("12345678", 10),
        isAdmin: true
    },
    {
        name: "Jacinto Antonio",
        email: "antonio98@gmail.com",
        password:bcrypt.hashSync("1234567", 10),
        isAdmin: false
    },
    {
        name: "Ana Abigail",
        email: "ana98@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
] 

module.exports = users