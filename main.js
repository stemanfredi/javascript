'use strict'

const createCodeBlock = (scriptName, codeElementId) => {
  const blockDiv = document.createElement('div')
  blockDiv.className = 'code-block'

  const button = document.createElement('button')
  button.className = 'run-button'

  // Set the text of the button to a play symbol (Unicode character U+25B6)
  // followed by an unbreakable space and the script name
  button.textContent = '\u25B6\u00A0' + scriptName
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

  // Create a new function from the fetched script content and assigns it to a
  // property of the window object named after the script
  window[scriptName] = new Function(data)
}

// This function runs a script whose name is given as an argument
window.runScript = scriptName => {
  window[scriptName]()
}

const mainContent = document.querySelector('main')

const scripts = [
  '00_synchronous_code.js',
  '01_asynchronous_code.js',
  '02_callbacks.js',
]

scripts.forEach((scriptName, index) => {
  const codeElementId = 'code' + index
  const codeBlock = createCodeBlock(scriptName, codeElementId)
  mainContent.appendChild(codeBlock)
  fetchAndShowScript(scriptName, codeElementId)
})
