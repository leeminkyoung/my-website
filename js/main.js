// 포트폴리오 메인 스크립트
// Figma 동기화 후 generated/structure.json을 기반으로 구성됩니다

// Nav scroll hide/show
const nav = document.querySelector('.nav')
let lastScrollY = 0

window.addEventListener('scroll', () => {
  const currentY = window.scrollY
  if (currentY > lastScrollY && currentY > 80) {
    nav.classList.add('nav--hidden')
  } else {
    nav.classList.remove('nav--hidden')
  }
  lastScrollY = currentY
}, { passive: true })

async function loadStructure() {
  try {
    const res = await fetch('./generated/structure.json')
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function init() {
  const structure = await loadStructure()
  if (structure) {
    console.log('Figma 구조 로드됨:', structure.fileName)
  }
}

init()
