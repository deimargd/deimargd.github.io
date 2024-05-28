
document.addEventListener("DOMContentLoaded", function() {
  // Select required elements
  var faqSection = document.querySelector('.faq');
  var faqWrapper = document.querySelector('.faq-wrapper');
  var faqToggle = document.querySelector('.faq-wrapper-toggle');
  var faqTitle = document.querySelector('.faq-section-title');

  // Toggle function for entire FAQ section
  faqTitle.addEventListener('click', function() {
    faqWrapper.classList.toggle('faq-wrapper-active');
    faqToggle.classList.toggle('faq-wrapper-toggle-active');
  });

  // Handle individual FAQ item toggles
  var faqItems = document.querySelectorAll('.faq-item h3');
  faqItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var parent = item.parentNode;
      parent.classList.toggle('faq-active');
      
      var content = parent.querySelector('.faq-content');
      if (parent.classList.contains('faq-active')) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});

