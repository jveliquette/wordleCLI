import fs from 'fs';
export function readFile(path) {
    return fs.readFileSync(path, 'utf-8');
}
export function writeFile(path, contents) {
    if (typeof contents === 'string') {
        fs.writeFileSync(path, contents);
    }
    else {
        // deal with other types
    }
}
export function deleteFile(path) {
    console.log('calling delete');
    fs.rmSync(path, { force: true });
}
//# sourceMappingURL=file-utils.js.map