/* Modelo de la clase para el comentario*/

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    datePosted: DataTypes.DATE,
    rates: DataTypes.INTEGER
  })

  return Comment
}
