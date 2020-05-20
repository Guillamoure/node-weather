console.log("Client side javascript file is loaded.")
const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  runFetch(input.value)
})

const runFetch = (location) => {
  messageOne.textContent = "Loading..."
  messageTwo.textContent = ''
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(r => r.json())
    .then(data => {
      if (data.error){
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
}
