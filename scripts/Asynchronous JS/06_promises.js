const apiURL = 'https://jsonplaceholder.typicode.com/posts'

fetch(apiURL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    console.log(data[0])
  })
  .catch(error => {
    console.log('An error occurred: ', error)
  })
