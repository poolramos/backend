const userController = {
    login: (req, res) => {
        res.cookie('userCookie', req.body.userName, { maxAge: 60000 }).redirect('/');
    },
    logout: (req, res) => {
        res.clearCookie('userCookie').send({}).redirect('/');
    }
}

module.exports = userController