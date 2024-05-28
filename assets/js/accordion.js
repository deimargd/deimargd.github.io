  document.addEventListener("DOMContentLoaded", function() {
    var faqSection = document.querySelector('.faq');
    var faqWrapper = document.querySelector('.faq-wrapper');
    var faqToggle = document.createElement('i');
    faqToggle.classList.add('faq-wrapper-toggle', 'bi', 'bi-chevron-down');
    
    document.querySelector('.faq-section-title').appendChild(faqToggle);
    
    document.querySelector('.faq-section-title').addEventListener('click', function() {
      faqWrapper.classList.toggle('faq-wrapper-active');
      faqToggle.classList.toggle('faq-wrapper-toggle-active');
    });

    // Handle individual FAQ accordion functionality
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
      item.addEventListener('click', function() {
        item.classList.toggle('faq-active');
      });
    });
  });

