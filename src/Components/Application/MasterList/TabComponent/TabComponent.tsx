import { Card, TabContent, TabPane } from 'reactstrap'
import PersonalTab from './PersonalTab/PersonalTab'
import { useAppSelector } from '@/Redux/Hooks'
import OrganizationTab from './OrganizationTab/OrganizationTab'
import NoDataFoundClass from './Common/NoDataFoundClass'
import { Business, LombardyAfterSchool, MPESAfterSchool, Holidays, JCC_ChessChamps, Important } from '@/Constant'
import HistoryClass from './HistoryClass/HistoryClass'
import { ContactNavProps } from '@/Type/Application/MasterList/MasterList'
import PersonalTab1 from './PersonalTab/PersonalTab1'
import PersonalTab2 from './PersonalTab/PersonalTab2'
import PersonalTab3 from './PersonalTab/PersonalTab3'

const TabComponent: React.FunctionComponent<ContactNavProps> = ({ activeTab }): React.ReactElement => {
  const {users} = useAppSelector((state)=>state.contact)
  return (
    <div className="email-right-aside bookmark-tabcontent contacts-tabs">
      <Card className="email-body radius-left dark-contact">
        <div className="ps-0">
          <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
              <PersonalTab />
            </TabPane>
            <TabPane tabId="2">
              <OrganizationTab />
            </TabPane>
            <TabPane tabId="3">
            <PersonalTab1 />
            </TabPane>
            <TabPane tabId="4">
            <PersonalTab2 />
            </TabPane>
            <TabPane tabId="5">
            <PersonalTab3 />
            </TabPane>
            <TabPane tabId="6">
              <NoDataFoundClass title={Important} />
            </TabPane>
            <TabPane tabId="7">
              <NoDataFoundClass title={Business} />
            </TabPane>
            <TabPane tabId="8">
              <NoDataFoundClass title={Holidays} />
            </TabPane>
            <HistoryClass />
          </TabContent>
        </div>
      </Card>
    </div>
  )
}

export default TabComponent