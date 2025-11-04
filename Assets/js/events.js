

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const eventsTabs = document.querySelectorAll(".events-category")

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab")

      tabButtons.forEach((b) => b.classList.remove("tab-btn--active"))
      eventsTabs.forEach((tab) => {
        tab.classList.add("hidden")
        const items = tab.querySelectorAll(".event-item, .workshop-item")
        items.forEach((item) => {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"
        })
      })

      btn.classList.add("tab-btn--active")
      const activeTab = document.getElementById(`${tabName}-tab`)
      if (activeTab) {
        activeTab.classList.remove("hidden")

        const items = activeTab.querySelectorAll(".event-item, .workshop-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out"
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, index * 80) // Stagger each card by 80ms
        })
      }
    })
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("category-header")) {
          entry.target.style.animation = "slideInUp 0.6s ease-out forwards"
        } else if (entry.target.classList.contains("event-item") || entry.target.classList.contains("workshop-item")) {
          entry.target.style.animation = "slideInUp 0.6s ease-out forwards"
        }
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".category-header, .event-item, .workshop-item").forEach((el) => {
    observer.observe(el)
  })

  document.querySelectorAll(".event-item, .workshop-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

const style = document.createElement("style")
style.innerHTML = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
document.head.appendChild(style)


