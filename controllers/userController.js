
const { equal } = require('assert')
const {User, Like} = require('../models/models.js')



class UserController{

    async registration(req,res,next){

        const {email,password,parent_email} = req.body
        if (!email || !password || !parent_email) {
            return res.status(404).json({message: 'Не заполнено 1 из полей'})
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return res.status(400).json({message: 'Такой пользователь уже зарегестрирован'})
        }
        const user = await User.create({email,password,parent_email})
        const like = await Like.create({userId: user.id})
        return res.status(200).json({message: 'Успешная регистрация'})
    }
    async login(req,res,next){

        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message: 'Отсутствует логин или пароль'})
        }

        const user = await User.findOne({where: {email,password}})

        if (!user || !password) {
            return res.status(400).json({message: 'Неверные данные для входа'})
        }
        return res.status(200).json({message: 'Успешный вход'})
    }
    
    async update(req,res,next){
        const {email,password,parent_email} = req.body
        if(!email){
            return res.status(400).json({message: 'Не переданы данные'})
        }
        
        const condidate = await User.findOne({where:{email}})

        if(!condidate){ 
            return res.status(400).json({message: 'Пользователь с данным email не найден'})
        }

        if(email && password && !parent_email){
            condidate.update({password:password})
            return res.status(200).json({message: 'Пароль был успешно сменен'})
        }
        else if(email && parent_email && !password){
            condidate.update({parent_email:parent_email})
            return res.status(200).json({parent_email: `${parent_email}`})
        }
        condidate.update({password:password,parent_email:parent_email})
        return res.status(200).json({parent_email: `${parent_email}`})
    }
}

module.exports = new UserController()
