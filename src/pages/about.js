import AboutPage from "@/components/AboutPage/AboutPage";
import BrandOne from "@/components/BrandOne/BrandOne";
import Counters from "@/components/Counters/Counters";
import JoinOne from "@/components/JoinOne/JoinOne";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import TeamOne from "@/components/TeamOne/TeamOne";
import TestimonialOne from "@/components/TestimonialOne/TestimonialOne";
import React from "react";

const About = () => {
  return (
    <Layout pageTitle="About">
      <PageHeader pageTitle="About" />
      <AboutPage />
      {/* <TestimonialOne className="about-page-testimonial" />
      <JoinOne className="join-one__about" /> */}
      {/* <Counters className="about-page-counter" />
      <TeamOne />
      <BrandOne /> */}
    </Layout>
  );
};

export default About;
