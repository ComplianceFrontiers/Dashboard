import nodemailer from 'nodemailer';

export async function POST(req) {
  const formData = await req.formData(); // Use formData() to parse the multipart form data
  
  const displayname = formData.get('displayname');
  const bcc = formData.get('bcc'); // Assuming this is a comma-separated list of emails
  const subject = formData.get('subject');
  const message = formData.get('message'); // This will be the HTML message

  // Validate the form data, but allow image to be optional
  if ( !bcc || !subject || !message) {
    return new Response(JSON.stringify({ error: 'Name, BCC, subject, and message are required.' }), { status: 400 });
  }

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Convert bcc to an array of email addresses
  const bccList = bcc.split(',').map(email => email.trim());

  // Define a helper function to send a batch of emails
  const sendBatchEmails = async (batch) => {
    const mailOptions = {
      from: `${displayname}<${process.env.EMAIL_USER}>`, 
      bcc: batch, // Send batch of emails as BCC
      subject: subject,
      html: message, // Send the message as HTML content
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending batch:', error);
      throw error;
    }
  };

  // Split the bcc list into chunks of 100
  const chunkSize = 99;
  const batches = [];
  for (let i = 0; i < bccList.length; i += chunkSize) {
    const batch = bccList.slice(i, i + chunkSize);
    batches.push(batch);
  }

  // Send each batch sequentially
  try {
    for (const batch of batches) {
      await sendBatchEmails(batch); // Send one batch at a time
    }
    return new Response(JSON.stringify({ message: 'All emails sent successfully in batches!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
