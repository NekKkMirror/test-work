const { promises: fs } = require('node:fs')
const fileConfig = require('../config/file.config')
const path = require('node:path')
const db = require('../models')

const { file: File } = db
const drivePath = path.join(process.cwd(), `/app/${fileConfig.driveDir}`)

const verifyFile = (file, fileExtname) => {
  const largeFileSize = 10000000
  const fileSize = file.data.length
  const allowExtnames = ['jpg', 'png']

  if (fileSize > largeFileSize) {
    throw Error('file.service[updateFile] error -  file must be less than 10 MB')
  }

  if (!allowExtnames.includes(fileExtname)) {
    throw Error(
      `file.service[updateFile] error -  extname not one of [${allowExtnames.join(', ')}]`,
    )
  }
}

const getFileData = (file) => {
  const { name, mimetype: fileMimetype, md5 } = file
  const [fileName, fileExtname] = name.split('.')
  const md5Name = `${fileName}-${md5}.${fileExtname}`

  return { md5Name, fileName, fileExtname, name, fileMimetype }
}

const createFile = async (createFileOptions) => {
  await File.create(createFileOptions)
}

const updateFile = async (...updateFileOptions) => {
  await File.update(...updateFileOptions)
}

exports.addFile = async (extendDto, file) => {
  if (!file) {
    throw Error('file.service[updateFile] error -  file not found')
  }

  const { md5Name, fileName, fileExtname, fileMimetype } = getFileData(file)

  verifyFile(file, fileExtname)

  await createFile({
    mdName: md5Name,
    name: fileName,
    extname: fileExtname,
    mimetype: fileMimetype,
    ...extendDto,
  })

  await file.mv(`${drivePath}/${md5Name}`)
}

exports.updateFile = async (updateFileOptionsExtends, existedFile, requestFile) => {
  if (!requestFile) {
    throw Error('file.service[updateFile] error -  file not found')
  }

  const { mdName: oldFileFullName } = existedFile
  const { md5Name, fileName, fileExtname, fileMimetype } = getFileData(requestFile)

  verifyFile(requestFile, fileExtname)

  await fs.unlink(`${drivePath}/${oldFileFullName}`)
  await requestFile.mv(`${drivePath}/${md5Name}`)

  await updateFile(
    { mimetype: fileMimetype, name: fileName, extname: fileExtname, mdName: md5Name },
    {
      ...updateFileOptionsExtends,
    },
  )
}

exports.findOne = async (findOneOptions) => {
  return await File.findOne(findOneOptions)
}
