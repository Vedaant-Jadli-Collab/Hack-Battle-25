const pdfInput = document.getElementById('pdfInput');
const summarizeBtn = document.getElementById('summarizeBtn');
const extractedTextArea = document.getElementById('extractedText');
const summaryTextArea = document.getElementById('summaryText');

const OPEN_AI_KEY = process.env.OPEN_AI_KEY; //set you key in environment
 
summarizeBtn.addEventListener('click', () => {
  if (!pdfInput.files.length) {
    alert('Please select a PDF file.');
    return;
  }

  const file = pdfInput.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const typedArray = new Uint8Array(reader.result);
    const pdf = await pdfjsLib.getDocument(typedArray).promise;
    let fullText = '';
    const maxPages = Math.min(pdf.numPages, 5);

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    extractedTextArea.value = fullText;

    let sentences = fullText.match(/[^\.!\?]+[\.!\?]+/g);
    if (!sentences) {
      summaryTextArea.value = "Summary not available.";
      return;
    }
    summaryTextArea.value = sentences.slice(0, 3).join(' ').trim();
  };

  reader.readAsArrayBuffer(file);
});
const calcDisplay = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.calc-btn');
const clearBtn = document.getElementById('clear-btn');
const equalsBtn = document.getElementById('equals-btn');

calcButtons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.getAttribute('data-value');

    if (!button.id) {
      if (calcDisplay.value === '0' && val !== '.') {
        calcDisplay.value = val;
      } else {
        calcDisplay.value += val;
      }
    }
  });
});

clearBtn.addEventListener('click', () => {
  calcDisplay.value = '';
});

equalsBtn.addEventListener('click', () => {
  try {
    const result = eval(calcDisplay.value);
    calcDisplay.value = result !== undefined ? result : '';
  } catch {
    calcDisplay.value = 'Error';
  }
});
