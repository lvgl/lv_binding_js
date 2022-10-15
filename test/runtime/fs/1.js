const fs = require('fs')
const path = require('path')
const assert = require('assert')

const content = '{"url":"https://www.google.com","data":88,"status":"ok"}'
const filePath = path.resolve(__dirname, 'file.json')

function readWriteStrUnlinkSync () {
    console.log('readWriteStrUnlinkSync start')

    fs.writeFileSync(filePath, content)
    const data = fs.readFileSync(filePath)
    assert.equal(data, content)
    fs.unlinkSync(filePath)

    const stat = fs.statSync(filePath)
    assert.equal(stat.isFile(), false)
}

async function readWriteStrUnlinkAsync () {
    console.log('readWriteStrUnlinkAsync start')

    await fs.writeFile(filePath, content)
    const data = await fs.readFile(filePath)
    assert.equal(data, content)
    await fs.unlink(filePath)
    try {
        const stat = await fs.stat(filePath)
        assert.equal(stat.isFile(), false)
    } catch (e) {
        console.log(e)
    }
}

function readWriteBufferUnlinkSync () {
    console.log('readWriteBufferUnlinkSync start')

    const data = fs.readFileSync(path.join(__dirname, './01d.png'), { encoding: 'binary' })
    fs.writeFileSync(path.join(__dirname, './01d_copy.png'), data)

    let stat = fs.statSync(path.join(__dirname, './01d_copy.png'))
    assert.equal(stat.isFile(), true)

    fs.unlinkSync(path.join(__dirname, './01d_copy.png'))
    stat = fs.statSync(path.join(__dirname, './01d_copy.png'))
    assert.equal(stat.isFile(), false)
}

function mkdirSync () {
    console.log('mkdirSync start')

    const p = path.resolve(__dirname, './test_mkdir')
    fs.mkdirSync(p)
    const stat = fs.statSync(p)
    assert.equal(stat.isDirectory(), true)
    fs.rmdirSync(p)
}

async function mkdirAsync () {
    console.log('mkdirAsync start')

    const p = path.resolve(__dirname, './test_mkdir')
    await fs.mkdir(p)
    const stat = await fs.statSync(p)
    assert.equal(stat.isDirectory(), true)
    await fs.rmdir(p)
}

async function test () {
    try {
        // readWriteStrUnlinkSync()
        // await readWriteStrUnlinkAsync()
        // readWriteBufferUnlinkSync()

        mkdirSync()
        await mkdirAsync()
    } catch (e) {
        console.log(e)
    }
}

test()