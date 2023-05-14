import fs from 'fs-extra';
import Handlebars from 'handlebars';
export default function modifyTemplate(templatePath, data) {
  try {
    const pkgPath = `${templatePath}/package.json`;
    const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
    const template = Handlebars.compile(pkgContent);
    const newPkgContent = template(data);
    fs.writeFileSync(pkgPath, newPkgContent);
    return true;
  } catch (error) {
    console.error('Failed to modify template:', error);
    return false;
  }
}
