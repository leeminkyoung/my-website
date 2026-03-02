// 케이스 스터디 페이지 비밀번호 게이트
// 사용법: 보호할 페이지의 <head>에 아래 추가
//   <meta name="gate-password" content="yourpassword" />
//   <meta name="gate-cover" content="images/your-cover.jpg" />  (선택)
//   <script src="js/password-gate.js"></script>

const meta = document.querySelector('meta[name="gate-password"]')
if (!meta) throw new Error('gate-password meta tag not found')

const CORRECT = meta.content
const SESSION_KEY = 'gate_' + location.pathname

function createGate() {
  const main = document.querySelector('main')
  if (main) main.hidden = true

  const coverMeta = document.querySelector('meta[name="gate-cover"]')
  const coverSrc = coverMeta ? coverMeta.content : ''

  const gate = document.createElement('section')
  gate.className = 'password-gate'
  gate.innerHTML = `
    <div class="password-gate__inner">
      <div class="password-gate__content">
        <h1 class="password-gate__title t-h1">This work is<br>password protected</h1>
        <p class="password-gate__desc t-body-2">To respect confidentiality, access to this page is restricted. Please enter the password to view this work. Get in touch if you'd like more information.</p>
        <div class="password-gate__field">
          <input type="password" class="password-gate__input" placeholder="Enter password here" autofocus />
          <button class="password-gate__btn" aria-label="Submit">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 7H17M10 1L17 7L10 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <p class="password-gate__error" hidden>Incorrect password. Try again.</p>
      </div>
      ${coverSrc ? `<div class="password-gate__img-wrap"><img src="${coverSrc}" alt="" class="password-gate__img" /></div>` : ''}
    </div>
  `

  const footer = document.querySelector('footer')
  document.body.insertBefore(gate, footer)

  const input = gate.querySelector('.password-gate__input')
  const btn = gate.querySelector('.password-gate__btn')
  const error = gate.querySelector('.password-gate__error')

  function attempt() {
    if (input.value === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, '1')
      gate.remove()
      if (main) main.hidden = false
    } else {
      error.hidden = false
      input.value = ''
      input.focus()
    }
  }

  btn.addEventListener('click', attempt)
  input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt() })
}

if (sessionStorage.getItem(SESSION_KEY) !== '1') {
  createGate()
}
