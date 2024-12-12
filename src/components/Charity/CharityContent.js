import React from "react";
import { Col } from "react-bootstrap";
import Link from "next/link";

const CharityContent = () => {
  return (
    <Col xl={6} lg={6}>
      <div className="welcome-one__right">
        <div className="section-title text-left">
          <span className="section-title__tagline">Welcome to ResCharity</span>
          <h2 className="section-title__title">
            Yolo County SPCA Community Cat Kindness Fund
          </h2>
        </div>
        <p className="welcome-one__right-text">
          The Community Cat Kindness Fund has been set up by the Yolo County
          SPCA to help provide care for community cats including veterinary care
          and humane euthanasia when needed for medical reasons. Even with
          discounted services, paying for the veterinary care for community cats
          is often a hardship on volunteers. This fund will help caring cat
          lovers to assist community cats in need. All contributors will receive
          a thank you from the Yolo County SPCA with a tax-deductible receipt.
        </p>
        {/* <div className="welcome-one__our-mission-and-story">
          <div className="welcome-one__mission-and-story-single">
            <h3>
              <i className="fas fa-arrow-circle-right"></i>Our Mission
            </h3>
            <p className="welcome-one__our-mission-and-story-text">
              Lorem ipsum dolor sit amet not is consectetur notted.
            </p>
          </div>
          <div className="welcome-one__mission-and-story-single">
            <h3>
              <i className="fas fa-arrow-circle-right"></i>Our Story
            </h3>
            <p className="welcome-one__our-mission-and-story-text">
              Lorem ipsum dolor sit amet not is consectetur notted.
            </p>
          </div>
        </div> */}
        <Link href="/causes">
          <a className="welcome-one__btn thm-btn">
            <i className="fas fa-arrow-circle-right"></i>Learn More
          </a>
        </Link>
      </div>
    </Col>
  );
};

export default CharityContent;
