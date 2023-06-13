const asyncFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('asyncFunction has resolved.')
    }, 2000)
  })
}

const asyncFunction2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('asyncFunction2 is done.')
    }, 1000)
  })
}

let promise = asyncFunction()

let promise2 = promise.then(val => {
  console.log('First promise: ' + val)
  return asyncFunction2()
})

promise2.then(val => {
  console.log('Second promise: ' + val)
})

// Better way:
asyncFunction()
  .then(val => {
    console.log('First promise: ' + val)
    return asyncFunction2()
  })
  .then(val => {
    console.log('Second promise: ' + val)
  })

console.log('The code is asynchronous.')
