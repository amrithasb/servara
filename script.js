const downloads = {
  mac: 'https://github.com/amrithasb/servara/releases/download/v1.0.0/Servara-1.0.0-macOS-arm64.zip',
  windows:
    'https://github.com/amrithasb/servara/releases/download/v1.0.0/Servara-1.0.0-Windows-x64-portable.zip',
}

const header = document.querySelector('[data-header]')
const menuButton = document.querySelector('.menu-button')
const siteNavigation = document.querySelector('#site-nav')
const installDialog = document.querySelector('[data-install-dialog]')

const detectedPlatform = /Windows/i.test(navigator.userAgent) ? 'windows' : 'mac'
document.querySelector(`[data-platform-card="${detectedPlatform}"]`)?.classList.add('detected')

window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), {
  passive: true,
})
header?.classList.toggle('scrolled', window.scrollY > 24)

menuButton?.addEventListener('click', () => {
  const open = !siteNavigation.classList.contains('open')
  siteNavigation.classList.toggle('open', open)
  menuButton.setAttribute('aria-expanded', String(open))
})
siteNavigation?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return
  siteNavigation.classList.remove('open')
  menuButton?.setAttribute('aria-expanded', 'false')
})

document.querySelectorAll('[data-download-direct]').forEach((link) => {
  const platform = link.dataset.platform === 'auto' ? detectedPlatform : link.dataset.platform
  link.href = downloads[platform]
  link.setAttribute('download', downloads[platform].split('/').pop())
})

document.querySelector('[data-install-open]')?.addEventListener('click', () => {
  installDialog.showModal()
  document.body.classList.add('dialog-open')
})
document
  .querySelector('[data-install-close]')
  ?.addEventListener('click', () => installDialog.close())

for (const dialog of [installDialog]) {
  dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'))
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect()
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close()
  })
}

document.querySelectorAll('[data-install-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.installTab
    document
      .querySelectorAll('[data-install-tab]')
      .forEach((item) => item.setAttribute('aria-selected', String(item === tab)))
    document.querySelectorAll('[data-install-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.installPanel !== selected
    })
  })
})

document.querySelectorAll('[data-copy-checksum]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.previousElementSibling.textContent.trim()
    try {
      await navigator.clipboard.writeText(value)
      button.textContent = 'Copied'
      window.setTimeout(() => (button.textContent = 'Copy'), 1600)
    } catch {
      button.textContent = 'Select text'
    }
  })
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    })
  },
  { threshold: 0.12 },
)
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear()
})
