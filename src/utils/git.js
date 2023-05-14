import logger from './logger.js';
import {execSync,getcwd} from './tools.js';
import globalConfig from '../config/index.js';
export default async function downloadTemplate(branch, project) {
  // 这里的 repo 变量是你的模板仓库地址，你需要替换成实际的地址
  logger.loading.start('模版开始下载...')
  try {
    const projectPath = getcwd(project);
    const {err,stdout} = await execSync(`git clone -b ${branch} ${globalConfig.gitUrl} ${projectPath}`);
    console.log(err,'err')
    if(!err){
        logger.loading.succeed('模版下载成功!')
    }
    return projectPath;
  } catch (error) {
    logger.loading.fail('Loading failed!');
    logger.signale.error('Failed to download template:', error);
    return null;
  }
}
