import aboutProgress from "@/data/aboutProgress";
import image from "@/images/resources/about-page-img-1.jpg";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import AboutProgressbar from "./AboutProgressbar";

const AboutPage = () => {
  return (
    <section className="about-page">
      <Container>
        <Row>
          <Col xl={6}>
            <div className="about-page__left">
              <div className="about-page__img">
                <Image src={image.src} alt="" />
                <div className="about-page__trusted">
                  <h3>
                    We’re trusted by <span>9,8750</span> donors
                  </h3>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div className="about-page__right">
              <div className="section-title text-left">
                <span className="section-title__tagline">Our Technology</span>
                <h2 className="section-title__title">
                  Distributed StorageTechnology
                </h2>
              </div>
              <p className="about-page__right-text">
                Our donation system utilizes ResDB, a distributed storage
                technology, toensure the security and reliability of user
                contributions. By distributing dataacross multiple nodes, this
                architecture provides high availability and faulttolerance,
                safeguarding user information. Many leading technology
                companieshave adopted distributed storage solutions to manage
                their extensive dataprocessing needs. This setup allows multiple
                users to donate simultaneouslywith the system efficiently
                handling concurrent reguests to accurately recordand process
                each contribution, Additionally, the scalability of
                distributedstorage enables our system to adapt to increasing
                donation volumes,consistently delivering stable and dependable
                services
              </p>
              <h3 className="about-page__right-title">
                ResCharity is the safest and most reliable donation platform
              </h3>
              <div className="about-five__progress-wrap">
                {aboutProgress.map((progress) => (
                  <AboutProgressbar key={progress.id} progress={progress} />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutPage;
