const userController = {
    login: (req, res) => {
        if (!req.body.userName || !req.body.password) {
            res.send('Login failed!');
        } else if (req.body.userName == "pj" && req.body.password == "pj") {
            req.session.userName = req.body.userName;
            req.session.admin = true;
            console.log('SESSION: ', req.session);
            res.redirect('/');
        } else {
            res.send('Usuario o contraseña incorrecta!');
        }
    },
    logout: (req, res) => {
        res.clearCookie('userCookie')
        req.session.destroy()
        res.redirect('/');
    }
}

module.exports = userController