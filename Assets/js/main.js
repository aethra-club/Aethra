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
    const scrollY = window.scrollY

    if (scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    const toTopBtn = document.getElementById('back-to-top')
    if (toTopBtn) {
      if (scrollY > 300) {
        toTopBtn.classList.add('is-visible')
      } else {
        toTopBtn.classList.remove('is-visible')
      }
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

    toggle.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleMenu()
    })

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")
        if (href && href.startsWith("#")) {
          e.preventDefault()
          const targetId = href.substring(1)
          const targetElement = targetId ? document.getElementById(targetId) : document.body

          if (targetElement) {

            const headerHeight = header.offsetHeight
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
            
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            })
          }
        }
        if (header.classList.contains("nav-open")) {
          toggleMenu()
        }
      })
    })

    document.addEventListener("click", (e) => {
      if (header.classList.contains("nav-open") && !header.contains(e.target)) {
        toggleMenu()
      }
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
  
  const emailInput = form.querySelector('input[type="email"]')
  const email = emailInput?.value.trim()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {

    const errorMsg = document.createElement("p")
    errorMsg.textContent = "Please enter a valid email address."
    errorMsg.style.color = "#ff4444"
    errorMsg.style.margin = "10px 0 0 0"
    errorMsg.classList.add("error-message")

    const existingError = form.querySelector(".error-message")
    if (existingError) existingError.remove()
    
    form.appendChild(errorMsg)
    emailInput?.focus()

    setTimeout(() => errorMsg.remove(), 3000)
    return
  }

  const card = form.closest(".connect-card")
  const successMsg = document.createElement("p")
  successMsg.textContent = "Thank you! We'll be in touch."
  successMsg.style.margin = "0"
  successMsg.style.color = "#39FF14"
  card.appendChild(successMsg)
  form.remove()

})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered.'))
      .catch(err => console.error('Service Worker registration failed:', err))
  })
}

;(() => {
  const hero = document.querySelector('.hero')
  const heroBackdrop = document.getElementById('hero-backdrop')
  
  if (!hero || !heroBackdrop) return
  
  let mouseX = 0, mouseY = 0
  let currentX = 0, currentY = 0
  
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect()
    mouseX = (e.clientX - rect.left) / rect.width - 0.5
    mouseY = (e.clientY - rect.top) / rect.height - 0.5
  })
  
  function animate() {

    currentX += (mouseX - currentX) * 0.05
    currentY += (mouseY - currentY) * 0.05
    
    heroBackdrop.style.transform = `translate(${currentX * 30}px, ${currentY * 30}px)`
    
    requestAnimationFrame(animate)
  }
  
  animate()
})()

;(() => {
  const heroDesc = document.querySelector('.hero__desc')
  if (!heroDesc) return

  const lines = heroDesc.innerHTML.split('<br>')
  heroDesc.innerHTML = ''
  
  lines.forEach((line, index) => {
    const span = document.createElement('span')
    span.innerHTML = line
    span.style.display = 'block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(20px)'
    span.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`
    heroDesc.appendChild(span)
    
    if (index < lines.length - 1) {
      heroDesc.appendChild(document.createElement('br'))
    }
  })

  if (!document.getElementById('hero-animations')) {
    const style = document.createElement('style')
    style.id = 'hero-animations'
    style.textContent = `
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)
  }
})()

;(() => {
  const buttons = document.querySelectorAll('.btn')
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 20px;
        height: 20px;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `
      
      this.appendChild(ripple)
      
      setTimeout(() => ripple.remove(), 600)
    })
  })

  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style')
    style.id = 'ripple-styles'
    style.textContent = `
      @keyframes rippleEffect {
        to {
          transform: translate(-50%, -50%) scale(20);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
})()

;(() => {
  const cards = document.querySelectorAll('.event-card, .util-card, .connect-card, .counter-card')
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.1s ease'
    })
    
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`
    })
    
    card.addEventListener('mouseleave', function() {
      this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      this.style.transform = ''
    })
  })
})()

;(() => {
  const backToTop = document.getElementById('back-to-top')
  if (!backToTop) return
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault()
    
    const scrollDuration = 800
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  })
})()

;(() => {
  const lists = document.querySelectorAll('.bullets, .aethra-footer__list')
  
  lists.forEach(list => {
    const items = list.querySelectorAll('li')
    
    items.forEach((item, index) => {
      item.style.opacity = '0'
      item.style.transform = 'translateX(-20px)'
      item.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
    })
  })
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li')
        items.forEach(item => {
          item.style.opacity = '1'
          item.style.transform = 'translateX(0)'
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  
  lists.forEach(list => observer.observe(list))
})()

;(() => {
  const progressBar = document.createElement('div')
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-violet), var(--accent-blue));
    z-index: 9999;
    transition: width 0.3s ease;
    width: 0;
  `
  document.body.appendChild(progressBar)
  
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 30
    if (progress > 90) progress = 90
    progressBar.style.width = progress + '%'
  }, 200)
  
  window.addEventListener('load', () => {
    clearInterval(interval)
    progressBar.style.width = '100%'
    setTimeout(() => {
      progressBar.style.opacity = '0'
      setTimeout(() => progressBar.remove(), 300)
    }, 200)
  })
})()
