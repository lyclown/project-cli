const globalConfig = {
    "template": "vue3",
    gitUrl:'https://github.com/lyclown/template-app.git',
    inquirerPrompts:[
        {
            type: 'boolean',
            name: 'install',
            message: '是否初始化项目后安装依赖项?',
            default: true,
        },
        {
            type: 'list',
            name: 'manager',
            message: '您想使用哪个包管理器?',
            choices: ['npm', 'yarn'],
            default: 'npm',
        },
    ]
}
export default globalConfig;