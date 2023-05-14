import {execa} from 'execa';

export default async function installDependencies(cwd, dependencies = [], manager = 'npm') {
  const command = dependencies.length > 0 
    ? manager === 'npm' ? `npm install ${dependencies.join(' ')}` : `yarn add ${dependencies.join(' ')}`
    : manager === 'npm' ? 'npm install' : 'yarn';

  const result = execa.command(command, { cwd });
  result.stdout.pipe(process.stdout);
  await result;
}
