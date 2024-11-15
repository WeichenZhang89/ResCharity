import { useRootContext } from "@/context/context";
import navItems, { social } from "@/data/NavItems";
import useScroll from "@/hooks/useScroll";
import logo from "@/images/resources/logo-2.png";
import Link from "next/link";
import React from "react";
import { Container, Image } from "react-bootstrap";
import NavItem from "./NavItem";

const HeaderTwo = () => {
  const { scrollTop } = useScroll(130);
  const { toggleMenu, toggleSearch } = useRootContext();

  return (
    <header className="main-header-two clearfix">
      <div className="main-header-two__inner">
        <Container>
          <div className="main-header-two__top clearfix">
            <div className="main-header-two__logo">
              <Link href="/" legacyBehavior>
                <a>
                  <Image src={logo.src} alt="" />
                </a>
              </Link>
            </div>
            <div className="main-header-two__contact-info">
              <ul className="main-header-two__contact-list list-unstyled">
                {/* 删除或修改这三个 li 元素 */}
              </ul>
              <div className="main-header-two__btn">
                <Link href="/causes-details" legacyBehavior>
                  <a className="main-header-two__donate-btn">
                    <i className="fa fa-heart"></i>Donate{" "}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="main-header-two__bottom">
        <nav
          className={
            scrollTop
              ? "stricky-header stricked-menu main-menu main-menu__two stricky-fixed slideInDown animated"
              : "main-menu main-menu__two slideIn animated"
          }
        >
          <Container>
            <div
              className={
                scrollTop
                  ? "sticky-header__content main-menu__inner clearfix"
                  : "main-menu__inner clearfix"
              }
            >
              <span
                onClick={() => toggleMenu()}
                className="mobile-nav__toggler"
              >
                <i className="fa fa-bars"></i>
              </span>
              <ul className="main-menu__list">
                {navItems.map((navItem) => (
                  <NavItem key={navItem.id} navItem={navItem} />
                ))}
              </ul>
              <div className="main-menu__right">
                <div className="main-menu__right-social">
                  {social.map(({ icon, link }, index) => (
                    <a href={link} key={index}>
                      <i className={`fab ${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </nav>
      </div>
    </header>
  );
};

export default HeaderTwo;
