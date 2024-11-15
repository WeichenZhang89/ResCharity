import BrandOne from "@/components/BrandOne/BrandOne";
import CausesOne from "@/components/CausesOne/CausesOne";
import Charity from "@/components/Charity/Charity";
import GalleryOne from "@/components/GalleryOne/GalleryOne";
import HelpingOne from "@/components/HelpingOne/HelpingOne";
import HelpThem from "@/components/HelpThem/HelpThem";
import JoinOne from "@/components/JoinOne/JoinOne";
import Layout from "@/components/Layout/Layout";
import MainSlider from "@/components/MainSlider/MainSlider";
import NewsOne from "@/components/NewsOne/NewsOne";
import TestimonialOne from "@/components/TestimonialOne/TestimonialOne";
import ThreeBoxes from "@/components/ThreeBoxes/ThreeBoxes";

const Home = () => {
  return (
    <Layout pageTitle="Home">
      <MainSlider />
      <Charity />
      {/*<CausesOne />*/}
      {/*<JoinOne />*/}
      {/*<ThreeBoxes />*/}
      {/*<HelpingOne />*/}
      {/*<GalleryOne />*/}
      {/*<TestimonialOne />*/}
      {/*<HelpThem />*/}
      {/*<NewsOne />*/}
      {/*<BrandOne />*/}
    </Layout>
  );
};

export default Home;
