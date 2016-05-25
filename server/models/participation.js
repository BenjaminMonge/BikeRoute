module.exports = (sequelize, DataTypes) => {
  var Participation = sequelize.define('Participation', {
    created: DataTypes.BOOLEAN
  }
)

  return Participation
}
