const User = require('../../models/user');
let _user = {};

_user.getUsers = function (req, res) {
    User.find({}).then(function (users) {
        res.send(users)
    }).catch(function (error) {
        res.status(500).send(error)
    })
}

_user.getUser = function (req, res) {
    User.findById(req.user._id).populate('accounts').exec(function (error, user) {
        return res.send(user)
    })
}

_user.createUser = function (req, res) {
    const user = new User(req.body)
    user.save().then(function () {
        return res.send(user)
    }).catch(function (error) {
        return res.status(400).send(error)
    })
}

_user.login = function (req, res) {
    User.findByCredentials(req.body.email, req.body.password).then(function (user) {
        user.generateToken().then(function (token) {
            return res.send({ user, token })
        }).catch(function (error) {
            return res.status(401).send({ error: error })
        })
    }).catch(function (error) {
        return res.status(401).send({ error: error })
    })
}

_user.logout = function (req, res) {
    req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token
    })

    req.user.save()
        .then(() => {
            return res.send()
        }).catch(error => {
            return res.status(500).send({ error: error })
        })
}

_user.updateUser = function (req, res) {
    const _id = req.user._id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Invalid update, only allowed to update: ' + allowedUpdates
        })
    }
    User.findByIdAndUpdate(_id, req.body).then(function (user) {
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function (error) {
        res.status(500).send(error);
    })
}

_user.deleteUser = function (req, res) {
    const _id = req.user._id
    User.findByIdAndDelete(_id).then(function (user) {
        if (!user) {
            return res.status(404).send()
        }
        return res.send(user)
    }).catch(function (error) {
        res.status(505).send(error)
    })
}

module.exports = _user;