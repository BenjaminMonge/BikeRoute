/* CLase evento de ciclismo*/
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
      eventid: {type: DataTypes.BIGINT, primaryKey: true},
      evtname: DataTypes.STRING,
      description: DataTypes.STRING,
      evtimage: DataTypes.STRING,
      startDate: DataTypes.DATE
    }, {
      classMethods: {
        associate: (models) => {
          Event.belongsToMany(models.User, {through: models.UserEvent})
        }
      }
    }
  )

  return Event
}
