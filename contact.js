;(() => {
  window.addEventListener("load", () => {
    document.body.classList.add("page-loaded")
  })
})()
;(() => {
  const header = document.querySelector(".aethra-header")
  const toggle = document.querySelector(".aethra-header__toggle")
  const nav = document.querySelector(".aethra-header__nav")

  if (!header) return

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })
  handleScroll()

  if (toggle && nav) {
    const navLinks = document.querySelectorAll(".aethra-header__link, .aethra-header__brand")

    const toggleMenu = () => {
      const isOpen = header.classList.toggle("nav-open")
      toggle.setAttribute("aria-expanded", isOpen)
      document.body.style.overflow = isOpen ? "hidden" : ""
    }

    toggle.addEventListener("click", toggleMenu)

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")
        if (href && href.startsWith("#")) {
          e.preventDefault()
          const targetId = href.substring(1)
          const targetElement = targetId ? document.getElementById(targetId) : document.body

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" })
          }
        }
        if (header.classList.contains("nav-open")) {
          toggleMenu()
        }
      })
    })
  }
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
  const animatedElements = document.querySelectorAll(".section__title, .counters-grid")
  if (!animatedElements.length) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")

          if (entry.target.classList.contains("counters-grid")) {
            const counters = entry.target.querySelectorAll(".counter-card__number")
            counters.forEach((counter) => {
              const animate = () => {
                const target = +counter.getAttribute("data-target")
                const count = +counter.innerText.replace(/,/g, "")
                const increment = target / 200

                if (count < target) {
                  counter.innerText = Math.ceil(count + increment)
                  setTimeout(animate, 10)
                } else {
                  counter.innerText = target.toLocaleString()
                }
              }
              animate()
            })
          }
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  animatedElements.forEach((el) => observer.observe(el))
})()
;(() => {
  const sections = document.querySelectorAll(".animate-on-scroll")
  if (!sections.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target
          section.classList.add("is-visible")

          const children = section.querySelectorAll(":scope > *:not(.section__title)")

          if (section.id !== "quotes" && section.id !== "about") {
            children.forEach((child, i) => {
              if (
                child.matches(".about-split__grid") ||
                child.matches(".events__grid") ||
                child.matches(".connect__grid") ||
                child.matches(".join__container") ||
                child.matches(".vision__desc")
              ) {
                const subChildren = child.children
                Array.from(subChildren).forEach((subChild, j) => {
                  if (!subChild.matches(".join__roles") && !subChild.matches(".join__utils")) {
                    subChild.style.transitionDelay = `${j * 0.15}s`
                  }
                })
              } else {
                child.style.transitionDelay = `${i * 0.1}s`
              }
            })
          }

          if (section.id === "resources") {
            const joinRoles = section.querySelector(".join__roles")
            const joinUtils = section.querySelector(".join__utils")
            if (joinRoles) {
              Array.from(joinRoles.children).forEach((child, i) => {
                child.style.transitionDelay = `${0.3 + i * 0.1}s`
              })
            }
            if (joinUtils) {
              Array.from(joinUtils.children).forEach((child, i) => {
                child.style.transitionDelay = `${0.8 + i * 0.1}s`
              })
            }
          }

          if (section.id === "events") {
            const eventCards = section.querySelectorAll(".event-card")
            eventCards.forEach((card, i) => (card.style.transitionDelay = `${i * 0.15}s`))
          }

          observer.unobserve(section)
        }
      })
    },
    { threshold: 0.1 },
  )

  sections.forEach((el) => observer.observe(el))
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
  ok.textContent = "Thank you! We'll be in touch."
  ok.style.margin = "0"
  card.appendChild(ok)
  form.remove()
})
