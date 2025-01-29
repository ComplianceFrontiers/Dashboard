import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faHome, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'; // Add any icons you need

// Add icons to the library
library.add(faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin, faCoffee, faHome, faUser, faSearch);

interface chessclubemailProps {
  selectedRecords: { name: string; email: string; }[];
  onBack: () => void;
}

const chessclubemail = ({ selectedEmails, onClose }: { selectedEmails: string[]; onClose: () => void }) => {
  const router = useRouter();
  const [subject] = useState('Thursdays are Chess Days'); // Hardcoded subject
  const [displayname] = useState('Chess Champs'); 
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [apiLink, setApiLink] = useState('');

  const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #333;  text-align: center; display: block; margin: 0 auto; max-width: 800px;">
    
        <img src="https://res.cloudinary.com/dtgje24ez/image/upload/v1738124100/lrt4ul175g3wjllnbpmg.jpg" alt="Chess Champs Banner" style="max-width: 100%; height: auto;">
 
    
</div>

      
      <div style="color: white; padding: 0px; margin-top: 10px;">   
          <div style="background-color: #343a40; color: #fff; padding: 20px; border-radius: 5px 5px 0 0;">
              <h1 style="margin-bottom: 5px;color:white; font-size: 14px;">About Chess Champs</h1>
              <p style="margin-bottom: 0px; font-size:12px;">Chess Champs is dedicated to nurturing young minds through the timeless game of chess. We provide engaging programs, tournaments, and training sessions for players of all ages and skill levels. Our mission is to inspire critical thinking, strategic planning, and a love for learning in a supportive and fun environment.</p>
              <p style="margin-bottom: 0px; font-size:12px;">From beginner-friendly lessons to competitive tournaments, Chess Champs offers something for everyone, helping players build confidence, sharpen problem-solving skills, and foster a lifelong passion for chess.</p>
          </div>
          <div>
              <div style="background-color: #007BFF; padding: 10px; border-radius: 5px; text-align: center;">
                  <p  style="margin-bottom: 1px;color:white; font-size: 14px;"><strong>CHESS CHAMPS</strong></p>
                  <p style="margin: 10px; font-size: 10px;">
                      <a href="https://www.google.com/maps?q=510+Duncan+Rd,+Wilmington,+DE+19809" target="_blank" style="text-decoration: underline; font-size: 12px; color: #fff;">510 Duncan Rd</a> | 
                      <a href="tel:+13022764141" style="text-decoration: underline; font-size: 12px; color: #fff;">Wilmington, DE 19809</a> | 
                      <a href="tel:+13022764141" style="text-decoration: underline;font-size: 12px; color:#fff;">302-276-4141</a>
                  </p>
              
              
                <table align="center" style="margin: 1px auto; margin-bottom: 10px; margin-top: 20px;">
    <tr>
      <td style="text-align: center;">
        <a href="https://www.chesschamps.us/" style="display: inline-block; padding: 12px 20px; background-color: #f53db8; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 14px;">
          Visit Website
        </a>
      </td>
    </tr>
  </table></div>
          </div>
      </div>
    
      <p style="font-size: 14px; color: #666; text-align: center; margin-top:10px;">
  You are receiving this email because you signed up to receive updates and communications from 
  <a href="https://chesschamps.us" style="color: #f53db8; text-decoration: none;">Chess Champs</a>. 
  If you wish to stop receiving these emails, you can 
  <a href="https://chesschampsus.vercel.app/unsubscribe" style="color: #f53db8; text-decoration: none;">unsubscribe here</a>.
</p>
  </div>
  `;

  


  const [emails, setEmails] = useState<string[]>(selectedEmails);

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleRemove = (email: string) => {
    console.log("Removing email:", email);
    removeEmail(email);
  };

  const handlechessclubemail = async () => {
    
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const bccEmails = selectedEmails.join(', ');

    const formData = new FormData();
    formData.append('name', 'Default Name');
    formData.append('bcc', bccEmails);
    formData.append('subject', subject);
    formData.append('message', emailBody); 
    formData.append('displayname', displayname); 
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/submitform', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error sending email');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setShowPopup(true);
    } catch (error) {
      setErrorMessage('Error sending email: ' + error);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerSendEmail">
      <div className="formSection"> 
      <label className="label">
          Display from :  
          <input
            type="text"
            value={displayname}
            disabled
            required
            className="input"
          />
        </label>
        <label className="label">
          Subject:  
          <input
            type="text"
            value={subject}
            disabled
            required
            className="input"
          />
        </label>
        <label className="label">
          Message:
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="textarea"
          />
        </label>
        <label className="label">
          API Link:
          <input
            type="url"
            value={apiLink}
            onChange={e => setApiLink(e.target.value)}
            className="input"
          />
        </label>
        <label className="label">
          Upload Image (Optional):
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files![0])}
            className="input"
          />
        </label>
        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
            color: '#333',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            margin: '10px 0',
            width: '300px',
          }}
        >
          Selected Emails:
          <div style={{ fontWeight: 'bold' }}>
            {emails.map((email, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                {email}
              </div>
            ))}
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={handlechessclubemail} disabled={loading} className="button">
            {loading ? 'Sending...' : 'Send Email'}
          </button>
          <button className="backButton" onClick={onClose}>Back</button>
        </div>
      </div>
      <div className="previewSection">
        <h2 className="previewTitle">Email Preview</h2>
        <div className="emailPreview" dangerouslySetInnerHTML={{ __html: emailBody }} />
      </div>
    </div>
  );
};

export default chessclubemail;
