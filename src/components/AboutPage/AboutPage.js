import aboutProgress from "@/data/aboutProgress";
import image from "@/images/resources/about-page-img-1.jpg";
import React from "react";
import { Container, Image, Row } from "react-bootstrap";
import AboutProgressbar from "./AboutProgressbar";

const AboutPage = () => {
  return (
    <section className="about-page">
      <Container>
        <Row>
          <div className="col-xl-6">
            <div className="about-page__left">
              <div className="about-page__img">
                <Image src={image.src} alt="" />
                {/* <div className="about-page__trusted">
                  <h3>
                    We're trusted by <span>9,8750</span> donors
                  </h3>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="about-page__right">
              <div className="section-title text-left">
                <span className="section-title__tagline">Our Technology</span>
                <h2 className="section-title__title">
                  Distributed StorageTechnology
                </h2>
              </div>
              <p className="about-page__right-text">
                Our donation system utilizes ResDB, a distributed storage
                technology, to ensure the security and reliability of user
                contributions. By distributing data across multiple nodes, this
                architecture provides high availability and fault tolerance,
                safeguarding user information. Many leading technology companies
                have adopted distributed storage solutions to manage
                their extensive data processing needs. This setup allows multiple
                users to donate simultaneously with the system efficiently
                handling concurrent requests to accurately record and process
                each contribution. Additionally, the scalability of distributed
                storage enables our system to adapt to increasing donation volumes,
                consistently delivering stable and dependable services
              </p>
              <h3 className="about-page__right-title">
                ResCharity is the safest and most reliable donation platform
              </h3>
              <div className="about-five__progress-wrap">
                {/* {aboutProgress.map((progress) => (
                  <AboutProgressbar key={progress.id} progress={progress} />
                ))} */}
              </div>
            </div>
          </div>
        </Row>

        <div className="features-section mt-5">
          <h2 className="text-center mb-5">
            MOST
            <div className="title-underline"></div>
          </h2>
          <div className="features-grid">
            <div className="feature-card text-center p-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-network-wired" style={{ fontSize: '2.5rem', color: '#15c8a0' }}></i>
              </div>
              <h4>Decentralized</h4>
              <p>Our blockchain-based platform ensures no single entity controls the donation process</p>
            </div>

            <div className="feature-card text-center p-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-database" style={{ fontSize: '2.5rem', color: '#15c8a0' }}></i>
              </div>
              <h4>Data Immutable</h4>
              <p>All donation records are permanently stored and cannot be altered or deleted</p>
            </div>

            <div className="feature-card text-center p-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-search-dollar" style={{ fontSize: '2.5rem', color: '#15c8a0' }}></i>
              </div>
              <h4>Transparent and Traceable</h4>
              <p>Track every donation's journey from donor to beneficiary in real-time</p>
            </div>

            <div className="feature-card text-center p-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-shield-alt" style={{ fontSize: '2.5rem', color: '#15c8a0' }}></i>
              </div>
              <h4>Secure</h4>
              <p>Advanced cryptography protects all transactions and user information</p>
            </div>

            <div className="feature-card text-center p-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-handshake" style={{ fontSize: '2.5rem', color: '#15c8a0' }}></i>
              </div>
              <h4>Trustworthy</h4>
              <p>Smart contracts automatically execute donations according to predefined rules</p>
            </div>

            <div className="feature-card text-center p-4">
              <div className="feature-icon mb-3">
                <i className="fas fa-globe" style={{ fontSize: '2.5rem', color: '#15c8a0' }}></i>
              </div>
              <h4>Borderless Transactions</h4>
              <p>Instant, low-cost international transfers through cryptocurrency payments</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutPage;
