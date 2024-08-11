import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EmailSend = () => {
  const [emailData, setEmailData] = useState({
    to_email: '',
    from_name: '',
    message: ''
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3nly80t', 'template_ocdzbuo', e.target, 'hyD3mCfLqHtv7AFRu')
      .then((result) => {
        console.log(result.text);
        alert('Email sent successfully!');
        setEmailData({ to_email: '', from_name: '', message: '' }); // Clear form after successful submission
      }, (error) => {
        console.log(error.text);
        alert('Failed to send email.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="to_email"
        placeholder="Recipient email"
        value={emailData.to_email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="from_name"
        placeholder="Your name"
        value={emailData.from_name}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={emailData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailSend;
