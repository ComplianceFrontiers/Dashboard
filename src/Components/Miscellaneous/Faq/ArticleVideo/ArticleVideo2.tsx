import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { articleDataTwo } from "@/Data/Miscellaneous/Faq/Faq";
import { Card, CardBody, Col, Row } from "reactstrap";

const ArticleVideo2 = () => {
  return (
    <Col xl="4" md="6">
      <Row>
        {articleDataTwo.map((item, i) => (
          <Col sm="12" key={i}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <SvgIcon iconId="file-text" className="feather m-r-30" />
                  <div className="flex-grow-1">
                    <h5 className="f-w-500">{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ArticleVideo2;
