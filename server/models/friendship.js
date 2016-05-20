module.exports = (sequelize, DataTypes) => {
  var Friendship = sequelize.define('Friendship', {
    dateAdded: DataTypes.DATE
  })

  return Friendship
}
