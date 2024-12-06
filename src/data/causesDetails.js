import { useDonations } from "@/context/DonationContext";
import image2 from "@/images/resources/causes-details-images-1.jpg";
import image3 from "@/images/resources/causes-details-images-2.jpg";
import image from "@/images/resources/causes-details-img-1.jpg";

const text1 =
  "The Community Cat Kindness Fund has been set up by the Yolo County SPCA to help provide care for community cats including veterinary care and humane euthanasia when needed for medical reasons. Even with discounted services, paying for the veterinary care for community cats is often a hardship on volunteers. This fund will help caring cat lovers to assist community cats in need. All contributors will receive a thank you from the Yolo County SPCA with a tax-deductible receipt.";
const text2 =
  "";

const summaryText =
  "";

export function useCausesDetails() {
  const { totalDonations } = useDonations();
  console.log('CausesDetails - Total Donations:', totalDonations); // Debug total in hook

  // Format the number and ensure it's a string
  const formattedTotal = totalDonations ? totalDonations.toString() : "0";
  console.log('Formatted Total:', formattedTotal); // Debug formatted value

  return {
    raised: formattedTotal,
    goal: "30000",
    category: "Animal Welfare",
    title: "Raise Fund for Community Cats",
    images: [image, image2, image3],
    texts: [text1, text2],
    summaryText,
    summaryList: [
      "Making this first true generator",
      "Many desktop publish packages",
      "Lorem Ipsum is not simply",
      "If you are going to passage",
      "It has roots in a piece",
    ],
    comments: [
      {
        id: 1,
        image: "comment-1-1.jpg",
        message:
          "Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
        sender: "David Marks",
        time: "3 hours ago",
      },
      {
        id: 2,
        image: "comment-1-2.jpg",
        message:
          "Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
        sender: "Christine Eve",
        time: "3 hours ago",
      },
    ],
  };
}

// Keep the default export for backward compatibility
export default {
  raised: "0",
  goal: "30,000",
  category: "Animal Welfare",
  title: "Raise Fund for Community Cats",
  images: [image, image2, image3],
  texts: [text1, text2],
  summaryText,
  summaryList: [
    "Making this first true generator",
    "Many desktop publish packages",
    "Lorem Ipsum is not simply",
    "If you are going to passage",
    "It has roots in a piece",
  ],
  comments: [
    {
      id: 1,
      image: "comment-1-1.jpg",
      message:
        "Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
      sender: "David Marks",
      time: "3 hours ago",
    },
    {
      id: 2,
      image: "comment-1-2.jpg",
      message:
        "Sending love. My nephews Nick and Anthony Salaber are your teammates, so I know the caliber person you are. Our whole family is sending our best to you and your family.",
      sender: "Christine Eve",
      time: "3 hours ago",
    },
  ],
};
