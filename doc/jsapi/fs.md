# Enables interacting with the file system

like nodejs, we can use by const fs = require('fs'), most file system operations have synchronous and promise-based forms

## Api
fs module with following function
- statSync(path: string): statobj
- stat(path: string): Promise<statObj>
- realpath (path: string): Promise<string>
- realPathSync(path: string): string
- readFile(path: string): Promise<Buffer | string>
- readFileSync(path: string): Buffer | string
- writeFile(path: string, data: string | buffer): Promise<void>
- writeFileSync(path: string, data: string | buffer): void
- unlink (path: string): Promise<void>
- unlinkSync(path: string): void
- mkdir (path: string): Promise<void>
- mkdirSync (path: string): void

<br />

statobj obj with following property

- isFile(): bool
- isDirectory(): bool
- isCharacterDevice(): bool
- isBlockDevice(): bool
- isFIFO(): bool
- isSocket(): bool
- isSymbolicLink(): bool
- dev
- info
- mode
- nlink
- uid
- gid
- rdev
- size
- blocks
- atime
- mtime
- ctime
- size


