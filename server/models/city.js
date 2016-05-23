module.exports = (sequelize, DataTypes) => {
  var City = sequelize.define('City', {
    cityname: {type: DataTypes.STRING, primaryKey: true},
    coordinates: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    classMethods: (models) => {

    }
  }
)

  return City
}
