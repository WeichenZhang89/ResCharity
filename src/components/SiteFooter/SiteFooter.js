import footerData from "@/data/footerData";
import Link from "next/link";
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "@/images/ResDB_logo.png";

const {
  about,
  link,
  copyrightYear,
  bottomLogo,
  footerBg,
} = footerData;

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div
        className="site-footer-bg"
        style={{ backgroundImage: `url(${footerBg})` }}
      ></div>
      <Container>
        <div className="site-footer__top">
          <Row>
            <Col xl={6} lg={6} md={6} className="fadeInUp">
              <div className="footer-widget__column footer-widget__about">
                <div className="footer-widget__about-content">
                  <div className="footer-widget__logo">
                    <Image 
                      src={logo.src}
                      alt="ResDB Logo"
                      width={150}
                      height={90}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="footer-widget__text">
                    <h3 className="footer-widget__title">About</h3>
                    <p>{about}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="site-footer__bottom">
          <Row>
            <Col xl={12}>
              <div className="site-footer__bottom-inner">
                <div className="site-footer__bottom-logo-social">
                  <div className="site-footer__bottom-logo">
                    <Link href="/">
                      <a>
                        <Image src={bottomLogo} alt="" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="site-footer__bottom-copy-right">
                  <p>
                    © Copyright {copyrightYear} by{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://${link}`}
                    >
                      {link}
                    </a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default SiteFooter;
