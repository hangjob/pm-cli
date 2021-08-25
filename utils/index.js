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
        else { // 是文件则 拷贝
            // 这是个异步管道写入-细节带研究
            // let readable = fs.createReadStream(newSourcePath)//创建读取流
            // let writable = fs.createWriteStream(newTargetPath)//创建写入流
            // readable.pipe(writable)
            // 同步写法
            fs.writeFileSync(newTargetPath, fs.readFileSync(newSourcePath))
        }
    })
}

/**
 * 删除指定目录
 * @param url
 */
function deleteDir (url) {
    let files = []
    if (fs.existsSync(url)) {  //判断给定的路径是否存在
        files = fs.readdirSync(url)   //返回文件和子目录的数组
        files.forEach(function (file, index) {
            let curPath = path.join(url, file)
            if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteDir(curPath)
            }
            else {
                fs.unlinkSync(curPath)    //是指定文件，则删除
            }
        })
        fs.rmdirSync(url) //清除文件夹
    }
    else {
        console.log('给定的路径不存在！')
    }
}

/**
 * 移动文件到指定位置
 */
function moveFile (formPath, toPath) {
    let data = fs.readFileSync(formPath, 'utf-8')
    fs.writeFileSync(toPath, data, 'utf-8')
}

module.exports = {
    copyFile,
    deleteDir,
    moveFile
}