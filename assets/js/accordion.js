document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle the 'faq-active' class and show/hide the content
    function toggleAccordion(faqItem) {
      var content = faqItem.querySelector('.faq-content');
      if (content.style.display === 'block') {
        content.style.display = 'none';
        faqItem.classList.remove('faq-active');
      } else {
        content.style.display = 'block';
        faqItem.classList.add('faq-active');
      }
    }
    
    // Detect screen size to enable accordion functionality for mobile
    function enableAccordionOnMobile() {
      return window.innerWidth <= 768;   // using 768px as the mobile breakpoint
    }
  
    // Select all FAQ items
    var faqs = document.querySelectorAll('.faq-item h3');
    faqs.forEach(function(faq) {
      faq.addEventListener('click', function(event) {
        // Check if we're on a mobile screen size
        if(enableAccordionOnMobile()) {
          toggleAccordion(event.currentTarget.parentNode); // Pass the .faq-item to the function
        }
      });
    });
  
    // Add window resize event listener to adapt the accordion to viewport changes
    window.addEventListener('resize', function() {
      // If we resize to a size larger than mobile, remove active classes and hide content
      if (!enableAccordionOnMobile()) {
        document.querySelectorAll('.faq-content').forEach(function(content) {
          content.style.display = 'none';
          content.parentNode.classList.remove('faq-active');
        });
      }
    });
  });
  
  