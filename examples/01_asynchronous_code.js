'use strict'

const test = () => {
  // The setTimeout() function takes two arguments: a callback function, and
  // the delay (in milliseconds) after which the function should be executed.
  // It does not block the rest of the code from executing.
  setTimeout(() => {
    console.log('Start of code')
    alert('Notice me!')
    console.log('End of code')
  }, 1000)
}

const test2 = () => {
  console.log('Now I get attention')
}

test()
test2()
