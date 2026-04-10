import './style.css'

const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
const contactForm = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')

let scrollTimeout

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout)
  navbar.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open')
  navLinks.classList.toggle('open')
})

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open')
    navLinks.classList.remove('open')
  })
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

const sections = document.querySelectorAll('section[id]')
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]')

window.addEventListener('scroll', () => {
  let current = ''
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id
    }
  })
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  })
}, { passive: true })

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    btn.style.setProperty('--mouse-x', `${x}px`)
    btn.style.setProperty('--mouse-y', `${y}px`)
  })
})

document.querySelectorAll('.service-card, .highlight-card, .proficiency-card, .edu-card, .timeline-content').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
  })
})

document.querySelectorAll('.timeline-item').forEach((item, index) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          item.style.animation = 'fadeUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }, index * 100)
        observer.unobserve(item)
      }
    })
  }, { threshold: 0.2 })
  observer.observe(item)
})

document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.setProperty('--tag-scale', '1.08')
  })
  tag.addEventListener('mouseleave', function() {
    this.style.setProperty('--tag-scale', '1')
  })
})

const parallaxElements = document.querySelectorAll('[data-parallax]')
window.addEventListener('scroll', () => {
  parallaxElements.forEach(el => {
    const scrollPos = window.scrollY
    const offset = scrollPos * 0.5
    el.style.transform = `translateY(${offset}px)`
  })
}, { passive: true })

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = contactForm.querySelector('#fname').value.trim()
  const email = contactForm.querySelector('#femail').value.trim()
  const subject = contactForm.querySelector('#fsubject').value.trim()
  const message = contactForm.querySelector('#fmessage').value.trim()

  const mailto = `mailto:pmurali82@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
  window.location.href = mailto

  formSuccess.classList.add('show')
  contactForm.reset()
  setTimeout(() => formSuccess.classList.remove('show'), 5000)
})

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1'

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
})

window.addEventListener('load', () => {
  document.querySelectorAll('.fade-up').forEach((el, index) => {
    if (!el.classList.contains('visible')) {
      setTimeout(() => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        }
      }, index * 50)
    }
  })
})
