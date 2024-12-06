import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Badge, Input, Label } from 'reactstrap';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import Image from 'next/image';
import { ImagePath } from '@/Constant';
import { addToFavorites, handleEnvelope, handleInterview, removeItems } from '@/Redux/Reducers/LetterBoxSlice';

const InboxEmailContent: React.FC = () => {
  const { emailOpen } = useAppSelector((state) => state.letterBox);
  const dispatch = useAppDispatch();

  // Hardcoded data
  const data = {
    id: 1,
    color: 'success',
    star: true,
    image: 'user1.jpg',
    shortName: 'JD',
    name: 'John Doe',
    message: 'Meeting Reminder',
    subMessage: 'Don’t forget about the 3 PM meeting today.',
    badge: [
      { title: 'Important', color: 'primary' },
      { title: 'Work', color: 'secondary' },
    ],
    time: '2:30 PM',
  };

  const index = 0;

  const handleValue = () => dispatch(handleInterview(true));
  const handleRemoveEmail = (id: number) => {
    dispatch(removeItems(id));
  };

  return (
    <>
      <div className="inbox-user">
        <div className="form-check form-check-inline m-0">
          <Input
            className={`checkbox-${data.color}`}
            name="emailCheckbox"
            id={`emailCheckbox${index}`}
            type="checkbox"
          />
          <Label check htmlFor={`emailCheckbox${index}`} />
        </div>
        <SvgIcon
          className={`feather important-mail ${data.star ? 'active' : ''}`}
          iconId="star"
          onClick={() => dispatch(addToFavorites(data))}
        />
        <div className="rounded-border">
        
          {data.shortName && (
            <div className={data.color === 'success' ? 'circle-success' : ''}>
              <p className={`txt-${data.color}`}>{data.shortName}</p>
            </div>
          )}
        </div>
        <p>{data.name}</p>
      </div>
      <div className="inbox-message">
        <div className="email-data" onClick={handleValue}>
          <span>
            {data.message}
            <span>{data.subMessage}</span>
          </span>
          {data.badge &&
            data.badge.map((item, index) => (
              <Badge
                color=""
                className={`badge-light-${item.color}`}
                key={index}
              >
                {item.title}
              </Badge>
            ))}
        </div>
        <div className="email-timing">
          <span>{data.time}</span>
        </div>
        <div className="email-options">
          <i
            className={`fa fa-envelope-o envelope-1 ${
              emailOpen.includes(data.id) ? 'hide' : 'show'
            }`}
            onClick={() => dispatch(handleEnvelope(data.id))}
          />
          <i
            className={`fa fa-envelope-open-o envelope-2 ${
              emailOpen.includes(data.id) ? 'show' : 'hide'
            }`}
            onClick={() => dispatch(handleEnvelope(data.id))}
          />
          <i
            className="fa fa-trash-o trash-3"
            onClick={() => handleRemoveEmail(data.id)}
          />
          <i className="fa fa-print" />
        </div>
      </div>
    </>
  );
};

export default InboxEmailContent;
