document.addEventListener("DOMContentLoaded", function() {
  // Function to toggle the 'faq-active' class and show/hide the content
  function toggleAccordion(faqItem) {
    var content = faqItem.querySelector('.faq-content');
    if (content.style.display === 'block') {
      content.style.display = 'none';
      faqItem.classList.remove('faq-active');
    } else {
      // This part ensures that only one FAQ can be expanded at a time on mobile
      document.querySelectorAll('.faq-container .faq-item').forEach(function(item) {
        item.classList.remove('faq-active');
        item.querySelector('.faq-content').style.display = 'none';
      });
      content.style.display = 'block';
      faqItem.classList.add('faq-active');
    }
  }

  // Function to check if we should display the accordion
  function isMobileView() {
    return window.innerWidth <= 768;
  }

  // Select all FAQ h3 elements
  var faqHeaders = document.querySelectorAll('.faq-container .faq-item h3');
  faqHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
      var faqItem = header.parentNode;
      if(isMobileView()) {
        // Pass the .faq-item to the toggleAccordion function
        toggleAccordion(faqItem);
      }
    });
  });

  // Optional: close all FAQ sections if the window is resized larger than mobile view
  window.addEventListener('resize', function() {
    if (!isMobileView()) {
      document.querySelectorAll('.faq-container .faq-item .faq-content').forEach(function(content) {
        content.style.display = 'none';
        content.parentNode.classList.remove('faq-active');
      });
    }
  });
});
