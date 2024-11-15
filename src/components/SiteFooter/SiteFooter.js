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
  // 颜色与 logo 一致（示例颜色）
  const logoColor = "#00A676"; // 请替换为与你的 logo 颜色相匹配的 HEX 值

  return (
    <footer className="site-footer text-white">
      <div
        className="site-footer-bg"
        style={{ backgroundImage: `url(${footerBg})` }}
      ></div>
      <Container>
        <div className="site-footer__top">
          <Row>
            {/* About Section */}
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
                  <div className="footer-widget__text text-white">
                    <h3 className="footer-widget__title text-white">About</h3>
                    <p>{about}</p>
                  </div>
                </div>
              </div>
            </Col>

            {/* Statistics Section */}
            <Col xl={6} lg={6} md={6} className="fadeInUp d-flex align-items-center">
              <div className="footer-widget__column footer-widget__stats" style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-around' 
              }}>
                <div className="text-center">
                  <h2 
                    style={{ color: logoColor, fontSize: '3rem', fontWeight: 'bold', margin: 0 }}
                  >
                    3+
                  </h2>
                  <p style={{ fontSize: '1rem', margin: '0.5rem 0' }}>Ongoing Charity<br />Projects</p>
                </div>
                <div className="text-center">
                  <h2 
                    style={{ color: logoColor, fontSize: '3rem', fontWeight: 'bold', margin: 0 }}
                  >
                    1,000+
                  </h2>
                  <p style={{ fontSize: '1rem', margin: '0.5rem 0' }}>Satisfied Users</p>
                </div>
                <div className="text-center">
                  <h2 
                    style={{ color: logoColor, fontSize: '3rem', fontWeight: 'bold', margin: 0 }}
                  >
                    10,000+
                  </h2>
                  <p style={{ fontSize: '1rem', margin: '0.5rem 0' }}>Donation Amount</p>
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
