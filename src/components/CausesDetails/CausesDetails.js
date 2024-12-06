import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CausesDetailsLeft from "./CausesDetailsLeft";
import CausesDetailsRight from "./CausesDetailsRight";
import { useCausesDetails } from "@/data/causesDetails";

const CausesDetailsPage = () => {
  const cause = useCausesDetails();

  return (
    <section className="causes-details">
      <Container>
        <Row>
          <Col xl={8} lg={7}>
            <CausesDetailsLeft cause={cause} />
          </Col>
          <Col xl={4} lg={5}>
            <CausesDetailsRight cause={cause} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CausesDetailsPage;
