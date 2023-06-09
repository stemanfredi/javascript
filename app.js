'use strict'

const scripts = {
  'Asynchronous JS': [
    '00_synchronous_code.js',
    '01_asynchronous_code.js',
    '02_callbacks.js',
    '03_callbacks.js',
    '04_callback_hell.js',
  ],
  'Client-side storage': ['script1.js', 'script2.js'],
}

const topics = Object.keys(scripts)

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

const fetchAndShowScript = async (topic, scriptName, codeElementId) => {
  const response = await fetch(`./scripts/${topic}/${scriptName}`)
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

const buildMain = async topic => {
  const mainContent = document.getElementById('main-content')
  title.innerHTML = topic
  mainContent.innerHTML = ''
  scripts[topic].forEach((scriptName, index) => {
    const codeElementId = 'code' + index
    const codeBlock = createCodeBlock(scriptName, codeElementId)
    mainContent.appendChild(codeBlock)
    fetchAndShowScript(topic, scriptName, codeElementId)
  })
}

const buildNav = () => {
  const nav = document.querySelector('nav')
  topics.forEach(topic => {
    const link = document.createElement('a')
    link.textContent = topic
    link.href = '#'
    link.onclick = e => {
      e.preventDefault()
      // Clear active class from all nav links
      Array.from(nav.children).forEach(child =>
        child.classList.remove('active')
      )
      // Add active class to clicked link
      link.classList.add('active')
      buildMain(topic)
    }
    nav.appendChild(link)
  })
}

const menuButton = document.getElementById('menu-button')
const title = document.querySelector('h1')

buildNav()
buildMain(topics[0])

menuButton.onclick = e => {
  e.preventDefault()
  document.querySelector('nav').classList.toggle('show')
}
