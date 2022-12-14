/* global hexo */

'use strict';

const points = require('../events/lib/injects-point');
const js = hexo.extend.helper.get('js').bind(hexo);

hexo.extend.filter.register(
  'theme_inject',
  (injects) => {
    const filePath = hexo.theme.config.custom_file_path;

    if (!filePath) return;

    points.views.forEach((key) => {
      if (filePath[key]) {
        injects[key].file('custom', filePath[key]);
      }
    });

    points.styles.forEach((key) => {
      if (filePath[key]) {
        injects[key].push(filePath[key]);
      }
    });
  },
  99
);

hexo.extend.injector.register('body_end', () => {
  return js('js/theme.js');
});
