const {User, Expense, ExpenseCategory, Images, PaymentMethod, Saving, Trip, UserTrip, sequelize} = require('../models/index')

class TripController {
  
  static async postTrip(req,res,next){
    
    const t = await sequelize.transaction()
    try {
      const {
        name,
        startDate,
        endDate, 
        homeCurrency,
        tripImageUrl,
        targetBudget,
      } = req.body;

      const newTrip = await Trip.create({
        name,
        startDate,
        endDate, 
        homeCurrency,
        tripImageUrl,
        targetBudget,
      },{ transaction: t }) 

      await UserTrip.create({
        UserId: req.user.id,
        TripId:newTrip.id,
        status:'active',
        role:'owner'
      }, { transaction: t })

      await t.commit()
      res.status(201).json({
        message: `Trip ${newTrip.name} has been created!`
      })

    } catch (err) {
      await t.rollback()
      next(err)
    }
  }

  static async getTrips(req,res,next){
    try {
      const trips = await User.findAll({
  
        where:{
          id: req.user.id
        },
        include: [
          {
          model: Trip, 
          order: [["createdAt", "desc"]]
          }
        ]
      })
      res.status(200).json(trips)
    } catch (err) {
      next(err)
    }
  }

}
module.exports = TripController