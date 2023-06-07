let students = [
  { name: 'Mary', score: 90, school: 'East' },
  { name: 'James', score: 100, school: 'East' },
  { name: 'Steve', score: 40, school: 'East' },
  { name: 'Gabe', score: 90, school: 'West' },
  { name: 'Rachel', score: 85, school: 'East' },
  { name: 'Rochelle', score: 95, school: 'West' },
  { name: 'Lynette', score: 75, school: 'East' },
]

// It does not take advantage of the event loop: it is not asynchronous
const processStudents = (data, callback) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].school.toLowerCase() === 'east') {
      if (typeof callback === 'function') {
        callback(data[i])
      }
    }
  }
}

const determineTotal = () => {
  let total = 0
  let count = 0

  processStudents(students, obj => {
    total += obj.score
    count++
  })
  console.log(`Total score: ${total} - Total count: ${count}`)
}

console.log('One')

// When a function is followed by parenthesis it is executed immediately
setTimeout(determineTotal(), 0)

console.log('Two')

setTimeout(determineTotal, 0)

console.log('Tree')
