module.exports = (sequelize, DataTypes) => {
  var Friendship = sequelize.define('Friendship', {
    accepted: DataTypes.BOOLEAN,
    dateAdded: DataTypes.DATE
  })

  return Friendship
}
