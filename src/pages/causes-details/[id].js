import PageHeader from "@/components/PageHeader/PageHeader";
import CausesDetailsLeft from "@/components/CausesDetails/CausesDetailsLeft";
import CausesDetailsRight from "@/components/CausesDetails/CausesDetailsRight";
import { useCausesPageData } from "@/data/causesPageData";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "@/components/Layout/Layout";

const CausesDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const causes = useCausesPageData();
  const cause = causes.find((c) => c.id === Number(id));

  if (!cause) {
    return <div>Loading...</div>;
  }

  return (
    <Layout pageTitle={cause.title}>
      <PageHeader pageTitle="causes details" page={cause.category} />
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
    </Layout>
  );
};

export default CausesDetails;