import fs from 'fs'

export function readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8')
}

export function writeFile<T>(path: string, contents: T): void {
    if (typeof contents === 'string') {
        fs.writeFileSync(path, contents)
    } else {
        // deal with other types
    }
}

export function deleteFile(path: string): void {
    console.log('calling delete')
    fs.rmSync(path, { force: true })
}
