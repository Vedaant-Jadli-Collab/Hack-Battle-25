// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link on mobile
document.querySelectorAll('nav ul.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

// PDF.js for PDF extraction and simple summary creation
const pdfInput = document.getElementById('pdfInput');
const summarizeBtn = document.getElementById('summarizeBtn');
const extractedTextArea = document.getElementById('extractedText');
const summaryTextArea = document.getElementById('summaryText');

summarizeBtn.addEventListener('click', () => {
  const file = pdfInput.files[0];
  if (!file) {
    alert('Please select a PDF file first.');
    return;
  }

  extractedTextArea.value = '';
  summaryTextArea.value = 'Summarizing...';

  const fileReader = new FileReader();

  fileReader.onload = function () {
    const typedarray = new Uint8Array(this.result);

    pdfjsLib.getDocument(typedarray).promise.then(pdf => {
      let maxPages = pdf.numPages;
      let countPromises = [];

      for (let j = 1; j <= maxPages; j++) {
        let page = pdf.getPage(j);

        countPromises.push(page.then(function (page) {
          return page.getTextContent().then(function (textContent) {
            return textContent.items.map(item => item.str).join(' ');
          });
        }));
      }

      Promise.all(countPromises).then(texts => {
        const fullText = texts.join('\n\n');
        extractedTextArea.value = fullText;
        summaryTextArea.value = simpleSummarize(fullText);
      });
    });
  };

  fileReader.readAsArrayBuffer(file);
});

// Simple summary function: returns first 3 sentences
function simpleSummarize(text) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
  if (!sentences) return 'No summary available.';
  return sentences.slice(0, 3).join(' ');
}
