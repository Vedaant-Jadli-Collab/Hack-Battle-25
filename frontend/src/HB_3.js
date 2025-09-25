const pdfInput = document.getElementById('pdfInput');
const summarizeBtn = document.getElementById('summarizeBtn');
const extractedTextArea = document.getElementById('extractedText');
const summaryTextArea = document.getElementById('summaryText');

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
