'use client'
import { Col, Container, Row, Button } from 'reactstrap'
import ContactSideBar from './ContactSideBar/ContactSideBar'
import { useCallback, useState } from 'react';
import TabComponent from './TabComponent/TabComponent';
import { Apps } from '@/Constant';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';

const MasterList = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control the sidebar visibility

  const callback = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const titles: { [key: string]: string } = {
    "1": "Master List",
    "2": "Organization",
    "3": "MPES After School",
    "4": "Lombardy After School",
    "5": "JCC Chess Champs",
    "6": "Website",
    "7": "Club Registration-Delaware",
    "8": "Chess Champs App",
  };

  return (
    <>
      <Breadcrumbs mainTitle={titles[activeTab] || activeTab} parent={Apps} />

      <Container fluid className="email-wrap bookmark-wrap">
        <Row>
          <Col xl="3" className="box-col-6" style={{ position: 'relative' }}>
            <Button onClick={toggleSidebar} className="mb-3" style={{ 
              position: 'absolute', 
              top: '6px', 
              left: '10px', 
              background: 'transparent', 
              border: 'none', 
              zIndex: 1000 
            }}>
              <span 
                className={`toggle-sidebar ${!isSidebarOpen ? 'close' : ''}`} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '20px',
                  height: '15px',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <span 
                  className="line" 
                  style={{
                    width: '100%',
                    height: '3px',
                    backgroundColor: '#333',
                    borderRadius: '2px',
                  }} 
                />
                <span 
                  className="line" 
                  style={{
                    width: '100%',
                    height: '3px',
                    backgroundColor: '#333',
                    borderRadius: '2px',
                  }} 
                />
                <span 
                  className="line" 
                  style={{
                    width: '100%',
                    height: '3px',
                    backgroundColor: '#333',
                    borderRadius: '2px',
                  }} 
                />
              </span>
            </Button>
            {isSidebarOpen && (
              <ContactSideBar 
                callback={callback} 
                
              />
            )}
          </Col>
          <Col 
            xl={isSidebarOpen ? "9" : "12"} 
            md="12" 
            className={`box-col-12 ${!isSidebarOpen ? 'd-flex justify-content-center' : ''}`} 
            style={{
              display: isSidebarOpen ? 'block' : 'flex',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <TabComponent activeTab={activeTab} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MasterList;
