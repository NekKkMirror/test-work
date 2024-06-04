module.exports = (sequelize, SequelizeDeclaration) => {
  return sequelize.define(
    'files',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: SequelizeDeclaration.INTEGER,
      },
      mdName: {
        type: SequelizeDeclaration.STRING,
      },
      name: {
        type: SequelizeDeclaration.STRING,
      },
      extname: {
        type: SequelizeDeclaration.STRING,
      },
      mimetype: {
        type: SequelizeDeclaration.STRING,
      },
    },
    {
      indexes: [
        {
          name: 'md5_with_name',
          fields: ['mdName'],
        },
      ],
    },
  )
}
