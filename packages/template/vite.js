const spawn = require("cross-spawn");
const chalk = require('chalk')

module.exports = async function ({ targetDir, answers }) {
    const cwd = process.cwd();
    const command = answers.isYarn ? "yarn" : "npm";
    spawn.sync(command, ['init','vite@latest',answers.projectName], {cwd, stdio: 'inherit' });
    spawn.sync('npm', ['install'], {cwd:targetDir, stdio: 'inherit' });
    console.log()
    console.log(chalk.cyan(`$ cd ${targetDir}`))
    console.log(chalk.cyan(`npm run dev`))
    console.log()
}