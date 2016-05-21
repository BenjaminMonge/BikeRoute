module.exports = (sequelize, DataTypes) => {
  var UserEvent = sequelize.define('UserEvent', {
    created: DataTypes.BOOLEAN
  }, {
    classMethods:{
      associate: (models) => {
        UserEvent.hasMany(models.Comment)
      }
    }
  }

)

  return UserEvent
}
