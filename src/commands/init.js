import inquirer from 'inquirer';
import { readConfig ,setConfig} from '../utils/config.js';
import logger from '../utils/logger.js';
import globalConfig from '../config/index.js';

import downloadTemplate from '../utils/git.js';
import modifyTemplate from '../utils/template.js';
import installDependencies from '../utils/terminal.js';

export default async function initAction(template, project, options) {
    // 1. 校验输入的参数
    if(!template){
        const templateAnswers = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Choose the template:',
                choices: ['vue2', 'vue3','master'],
                default:globalConfig.template
            },
        ])
        template = templateAnswers.template
    }
    if (!project) {
        const projectAnswers = await inquirer.prompt([
            {
                type: 'inpit',
                name: 'project',
                message: '请输入项目名:',
            },
        ])
        project = projectAnswers.project
    }
    const config = await readConfig();
    if (Object.keys(config).length > 0) {
        logger.signale.info('Your current settings are:');
        logger.signale.info(config);
        const answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'modify',
                message: 'Do you want to modify these settings?',
                default: false,
            },
        ]);

        if (answers.modify) {
            await setConfig(config);
        }
    }else{
        await setConfig();
    }
    console.log(options)

    // 2. 从 Git 仓库中下载对应的模板
    const templatePath = await downloadTemplate(template,project);
    console.log(templatePath,2323232)
    if (!templatePath) {
        logger.signale.error('Failed to download template!');
        return;
    }

    // 3. 根据用户输入的参数修改模板中的一些文件
    const success = modifyTemplate(templatePath, { projectName: project,description:'asdjaksjdklasndkj' });
    if (!success) {
        console.signale.error('Failed to modify template!');
        return;
    }

    // 4. 如果用户选择了自动安装依赖，那么我们还需要自动安装依赖
    if (options.install) {
        installDependencies(templatePath, options.manager);
    }
}
