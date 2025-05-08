const formDOM = document.querySelector('.form')
const nameInputDOM = document.querySelector('.name-input')
const emailInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')
const toggleModeDOM = document.querySelector('.toggle-mode')

let isLoginMode = true // default mode

// toggle mode
toggleModeDOM.addEventListener('click', () => {
  isLoginMode = !isLoginMode
  if (isLoginMode) {
    toggleModeDOM.textContent = "Don't have an account? Sign up"
  } else {
    toggleModeDOM.textContent = "Already have an account? Log in"
  }
})

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  formAlertDOM.classList.remove('text-success')
  tokenDOM.classList.remove('text-success')

  const email = emailInputDOM.value
  const password = passwordInputDOM.value
  const name = nameInputDOM.value

  const endpoint = isLoginMode ? '/api/v1/login' : '/api/v1/signup'
  const payload = isLoginMode ? { email, password } : { name, email, password }

  try {
    const { data } = await axios.post(endpoint, payload)

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = data.msg

    formAlertDOM.classList.add('text-success')
    nameInputDOM.value = ''
    passwordInputDOM.value = ''

    localStorage.setItem('token', data.token)
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.response.data.msg
    localStorage.removeItem('token')
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'no token present'
    tokenDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)
})

btnDOM.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get('/api/v1/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

    data.secret
  } catch (error) {
    localStorage.removeItem('token')
    resultDOM.innerHTML = `<p>${error?.response?.data?.msg || 'Access Denied'}</p>`
  }
})

const checkToken = () => {
  tokenDOM.classList.remove('text-success')

  const token = localStorage.getItem('token')
  if (token) {
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  }
}
checkToken()
