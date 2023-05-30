'use strict'

const createCodeBlock = (scriptName, codeElementId) => {
  const blockDiv = document.createElement('div')
  blockDiv.className = 'code-block'

  const button = document.createElement('button')
  button.textContent = `Run ${scriptName}`
  button.onclick = () => runScript(scriptName)
  blockDiv.appendChild(button)

  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.id = codeElementId
  code.className = 'language-javascript'
  pre.appendChild(code)
  blockDiv.appendChild(pre)

  return blockDiv
}

const fetchAndShowScript = async (scriptName, codeElementId) => {
  const response = await fetch(`./examples/${scriptName}`)
  const data = await response.text()

  const codeElement = document.getElementById(codeElementId)
  codeElement.textContent = data
  Prism.highlightElement(codeElement)
  window[scriptName] = new Function(data)
}

window.runScript = scriptName => {
  window[scriptName]()
}

const mainContent = document.querySelector('main')

const scripts = ['00_synchronous.js', 'script2.js']

scripts.forEach((scriptName, index) => {
  const codeElementId = `code${index + 1}`
  const codeBlock = createCodeBlock(scriptName, codeElementId)
  mainContent.appendChild(codeBlock)
  fetchAndShowScript(scriptName, codeElementId)
})
