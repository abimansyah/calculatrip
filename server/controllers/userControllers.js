const {
    User
} = require('../models/index')
const {
    comparePassword
} = require("../helpers/bcrypt");
const {
    createToken
} = require('../helpers/jwt')

class UserController {
    static async registerUser(req, res, next) {
        try {
            let input = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                avatar: req.body.avatar,
                birthDate: req.body.birthDate
            }
            const user = await User.create(input);
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
            })
        } catch (err) {
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            let input = {
                loginInput: req.body.loginInput,
                password: req.body.password
            }
            if (!input.loginInput) {
                throw {
                    name: "Email is required"
                }
            }
            if (!input.password) {
                throw {
                    name: "Password is required"
                }
            }
            let user = await User.findOne({
                where: {
                    email: input.loginInput
                }
            });
            if (!user) {
                user = await User.findOne({
                    where: {
                        username: input.loginInput
                    }
                });
            }
            if (!user) {
                throw {
                    name: 'Invalid Username/Password'
                }
            }
            if (!comparePassword(input.password, user.password)) {
                throw {
                    name: 'Invalid Username/Password'
                }
            }
            let token = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            token = createToken(token)
            if (!token) {
                throw {
                    name: 'JsonWebTokenError'
                }
            }
            res.status(200).json({
                access_token: token
            });
        } catch (err) {
            next(err)
        }
    }

    static async getUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async getUserByInput(req, res, next) {
        try {
            const {
                input
            } = req.params
            let user = await User.findOne({
                where: {
                    email: input
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            });
            if (!user) {
                user = await User.findOne({
                    where: {
                        username: input
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    }
                });
            }
            if (!user) {
                throw {
                    name: "User not found"
                }
            }
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async getUserProfile(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            });
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        try {
            let idUser = +req.params.id
            let input = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                avatar: req.body.avatar,
                birthDate: req.body.birthDate
            }
            const userFound = await Movie.findByPk(idUser)
            if (!userFound) throw {
                name: "User not Found"
            }
            const user = await User.update(input, {
                where: {
                    id: idUser
                },
                returning: true,
                individualHooks: true
            });
            res.status(201).json({
                message: "Your profile has been updated!"
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController