import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

const NotificationModal = ({ show, title, message, onClose, transactionData }) => {
  const handleDownloadPDF = () => {
    if (!transactionData) return;
    
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80); // Dark blue header
    doc.text('ResCharity', 105, 20, { align: 'center' });
    
    // Add title
    doc.setFontSize(16);
    doc.text('Transaction Receipt', 105, 35, { align: 'center' });
    
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);
    
    // Add content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const contentLines = [
      ['Date:', transactionData.date],
      ['Transaction ID:', transactionData.transactionId],
      ['Amount:', `$${transactionData.amount}`],
      ['Recipient:', transactionData.recipient],
      ['Status:', transactionData.status]
    ];

    let yPos = 55;
    contentLines.forEach(([label, value]) => {
      doc.setFont(undefined, 'bold');
      doc.text(label, 20, yPos);
      doc.setFont(undefined, 'normal');
      doc.text(value, 60, yPos);
      yPos += 10;
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    const footerText = 'Thank you for your contribution to ResCharity';
    doc.text(footerText, 105, 280, { align: 'center' });

    // Save the PDF
    const fileName = `ResCharity-Receipt-${transactionData.transactionId.slice(0, 8)}.pdf`;
    doc.save(fileName);
  };

  return (
    <Modal show={show} onHide={onClose} centered className="custom-modal">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        {title === "Success" ? (
          <div>
            <p style={{ whiteSpace: 'pre-line' }}>
              <i className="fas fa-check-circle text-success me-2" style={{ fontSize: '32px' }}></i>
              <span style={{ fontSize: '24px', fontWeight: '500' }}>Thank you for your contribution!</span>
              {"\n\n"}Transaction ID:{"\n"}{message.split("\n").pop()}
            </p>
          </div>
        ) : (
          <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
        )}
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        {title === "Success" && (
          <Button variant="secondary" onClick={handleDownloadPDF} className="me-2">
            Download Receipt
          </Button>
        )}
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;