import Link from "next/link";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import ReactVisibilitySensor from "react-visibility-sensor";

const CausesSingle = ({ cause = {}, causePage }) => {
  const [countStart, setCountStart] = useState(false);

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setCountStart(true);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const raisedNumber = +cause.raised.replace(/[^0-9.-]+/g, "");
  const goalNumber = +cause.goal.replace(/[^0-9.-]+/g, "");
  const percent = Math.min(Math.round((raisedNumber / goalNumber) * 100), 100);

  return (
    <div className={causePage ? "" : "my-4"}>
      <div
        style={causePage ? {} : { userSelect: "none" }}
        className="causes-one__single animated fadeInLeft"
      >
        <div className="causes-one__img">
          <div className="causes-one__img-box">
            <Image
              src={require(`@/images/resources/${cause.image}`).default.src}
              alt=""
            />
            <Link href="/causes-details">
              <a>
                <i className="fa fa-plus"></i>
              </a>
            </Link>
          </div>
          <div className="causes-one__category">
            <span>{cause.category}</span>
          </div>
        </div>
        <div className="causes-one__content">
          <h3 className="causes-one__title">
            <Link href="/causes-details">{cause.title}</Link>
          </h3>
          <p className="causes-one__text">{cause.description}</p>
        </div>
        <div className="causes-one__progress">
          <ReactVisibilitySensor
            offset={{ top: 10 }}
            delayedCall={true}
            onChange={onVisibilityChange}
          >
            <div className="bar">
              <div
                className="bar-inner count-bar"
                style={{ width: `${percent}%` }}
                data-percent={`${percent}%`}
              >
                <div className="count-text">{percent}%</div>
              </div>
            </div>
          </ReactVisibilitySensor>
          <div className="causes-one__goals">
            <p>
              <span>{formatAmount(raisedNumber)}</span> Raised
            </p>
            <p>
              <span>{formatAmount(goalNumber)}</span> Goal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CausesSingle;
