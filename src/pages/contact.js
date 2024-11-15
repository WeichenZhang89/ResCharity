import BecomeVolunteer from "@/components/BecomeVolunteer/BecomeVolunteer";
import ContactPage from "@/components/ContactPage/ContactPage";
import GoogleMap from "@/components/GoogleMap/GoogleMap";
import Layout from "@/components/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import React from "react";

const Contact = () => {
  return (
    <Layout pageTitle="Contact">
      <PageHeader pageTitle="Contact" />
      <ContactPage />
      {/*<GoogleMap />*/}
      {/*<BecomeVolunteer />*/}
    </Layout>
  );
};

export default Contact;
