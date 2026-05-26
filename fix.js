const fs = require('fs');
let css = fs.readFileSync('extensions/testicraft-widget/assets/widget.css', 'utf8');

// Fix the empty line-clamps
css = css.replace(/-webkit-line-clamp:\s*;/g, '-webkit-line-clamp: 3;');
css = css.replace(/line-clamp:\s*;(.*?)/g, 'line-clamp: 3;$1');

css = css.replace(/-webkit-mask-image:\s*;/g, '-webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);');
css = css.replace(/mask-image:\s*;/g, 'mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);');

css = css.replace(/-webkit-mask:\s*;/g, '-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);');
css = css.replace(/mask:\s*;/g, 'mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);');

css = css.replace(/-webkit-mask-composite:\s*;/g, '-webkit-mask-composite: xor;');
css = css.replace(/mask-composite: exclude;/g, 'mask-composite: exclude;');

fs.writeFileSync('extensions/testicraft-widget/assets/widget.css', css);
