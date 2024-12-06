import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="contact-page__form">
        <h3 className="text-center text-white">
          Thank you for your message! We'll get back to you soon.
        </h3>
      </div>
    );
  }

  return (
    <div className="contact-page__form">
      <form
        onSubmit={handleSubmit}
        className="contact-page__main-form contact-form-validated"
        encType="multipart/form-data"
      >
        <Row>
          <Col xl={12}>
            <div className="contact-page__input-box">
              <input type="text" placeholder="Your name" name="name" required />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <div className="contact-page__input-box">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                required
              />
            </div>
          </Col>
          <Col xl={6}>
            <div className="contact-page__input-box">
              <input type="text" placeholder="Phone Number" name="phone" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <div className="contact-page__input-box">
              <input type="text" placeholder="Charity Name" name="subject" />
            </div>
          </Col>
          <Col xl={12}>
            <div className="contact-page__input-box">
              <textarea
                name="message"
                placeholder="Write description"
                required
              ></textarea>
            </div>
          </Col>
          <Col xl={12}>
            <div className="contact-page__input-box">
              <label className="thm-btn contact-page__file-btn">
                <input
                  type="file"
                  name="files"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                  className="contact-page__file-input"
                  onChange={(e) => {
                    const files = e.target.files;
                    const label = e.target.nextElementSibling;
                    if (files.length > 0) {
                      label.textContent = `${files.length} file(s) selected`;
                    } else {
                      label.textContent = 'Choose Files';
                    }
                  }}
                />
                <i className="fas fa-upload"></i>Choose Files
              </label>
            </div>
          </Col>
          <Col xl={12}>
            <button
              type="submit"
              className="thm-btn contact-page__btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <i className="fas fa-arrow-circle-right"></i>Send a Message
                </>
              )}
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default ContactForm;
