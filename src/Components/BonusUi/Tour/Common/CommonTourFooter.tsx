import { Label, List, ListInlineItem } from 'reactstrap'
import { commonFooterData } from '../../../../Data/BonusUi/Tour/Tour'
import Link from 'next/link'
import { Href } from '@/Constant'

const CommonTourFooter = () => {
  return (
    <div className="like-comment mt-4">
      <List type="inline">
        {commonFooterData.map(({ className, icon, text }, index) => (
          <ListInlineItem className={className} key={index}>
            <Label className="m-0" check>
                <Link href={Href}>
                  <i className={`fa fa-${icon}`}></i>
                </Link>{text}
            </Label>
          </ListInlineItem>
        ))}
      </List>
    </div>
  )
}

export default CommonTourFooter