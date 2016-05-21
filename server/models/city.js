module.exports = (sequelize, DataTypes) => {
  var City = sequelize.define('City', {
    cityname: DataTypes.STRING,
    coordinates: DataTypes.STRING
  },
  {
    classMethods: (models) => {
      City.hasMany(models.Event)
    }
  }
)

  return City
}
