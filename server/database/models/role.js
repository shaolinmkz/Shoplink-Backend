export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING
    }
  }, {});
  Role.associate = () => {
    // associations can be defined here
  };
  return Role;
};
