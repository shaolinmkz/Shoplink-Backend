export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Department.associate = () => {
    // associations can be defined here
  };
  return Department;
};
