import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Badge, Input, Label } from 'reactstrap';
import { CommonDataType } from '@/Type/Application/LetterBox/LetterBox';
import { handleEnvelope, handleInterview, removeFromFavorite } from '@/Redux/Reducers/LetterBoxSlice';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import Image from 'next/image';
import { ImagePath } from '@/Constant';

const StarredEmailContent:React.FC<CommonDataType> = ({data,index}) => {
    const {emailOpen } = useAppSelector((state) => state.letterBox);
    const dispatch = useAppDispatch()
    const handleValue= ()=> dispatch(handleInterview(true))
    return (
      <>
        <div className="inbox-user">
          <div className="form-check form-check-inline m-0">
            <Input className={`checkbox-${data.color}`} name="emailCheckbox" id={`emailCheckbox${index}`} type="checkbox" />
            <Label check for={`emailCheckbox${index}`} />
          </div>
          <SvgIcon className={`feather important-mail ${data.star ? "active" : ""}`} iconId="star" onClick={() => dispatch(removeFromFavorite(data))} />
          <div className="rounded-border">
            {data.image && <Image width={38} height={38} src={`${ImagePath}/user/${data.image}`} alt="user" />}
              {data.shortName && <div className={data.color === "success" ? "circle-success" : ""}>
                <p className={`txt-${data.color}`}>{data.shortName}</p>
            </div>}
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
                <Badge color="" className={`badge-light-${item.color}`} key={index} > {item.title} </Badge>
              ))}
          </div>
          <div className="email-timing">
            <span>{data.time}</span>
          </div>
          <div className="email-options">
            <i className={`fa fa-envelope-o envelope-1 ${emailOpen.includes(data.id) ? "hide" : "show"}`} onClick={() => dispatch(handleEnvelope(true))}/>
            <i className={`fa fa-envelope-open-o envelope-2 ${ emailOpen.includes(data.id) ? "show" : "hide"}`} onClick={() => dispatch(handleEnvelope(false))} />
            <i className="fa fa-trash-o trash-3" />
            <i className="fa fa-print" />
          </div>
        </div>
      </>
    );
}

export default StarredEmailContent