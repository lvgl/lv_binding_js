const fs = require('fs')
const path = require('path')
const assert = require('assert')

const content = '{"url":"https://www.google.com","data":88,"status":"ok"}'
const filePath = path.resolve(__dirname, 'file.json')
function test1 () {
    fs.writeFileSync(filePath, content)
    const data = fs.readFileSync(filePath)
    assert.equal(data, content)
}

async function test2 () {
    await fs.writeFile(filePath, content)
    const data = await fs.readFile(filePath)
    assert.equal(data, content)
}

function test3 () {
    const data = fs.readFileSync(path.join(__dirname, './01d.png'), { encoding: 'binary' })
    fs.writeFileSync(path.join(__dirname, './01d_copy.png'), data)
}

async function test4 () {
    await fs.unlink(path.join(__dirname, './01d_copy.png'))
}

function test5 () {
    test3()
    fs.unlinkSync(path.join(__dirname, './01d_copy.png'))
}

async function test () {
    test1()
    await test2()
    test3()
    await test4()
    test5()
}

try {
    test()
} catch (e) {
    console.log(e)
}