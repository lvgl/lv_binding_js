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

async function test () {
    test1()

    await test2()
}

test()