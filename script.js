/* ============================= LANGUAGE TOGGLE ============================= */
const translations = {
  en: {
    nav_logo: 'Haithem',
    nav_home: 'Home',
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    hero_greeting: "Hello, I'm",
    hero_title: 'Web Developer & Freelancer',
    hero_desc: 'I build modern, responsive websites and web applications with clean code and great design.',
    hero_btn_work: 'View My Work',
    hero_btn_contact: 'Contact Me',
    about_title: 'About Me',
    about_p1: "I'm a passionate web developer with experience in building modern, responsive websites and web applications. I enjoy turning complex problems into simple, beautiful, and intuitive designs.",
    about_p2: 'With a strong foundation in front-end technologies and a keen eye for design, I strive to create digital experiences that make a difference.',
    skills_title: 'My Skills',
    projects_title: 'My Projects',
    proj1_title: 'React Dashboard',
    proj1_desc: 'Interactive admin dashboard built with React, Recharts, and Tailwind CSS.',
    proj2_title: 'Python Automation Tool',
    proj2_desc: 'Data analysis pipeline with Pandas, charts, and polished Excel reports.',
    proj3_title: 'Multi-Lang Template',
    proj3_desc: 'Premium multi-language website template with RTL/LTR support.',
    proj4_title: 'Admin Dashboard (Vanilla)',
    proj4_desc: 'Full-featured admin dashboard with Chart.js and glassmorphism.',
    contact_title: 'Get In Touch',
    form_name: 'Your Name',
    form_email: 'Your Email',
    form_subject: 'Subject',
    form_message: 'Your Message',
    form_send: 'Send Message',
    footer_rights: 'All rights reserved.',
  },
  ar: {
    nav_logo: 'هيثم',
    nav_home: 'الرئيسية',
    nav_about: 'عنّي',
    nav_skills: 'المهارات',
    nav_projects: 'المشاريع',
    nav_contact: 'اتصل بي',
    hero_greeting: 'مرحباً، أنا',
    hero_title: 'مطور ويب ومستقل',
    hero_desc: 'أبني مواقع وتطبيقات ويب حديثة ومتجاوبة بكود نظيف وتصميم رائع.',
    hero_btn_work: 'مشاريعي',
    hero_btn_contact: 'اتصل بي',
    about_title: 'عنّي',
    about_p1: 'أنا مطور ويب شغوف، لدي خبرة في بناء مواقع وتطبيقات ويب حديثة ومتجاوبة. أستمتع بتحويل المشاكل المعقدة إلى تصاميم بسيطة وجميلة وبديهية.',
    about_p2: 'بفضل أساس قوي في تقنيات الواجهة الأمامية وعين حريصة على التصميم، أسعى لخلق تجارب رقمية تُحدث فرقاً.',
    skills_title: 'مهاراتي',
    projects_title: 'مشاريعي',
    proj1_title: 'React Dashboard',
    proj1_desc: 'لوحة تحكم إدارية تفاعلية بـ React و Recharts و Tailwind.',
    proj2_title: 'Python Automation Tool',
    proj2_desc: 'خط أنابيب لتحليل البيانات بـ Pandas ورسوم بيانية وتقارير Excel.',
    proj3_title: 'قالب متعدد اللغات',
    proj3_desc: 'قالب موقع احترافي متعدد اللغات مع دعم RTL/LTR.',
    proj4_title: 'لوحة تحكم (Vanilla)',
    proj4_desc: 'لوحة تحكم كاملة بـ Chart.js وتصميم زجاجي عصري.',
    contact_title: 'تواصل معي',
    form_name: 'اسمك',
    form_email: 'بريدك الإلكتروني',
    form_subject: 'الموضوع',
    form_message: 'رسالتك',
    form_send: 'إرسال الرسالة',
    footer_rights: 'جميع الحقوق محفوظة.',
  },
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langLabel').textContent = lang === 'ar' ? 'EN' : 'AR';
}

document.getElementById('langToggle')?.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

setLanguage(currentLang);

/* ============================= HAMBURGER ============================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
  hamburger?.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    hamburger?.classList.remove('active');
  });
});

/* ============================= CONTACT FORM ============================= */
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent ✓';
      form.reset();
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.innerHTML = '<i class="fas fa-times"></i> Error — try again';
  }

  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
  }, 3000);
});

/* ============================= SCROLL REVEAL ============================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('section > .container > *').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

/* ============================= SMOOTH SCROLL ============================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
