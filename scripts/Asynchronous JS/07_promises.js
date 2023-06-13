const url = 'https://api.spacexdata.com/v4'

const result = fetch(`${url}/launches/latest`, { method: 'get' })
  .then(response => response.json()) // pass the data as promise to next then block
  .then(data => {
    const rocketId = data.rocket
    console.log(rocketId, '\n')
    return fetch(`${url}/rockets/${rocketId}`) // make a 2nd request and return a promise
  })
  .then(response => response.json())
  .catch(err => {
    console.error('Request failed', err)
  })

// I'm using the result const to show that you can continue to extend the chain from the returned promise
result.then(r => {
  console.log(r.first_stage) // 2nd request result first_stage property
})
