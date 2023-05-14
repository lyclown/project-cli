import logger from './logger.js';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import semver from 'semver';

// 配置文件的路径
const CONFIG_PATH = path.join(os.homedir(), '.my-cli-config.json');

// 检查Node.js版本
export function checkNodeVersion(requiredVersion) {
  if (!semver.satisfies(process.version, requiredVersion)) {
    logger.signale.error(
      `You are using Node ${process.version}, but this version of my-cli requires Node ${requiredVersion}. Please upgrade your Node version.`
    );
    process.exit(1);
  }
}

// 检查全局配置文件是否存在
export async function checkGlobalConfigFile() {
  try {
    await fs.access(CONFIG_PATH);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      logger.signale.error(err);
      throw err;
    }
  }
}

// 检查必要的依赖是否已经安装
export function checkDependencies(dependencies) {
  // 这里只是一个简单的示例，你可能需要根据你的需求来实现这个函数
  dependencies.forEach((dep) => {
    try {
      require.resolve(dep);
    } catch (err) {
      logger.signale.error(`Missing required dependency: ${dep}`);
      process.exit(1);
    }
  });
}
