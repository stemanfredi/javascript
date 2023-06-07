let a = 0
let b = 10

setTimeout(() => {
  a++
  setTimeout(() => {
    a++
    console.log('1 attempt: ' + a)
  }, 0)
}, 0)

setTimeout(() => {
  console.log('2 attempt: ' + a)
}, 0)

a = b
