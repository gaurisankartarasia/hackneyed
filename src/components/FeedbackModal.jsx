

import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const FeedbackModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let emailToSend = '';
    let subject = ''; 

    switch (selectedOption) {
      case 'links':
        emailToSend = 'vivekachooz@gmail.com';
        subject = 'FEEDBACK: Links not working'; // Subject for links feedback
        break;
      case 'bugs':
        emailToSend = 'gaurisankar.work@gmail.com, vivekachooz@gmail.com';
        subject = 'FEEDBACK: Bugs found in site'; // Subject for bugs feedback
        break;
      case 'others':
        emailToSend = 'vivekachooz@gmail.com';
        subject = 'FEEDBACK'; 
        break;
      default:
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const message = formData.get('message');
    
    window.location.href = `mailto:${emailToSend}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modalContent bg-gray-800 rounded-3xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 p-3 h-10 w-10 bg-gray-600 rounded-full hover:bg-gray-700 active:bg-gray-900 transition-colors duration-300"
          onClick={onClose}
        >
          <IoMdClose/>
        </button>
        <h2 className="text-xl font-semibold mb-4">Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="feedback-type"
                value="links"
                onChange={(e) => setSelectedOption(e.target.value)}
                required
                className="form-radio"
              />
              <span>Links not working</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="feedback-type"
                value="bugs"
                onChange={(e) => setSelectedOption(e.target.value)}
                required
                className="form-radio"
              />
              <span>Bugs found in site</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="feedback-type"
                value="others"
                onChange={(e) => setSelectedOption(e.target.value)}
                required
                className="form-radio"
              />
              <span>Others</span>
            </label>
          </div>
          <textarea
            name="message"
            rows="8"
            style={{ resize: 'none' }}
            placeholder="Enter your feedback here..."
            className="w-full rounded-3xl p-2 bg-gray-600"
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-gray-100 text-black py-2 rounded-3xl hover:bg-[#393f44] hover:text-white transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
