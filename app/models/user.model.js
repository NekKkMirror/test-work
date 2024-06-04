module.exports = (sequelize, SequelizeDeclaration) => {
  return sequelize.define(
    'users',
    {
      id: {
        primaryKey: true,
        defaultValue: SequelizeDeclaration.UUIDV4,
        type: SequelizeDeclaration.STRING,
      },
      username: {
        type: SequelizeDeclaration.STRING,
      },
      surname: {
        type: SequelizeDeclaration.STRING,
      },
      email: {
        type: SequelizeDeclaration.STRING,
      },
      password: {
        type: SequelizeDeclaration.STRING,
      },
      gender: {
        type: SequelizeDeclaration.STRING,
      },
    },
    {
      indexes: [
        {
          name: 'email_index',
          fields: ['email'],
        },
      ],
    },
  )
}
