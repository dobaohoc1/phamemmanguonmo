const ejs = require('ejs');
const fs = require('fs');
const path = require('path');


function render_ejs_template(response, pathFile, parameters) {
  const viewsDir = path.join(__dirname, '../views');
  const template = ejs.compile(fs.readFileSync(path.join(viewsDir, pathFile), 'utf8'), {
    views: viewsDir,
    filename: path.join(viewsDir, pathFile),
  });
  const html = template(parameters);
  return response.type('html').send(html);
}

exports.ejsRender = (request, response, next) => {
  response.render = (path, parameters) => render_ejs_template(response, path, parameters);
  next();
};
