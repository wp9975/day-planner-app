import html2pdf from 'html2pdf.js';

export const printPdf = () => {
    const input = document.getElementById('pdfContent');
    html2pdf().from(input).save();
}



