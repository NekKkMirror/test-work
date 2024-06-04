const UserService = require('../services/user.service')
const FileService = require('../services/file.service')
const { updateFile, addFile } = require('../services/file.service')

exports.profile = async (req, res) => {
  const { id } = req.user

  const user = await UserService.findOne({
    where: { id },
    attributes: ['username', 'surname', 'email', 'gender'],
  })

  return res.status(200).json(user)
}

exports.profiles = async (req, res) => {
  const page = req.searchParams?.page || 1
  const list_size = req.searchParams?.list_size || 10
  const offset = page * list_size
  const limit = list_size
  const users = await UserService.findAndCountAll({
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    attributes: ['username', 'surname', 'email', 'gender', 'createdAt'],
  })

  return res.status(200).json({
    message: 'Users successful founded',
    users,
  })
}

exports.updateProfile = async (req, res) => {
  const dto = req.body

  if (!dto) {
    throw Error('user.controller[updateProfile] error - empty dto')
  }

  let requestFile
  if (req.files) {
    const fileKey = Object.keys(req.files)[0]

    requestFile = req.files[fileKey]
  }

  const { id } = req.user
  const { dataValues: existingFile } =
    (await FileService.findOne({
      where: { userId: id },
    })) || {}

  const execFileUpdate = existingFile
    ? updateFile.bind(
        null,
        {
          where: {
            userId: id,
          },
        },
        existingFile,
      )
    : addFile.bind(null, { userId: id })

  await execFileUpdate(requestFile)
  // await UserService.update(
  //   { ...dto },
  //   {
  //     where: {
  //       id,
  //     },
  //   },
  // )

  return res.status(201).json({
    message: 'Users successful updated',
  })
}
