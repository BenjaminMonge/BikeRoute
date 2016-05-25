/* Modelo de la clase para el comentario*/

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
    datePosted: DataTypes.DATE
  },{
    classMethods: {
      associate: (models) => {
        Comment.belongsTo(models.User)
        Comment.belongsTo(models.Event)
      }
    }
  }

  )

  return Comment
}
