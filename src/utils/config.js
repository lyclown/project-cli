import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import globalConfig from '../config/index.js';
import inquirer from 'inquirer';
import {isEmptyObject} from './tools.js';
import logger from './logger.js';
// 配置文件的路径
const CONFIG_PATH = path.join(os.homedir(), '.my-cli-config.json');

// 读取配置文件
export async function readConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // 如果配置文件不存在，我们返回一个空对象
    if (err.code === 'ENOENT') {
      return {};
    } else {
      throw err;
    }
  }
}

// 写入配置文件
export async function writeConfig(config) {
  const data = JSON.stringify(config, null, 2);
  await fs.writeFile(CONFIG_PATH, data, 'utf8');
}
export async function setConfig(config={}) {
    const newSettings = await inquirer.prompt(globalConfig.inquirerPrompts);
    // 将新的设置写入全局配置文件
    await writeConfig({ ...config, ...newSettings });
    logger.signale.info(isEmptyObject(config) ? '新增全局配置' : '设置已更新.');
}
