import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';

import { promises as fsPromises } from 'node:fs';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'graceful-fs';
import SVGSpriter from 'svg-sprite';

const writeFile = promisify(fs.writeFile);

imagemin(['./src/img/**/*.png'], {
    plugins: [
        imageminPngquant(),
    ],
}).then(files => files
    .forEach(async v => {
        let source = path.parse(v.sourcePath);
        v.destinationPath = `${source.dir}/${source.name}.png`;

        await fsPromises.mkdir(path.dirname(v.destinationPath), { recursive: true });
        await writeFile(v.destinationPath, v.data);
    })
);

imagemin(['./src/img/**/*.png'], {
    plugins: [
        imageminWebp({ quality: 100 }),
    ],
}).then(files => files
    .forEach(async v => {
        let source = path.parse(v.sourcePath);
        v.destinationPath = `${source.dir}/${source.name}.webp`;

        await fsPromises.mkdir(path.dirname(v.destinationPath), { recursive: true });
        await writeFile(v.destinationPath, v.data);
    })
);

const config = {
    mode: {
        symbol: {
            inline: true,
        },
    },
};
const spriter = new SVGSpriter(config);
const svgs = fs.readdirSync('./src/img/svg')
    .filter(fileName =>
        fileName.endsWith('.svg')
        || fileName.endsWith('symbol.svg')
    );

for (const svg of svgs) {
    spriter.add('src/img/svg/' + svg, null, fs.readFileSync('src/img/svg/' + svg, 'utf-8'));
}

spriter.compile((error, result) => {
    for (const mode of Object.values(result)) {
        for (const resource of Object.values(mode)) {
            // TODO: разобраться с путем
            fs.writeFileSync(resource.path.replace('\\symbol\\', '/src/img/'), resource.contents);
        }
    }
});
