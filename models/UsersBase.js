module.exports = (sequelize, DataTypes) => {

  const UsersBase = sequelize.define("UsersBase", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastLoginTime: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    }
  })

  return UsersBase;
}