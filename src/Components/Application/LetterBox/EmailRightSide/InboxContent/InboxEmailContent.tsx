import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Badge, Input, Label } from 'reactstrap';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { addToFavorites, handleEnvelope, handleInterview, removeItems } from '@/Redux/Reducers/LetterBoxSlice';

const InboxEmailContent: React.FC = () => {
  const { emailOpen } = useAppSelector((state) => state.letterBox);
  const dispatch = useAppDispatch();

  const [emailData, setEmailData] = useState<any[]>([]);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-chess-tau.vercel.app/get_forms21');
        const data = await response.json();
        // Transform the data to match the structure of your existing component
        const transformedData = data.map((item: any, index: number) => ({
          id: index + 1,
          color: 'success', // Set the color as needed
          star: true, // Set the star status as needed
          image: 'user1.jpg', // Replace with appropriate image logic
          shortName: item.name.charAt(0), // Use the first letter of the name as the short name
          name: item.name,
          email:item.email,
          message: item.subject, // Use subject as the message
          subMessage: item.question, // Use question as the subMessage
          badge: [], // Add any badges as needed
          time: '12:00 PM', // Add appropriate time logic
        }));
        setEmailData(transformedData);
      } catch (error) {
        console.error('Error fetching email data:', error);
      }
    };

    fetchData();
  }, []);

  const handleValue = () => dispatch(handleInterview(true));
  const handleRemoveEmail = (id: number) => {
    dispatch(removeItems(id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {emailData.map((email) => (
        <div key={email.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div className="inbox-user" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="form-check form-check-inline m-0">
              <Input
                className={`checkbox-${email.color}`}
                name="emailCheckbox"
                id={`emailCheckbox${email.id}`}
                type="checkbox"
              />
              <Label check htmlFor={`emailCheckbox${email.id}`} />
            </div>
            <SvgIcon
              className={`feather important-mail ${email.star ? 'active' : ''}`}
              iconId="star"
              onClick={() => dispatch(addToFavorites(email))}
            />
            {/* <div className="rounded-border">
              {email.shortName && (
                <div className={email.color === 'success' ? 'circle-success' : ''}>
                  <p className={`txt-${email.color}`}>{email.shortName}</p>
                </div>
              )}
            </div> */}
            <p>{email.name}</p>
            
          </div>
          <div className="email-timing" style={{ marginTop: '5px' }}>
          <p >({email.email})</p>
            </div>
          <div className="inbox-message" style={{ marginTop: '10px' }}>
            <div className="email-data" onClick={handleValue}>
              <span>
                {email.message}
                <span>{email.subMessage}</span>
              </span>
              {email.badge &&
                email.badge.map((item: { color: any; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode> | null | undefined; }, index: Key | null | undefined) => (
                  <Badge
                    color=""
                    className={`badge-light-${item.color}`}
                    key={index}
                  >
                    {item.title}
                  </Badge>
                ))}
            </div>
          
            <div className="email-timing" style={{ marginTop: '5px' }}>
              <span>{email.time}</span>
            </div>
            <div className="email-options" style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <i
                className={`fa fa-envelope-o envelope-1 ${
                  emailOpen.includes(email.id) ? 'hide' : 'show'
                }`}
                onClick={() => dispatch(handleEnvelope(email.id))}
              />
              <i
                className={`fa fa-envelope-open-o envelope-2 ${
                  emailOpen.includes(email.id) ? 'show' : 'hide'
                }`}
                onClick={() => dispatch(handleEnvelope(email.id))}
              />
              <i
                className="fa fa-trash-o trash-3"
                onClick={() => handleRemoveEmail(email.id)}
              />
              <i className="fa fa-print" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InboxEmailContent;
