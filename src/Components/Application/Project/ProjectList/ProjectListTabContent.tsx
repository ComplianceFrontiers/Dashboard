import { Card, CardBody, Row, TabContent, TabPane } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import ProjectCommon from "./Common/ProjectCommon";

const ProjectListTabContent = () => {
  const { activeTab, createdFormData } = useAppSelector((state) => state.project);
  return (
    <Card>
      <CardBody>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1"><Row>{createdFormData.map((item, i) => (<ProjectCommon item={item} key={i} />))}</Row></TabPane>
          <TabPane tabId="2"><Row>{createdFormData.map((item, i) => (item.badge === "ChessChamps" ? <ProjectCommon item={item} key={i} /> : " "))}</Row></TabPane>
          <TabPane tabId="3"><Row>{createdFormData.map((item, i) => (item.badge === "Dvlc" ? <ProjectCommon item={item} key={i} /> : " "))}</Row></TabPane>
          <TabPane tabId="4"><Row>{createdFormData.map((item, i) => (item.badge === "Bcc" ? <ProjectCommon item={item} key={i} /> : " "))}</Row></TabPane>
          <TabPane tabId="5"><Row>{createdFormData.map((item, i) => (item.badge === "ComplianceFrontiers" ? <ProjectCommon item={item} key={i} /> : " "))}</Row></TabPane>
          <TabPane tabId="6"><Row>{createdFormData.map((item, i) => (item.badge === "BulkEmail" ? <ProjectCommon item={item} key={i} /> : " "))}</Row></TabPane>


        </TabContent>
      </CardBody>
    </Card>
  );
};

export default ProjectListTabContent;
