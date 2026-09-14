/* ============================================================
iLink — About & Contact Form Script (about.js)
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
'use strict';

// --- 1. Mobile Menu Toggle ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
menuToggle.addEventListener('click', function () {
navLinks.classList.toggle('active');
});
}

// --- 2. Contact Form Handling with EmailJS ---
const contactForm = document.getElementById('contactForm') || document.querySelector('form');

if (contactForm) {
contactForm.addEventListener('submit', function (event) {
event.preventDefault();

const nameInput = contactForm.querySelector('input[name="name"]') || contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[name="email"]') || contactForm.querySelector('input[type="email"]');
const messageInput = contactForm.querySelector('textarea[name="message"]') || contactForm.querySelector('textarea');
const submitBtn = contactForm.querySelector('button[type="submit"]');

if (nameInput && nameInput.value.trim() === '') {
alert('Please enter your name.');
nameInput.focus();
return;
}

if (emailInput && (emailInput.value.trim() === '' || !emailInput.value.includes('@'))) {
alert('Please enter a valid email address.');
emailInput.focus();
return;
}

if (messageInput && messageInput.value.trim() === '') {
alert('Please enter your message.');
messageInput.focus();
return;
}

const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send';
if (submitBtn) {
submitBtn.disabled = true;
submitBtn.innerHTML = 'Sending...';
}

// Replace YOUR_SERVICE_ID with your actual EmailJS Service ID
const serviceID = 'service_ct93l4c';
const templateID = 'template_5euu0xa';

emailjs.sendForm(serviceID, templateID, contactForm)
.then(function () {
alert('Thank you! Your message has been sent successfully.');
contactForm.reset();
})
.catch(function (error) {
console.error('EmailJS Error:', error);
alert('Failed to send message. Please try again or contact us directly.');
})
.finally(function () {
if (submitBtn) {
submitBtn.disabled = false;
submitBtn.innerHTML = originalBtnText;
}
});
});
}
});

