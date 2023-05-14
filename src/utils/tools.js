import path from 'path';
import { exec } from 'child_process';
export function isEmptyObject(obj){
    return Object.keys(obj).length === 0;
}
export function execSync(params) {
    return new Promise((resolve, reject) => {
        exec(params, (err, stdout, stderr) => {
            resolve({ err, stdout })
        });
    });
}
export function getcwd(params) {    
    return path.join(process.cwd(), params)
}