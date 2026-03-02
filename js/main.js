// 포트폴리오 메인 스크립트
// Figma 동기화 후 generated/structure.json을 기반으로 구성됩니다

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
