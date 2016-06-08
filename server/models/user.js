/* CLase usuario*/
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
      username: {type: DataTypes.STRING, primaryKey: true},
      email: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.STRING,
      image: DataTypes.STRING,
      joinDate: DataTypes.DATE
    },{
      classMethods: {
        associate: (models) => {
          User.belongsToMany(models.Event, {through: models.Participation, onDelete: 'CASCADE'})
          User.belongsToMany(models.User, {as: 'Friends', through: models.Friendship})
          User.belongsTo(models.City)
          User.hasMany(models.Comment)
        }
      }
    }
  )

  return User
}
