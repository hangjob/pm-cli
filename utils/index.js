const fs = require('fs')
const path = require('path')

/**
 * 判断文件夹是否存在, 不存在创建一个
 * @param path
 */
function isExist (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

/**
 * 递归拷贝目录
 * @param sourcePath
 * @param targetPath
 */
function copyFile (sourcePath, targetPath) {
    const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })
    sourceFile.forEach(file => {
        const newSourcePath = path.resolve(sourcePath, file.name)
        const newTargetPath = path.resolve(targetPath, file.name)
        if (file.isDirectory()) {
            // 是目录则 递归
            isExist(newTargetPath)
            copyFile(newSourcePath, newTargetPath)
        }
        else {
            // 是文件则 拷贝
            let readable = fs.createReadStream(newSourcePath)//创建读取流
            let writable = fs.createWriteStream(newTargetPath)//创建写入流
            readable.pipe(writable)
        }
    })
}

module.exports = {
    copyFile,
}