const { DataTypes, NOW } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: NOW,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    inDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  },
  { timestamps: false });
  
};
