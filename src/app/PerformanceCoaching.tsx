/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SendEmail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faHome, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'; // Add any icons you need

// Add icons to the library
library.add(faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin, faCoffee, faHome, faUser, faSearch);


interface SendEmailProps {
  selectedRecords: { name: string; email: string; }[];
  onBack: () => void;
}

const SendEmail = ({ selectedEmails, onClose }: { selectedEmails: string[]; onClose: () => void }) => {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [apiLink, setApiLink] = useState('');

  const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center; display: block; margin: 0 auto; max-width: 800px;">
      <div style="text-align: center;">
        <img src="https://res.cloudinary.com/duvifszan/image/upload/v1760095728/E-Mail_Banner_1_mws6wr.png" alt="Chess Champs Banner" style="max-width: 100%; height: auto;">
      </div>
     <div style="border: 2px solid #ccc; padding: 20px; border-radius: 8px; max-width: 850px; margin: 0 auto;margin-top: 10px;margin-bottom: 20px;">
  <h1 style="color: #000; text-align: left; font-size: 16px; font-weight: bold; margin-bottom: 10px;"> 
    Performance Coaching for Beginners
$35 for 4 Interactive Sessions | Starts October 15 | Limited to 7 Students Only
  </h1>
<p style="font-size: 14px; line-height: 1.6; margin-top: 20px; margin-bottom: 10px; text-align: left; max-width: 800px; margin-right: auto;">
  Dear Patron,
</p>
<p style="font-size: 14px; line-height: 1.6; margin-bottom: 10px; text-align: left; max-width: 800px; margin-right: auto;">
  If your child already knows how to move the pieces, it’s time to help them think like a chess player.
</p>
<p style="font-size: 14px; line-height: 1.6; margin-bottom: 10px; text-align: left; max-width: 800px; margin-right: auto;">
  Join International Master (WIM) Tatiana Kasparova for an engaging 4-session online coaching program designed especially for 2nd–5th graders who want to take their first confident steps into real chess mastery.
</p>
<p style="font-size: 14px; line-height: 1.6; margin-bottom: 10px; text-align: left; max-width: 800px; margin-right: auto;">
  This program blends fun learning with structured skill development, helping kids build focus, logic, and strategy through guided practice.
</p>

  <table align="center" style="margin: 10px auto;">
    <tr>
      <td style="text-align: center;">
        <a href="https://www.chesschamps.us/performance-coaching/" style="display: inline-block; padding: 12px 20px; background-color: #f53db8; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 14px;">
          REGISTER NOW
        </a>
      </td>
    </tr>
  </table>
</div>

<div style="border: 2px solid #ccc; padding: 15px; border-radius: 8px; max-width: 850px; margin: 0 auto;">
<h3 style="color: #f53db8; text-align: left; font-size: 14px; margin-top: 1px; margin-bottom: 6px;">
  <strong>🧩 What Your Child Will Learn</strong>
</h3>
<ul style="font-size: 14px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: 25px; list-style-type: disc; padding-left: 20px;">
  <li><strong>Lesson 1:</strong> Getting to Know Chess — the feel of the game, basic rules, and understanding the ultimate goal.</li>
  <li><strong>Lesson 2:</strong> Opening Principles & Early Strategy — how to start a game with purpose and control.</li>
  <li><strong>Lesson 3:</strong> Tactics – The Engine of Chess — spotting opportunities and winning material.</li>
  <li><strong>Lesson 4:</strong> Endgame Essentials — finishing strong and learning how to convert a lead into victory.</li>
</ul>

<h3 style="color: #f53db8; text-align: left; font-size: 14px; margin-top: 15px; margin-bottom: 6px;">
  <strong>📚 Program Details</strong>
</h3>
<ul style="font-size: 14px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: 25px; list-style-type: disc; padding-left: 20px;">
  <li><strong>Trainer:</strong> Tatiana Kasparova (FIDE International Master – WIM)</li>
  <li><strong>Theme:</strong> Starting Strong in Chess – Part 1</li>
  <li><strong>Grades:</strong> 2nd–5th</li>
  <li><strong>Proficiency Level:</strong> Beginner</li>
  <li><strong>Format:</strong> Small Group Online Coaching (Max 7 students)</li>
  <li><strong>Dates:</strong> Oct 15 | Oct 22 | Oct 29 | Nov 5</li>
  <li><strong>Time:</strong> 7:00–8:00 PM EST</li>
  <li><strong>Fee:</strong> $35 (all 4 sessions included)</li>
</ul>


  <table align="center" style="margin: 10px auto;">
    <tr>
      <td style="text-align: center;">
        <a href="https://www.chesschamps.us/performance-coaching/" style="display: inline-block; padding: 12px 20px; background-color: #f53db8; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 14px;">
          REGISTER NOW
        </a>
      </td>
    </tr>
  </table>
</div>
            



 
            <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">Spots are limited, so secure yours today and join us for an unforgettable chess experience!</p>
<p><strong>For more information,</strong> contact connect@chesschamps.us.</p>
      
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


  const handleSendEmail = async () => {
    if (!subject) {
      setErrorMessage('Subject, message, and API link are required.');
      setShowPopup(true);
      return;
    }
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const bccEmails = selectedEmails.join(', ');

    const formData = new FormData();
    formData.append('name', 'Default Name');
    formData.append('bcc', bccEmails);
    formData.append('subject', subject);
    formData.append('message', emailBody); 
    formData.append('displayname', "Chess Champs Academy"); 
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
          Subject:  
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
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
            {/* <button
              onClick={() => handleRemove(email)}
              style={{
                marginLeft: '10px',
                fontSize: '10px',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '2px 5px',
              }}
            >
              Remove
            </button> */}
          </div>
        ))}
      </div>
    </div>
        <div className="buttonContainer">
  <button onClick={handleSendEmail} disabled={loading} className="button">
    {loading ? 'Sending...' : 'Send Email'}
  </button>
  <button  className="backButton" onClick={onClose} >Back</button>
</div>

      </div>
      <div className="previewSection">
        <h2 className="previewTitle">Email Preview</h2>
        <div className="emailPreview" dangerouslySetInnerHTML={{ __html: emailBody }} />
      </div>
    </div>
  );
};

export default SendEmail;
