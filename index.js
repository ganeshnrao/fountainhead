const fs = require('fs-extra')
const path = require('path')
const { parse, toHtml } = require('./parser')
const yargs = require('yargs')

const { sample } = yargs.options({
  sample: {
    alias: 's',
    choices: ['sample.theBigFish.fountain', 'sample.theSearcher.fountain'],
    description: 'specify the fountain file to render',
    default: 'sample.theBigFish.fountain'
  }
}).argv

const samplePath = path.resolve(__dirname, sample)
const htmlPath = path.resolve(__dirname, 'dist/index.html')
const jsonPath = path.resolve(__dirname, 'dist/parsed.json')

function main() {
  console.log(`Building ${sample}`)
  const outputDir = path.dirname(htmlPath)
  const fountainString = fs.readFileSync(samplePath, 'utf-8')
  const parsed = parse(fountainString, 'inline-notes')
  const html = toHtml(parsed)
  fs.ensureDirSync(outputDir)
  fs.writeFileSync(jsonPath, JSON.stringify(parsed, null, '  '))
  fs.writeFileSync(htmlPath, html)
}

main()
