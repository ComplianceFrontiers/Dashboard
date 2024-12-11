import { Href, Personal, Views } from '@/Constant';
import { sideBarData } from '@/Data/Application/MasterList/MasterList';
import { ContactNavPropsType } from '@/Type/Application/MasterList/MasterList';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { Nav, NavItem } from 'reactstrap';
import CategoryCreate from './CategoryCreate';
import CreateContact from './CreateContact';

const NavComponent:React.FC<ContactNavPropsType> = ({ callbackActive }) => {
  const [activeTab, setActiveTab] = useState("1");
  const activeTabHandler=(value:string)=>{
    setActiveTab(value)
    callbackActive(value)
  }
  return (
    <Nav className="main-menu contact-options">
      <NavItem>
        <CreateContact />
      </NavItem>
      <NavItem>
        <span className="main-title">Channels</span>
      </NavItem>
      <NavItem>
        <a href={Href} className={activeTab === "1" ? "active" : ""} onClick={() => { setActiveTab("1"); callbackActive("1");}}>
          <span className="title">MasterList</span>
        </a>
      </NavItem>
      <NavItem>
        {/* <CategoryCreate />temp  */} 
      </NavItem>
      {sideBarData.map((data: { value: string; tittle: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode> | null | undefined; }, index: Key | null | undefined) => (
        <NavItem key={index}>
          <a href={Href} className={activeTab === data.value ? "active" : ""} onClick={() => activeTabHandler(data.value)}>
            <span className="title">{data.tittle}</span>
          </a>
        </NavItem>
      ))}
    </Nav>
  )
}

export default NavComponent