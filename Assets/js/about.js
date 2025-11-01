;(() => {
  const header = document.querySelector(".aethra-nav")
  const toggle = document.querySelector(".aethra-nav__toggle")
  const menu = document.querySelector(".aethra-nav__menu")
  const links = document.querySelectorAll(".aethra-nav__link")

  if (!toggle || !menu || !header) return

  const toggleMenu = () => {
    const isOpen = header.classList.toggle("nav-open")
    toggle.setAttribute("aria-expanded", isOpen)
  }

  const closeMenu = () => {
    if (header.classList.contains("nav-open")) {
      header.classList.remove("nav-open")
      toggle.setAttribute("aria-expanded", "false")
    }
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleMenu()
  })

  links.forEach((link) => {
    link.addEventListener("click", closeMenu)
  })

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu()
    }
  })

  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        closeMenu()
      }
    }, 250)
  })
})()
;(() => {
  const track = document.getElementById("trustedTrack")
  if (!track) return
  const items = Array.from(track.children)
  items.forEach((item) => {
    const clone = item.cloneNode(true)
    clone.setAttribute("aria-hidden", true)
    track.appendChild(clone)
  })
})()
;(() => {
  const backdrop = document.getElementById("hero-backdrop")
  if (!backdrop) return
  const isMobile = window.innerWidth <= 768
  const shapeCount = isMobile ? 8 : 15
  const colors = ["#5DA9E9", "#7C4DFF"]

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div")
    const isBack = Math.random() > 0.5
    shape.classList.add("hero-shape", isBack ? "back" : "fore")

    const size = Math.random() * (isBack ? 250 : 150) + (isBack ? 100 : 80)
    shape.style.width = `${size}px`
    shape.style.height = `${size}px`
    shape.style.top = `${Math.random() * 100}%`
    shape.style.left = `${Math.random() * 100}%`
    shape.style.color = colors[Math.floor(Math.random() * colors.length)]
    shape.style.filter = `blur(${Math.random() * 30 + 40}px)`
    shape.style.animationDelay = `${Math.random() * 20}s`

    backdrop.appendChild(shape)
  }
})()
;(() => {
  const animatedTitles = document.querySelectorAll(".section__title")
  if (!animatedTitles.length) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )
  animatedTitles.forEach((title) => observer.observe(title))
})()
;(() => {
  const quoteEls = document.querySelectorAll(".quote--animated blockquote")
  if (!quoteEls.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll("span")
          spans.forEach((span) => (span.style.opacity = "1"))
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.8 },
  )

  quoteEls.forEach((quoteEl) => {
    const text = quoteEl.textContent.trim()
    const words = text.split(" ")
    quoteEl.textContent = ""
    words.forEach((word, i) => {
      const span = document.createElement("span")
      span.textContent = word + " "
      span.style.transitionDelay = `${i * 0.05}s`
      quoteEl.appendChild(span)
    })
    observer.observe(quoteEl)
  })
})()

document.addEventListener("submit", (e) => {
  const form = e.target.closest(".connect-form")
  if (!form) return
  e.preventDefault()
  const card = form.closest(".connect-card")
  const ok = document.createElement("p")
  ok.textContent = "Thank you! We’ll be in touch."
  ok.style.margin = "0"
  card.appendChild(ok)
  form.remove()
})
