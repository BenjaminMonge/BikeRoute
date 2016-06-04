module.exports = (sequelize, DataTypes) => {

  var City = sequelize.define('City', {
    cityname: {type: DataTypes.STRING, primaryKey: true},
    coordinates: DataTypes.GEOMETRY,
    image: DataTypes.STRING
  }
)

  return City
}
