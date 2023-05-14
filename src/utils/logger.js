import signale from 'signale';
import figlet from 'figlet';
import ora from 'ora';
import chalk from 'chalk';
class Logger {
    constructor(options) {
        this.options = {
            disabled: false,
            interactive: false,
            logLevel: 'info',
            scope: 'custom',
            secrets: [],
            stream: process.stdout,
            types: {
                error: {
                    badge: '⛔',
                    color: 'red',
                    label: 'Error',
                    logLevel: 'error',
                },
                warn: {
                    badge: '⚠️',
                    color: 'yellow',
                    label: 'Warning',
                    logLevel: 'warn',
                },
                info: {
                    badge: 'ℹ️',
                    color: 'blue',
                    label: 'Info',
                    logLevel: 'info',
                },
                debug: {
                    badge: '🐛',
                    color: 'green',
                    label: 'Debug',
                    logLevel: 'debug',
                },
            },
            ...options
        };
        this.signale = new signale.Signale(options);
        this.loading = ora();
        this.chalk = chalk;
    }
    setFiglet(text,option){
        return figlet.textSync(text, {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
            ...option
          })
    }
}
const logger = new Logger();
console.log(logger.setFiglet('Thakn You'))
export default logger;
