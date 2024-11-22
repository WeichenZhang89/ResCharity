import ContextProvider from "@/context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/vendors/halpes-icons/style.css";
import "@/vendors/reey-font/stylesheet.css";
import "@/vendors/fontawesome/css/all.min.css";
import "@/vendors/animate/animate.min.css";
import "node_modules/swiper/swiper-bundle.min.css";
import "tiny-slider/dist/tiny-slider.css";

// extra css
import "@/styles/globals.css";
import "@/styles/halpes.css";
import "@/styles/halpes-responsive.css";

import { DonationProvider } from "@/context/DonationContext";

const MyApp = ({ Component, pageProps }) => {
  console.log('App rendering with DonationProvider');
  return (
    <DonationProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </DonationProvider>
  );
};

export default MyApp;
