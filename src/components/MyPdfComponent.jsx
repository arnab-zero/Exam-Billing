// MyPdfComponent.jsx
import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import kalpurushFont from '../../public/kalpurush.ttf'; // Import the Bangla font
import BillBody from './BillBody';
import BillHeading from './BillHeading';
import BiilFooter from './BiilFooter';

const MyPdfComponent = () => {
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace('Kalpurush', `url(${kalpurushFont}) format('truetype')`);
      await font.load();
      document.fonts.add(font);
    };

    loadFont().catch((err) => console.error('Error loading font:', err));
  }, []);

  const generatePdf = () => {
    const input = document.getElementById('pdf-content');
    const options = {
      scale: 2, // Adjust this value to control the overall PDF resolution
      useCORS: true,
      windowWidth: 210 * 4.16667, // Convert mm to pixels (1mm = 4.16667px at 96 DPI)
      windowHeight: 297 * 4.16667, // Convert mm to pixels (1mm = 4.16667px at 96 DPI)
    };

    html2canvas(input, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('myPDF.pdf');
      })
      .catch((err) => console.error('Error generating PDF:', err));
  };

  return (
    <div>
      <div id="pdf-content" style={{ fontFamily: 'Kalpurush', fontSize: '12px', padding: '20mm' }}>
        <BillHeading />
        <BillBody />
        <BiilFooter />
      </div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default MyPdfComponent;
