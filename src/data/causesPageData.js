import { useDonations } from "@/context/DonationContext";

export function useCausesPageData() {
  const { totalDonations } = useDonations();
  console.log("CausesPage - Total Donations:", totalDonations);

  return [
    {
      id: 1,
      image: "causes-details-img-1.jpg",
      category: "Animal Welfare",
      title: "Yolo County SPCA Community Cat Kindness Fund",
      description:
        "The Community Cat Kindness Fund has been set up by the Yolo County SPCA to help provide care for community cats including veterinary care and humane euthanasia when needed for medical reasons. Even with discounted services, paying for the veterinary care for community cats is often a hardship on volunteers. This fund will help caring cat lovers to assist community cats in need. All contributors will receive a thank you from the Yolo County SPCA with a tax-deductible receipt. ",
      raised: totalDonations ? totalDonations.toString() : "0",
      goal: "300000",
      targetPublicKey: "CAvCqZP5xqk7E9baKSvAoFZazYYjNbgrgtnDicVMb25i"
    },
    {
      id: 2,
      image: "causes-page-img-2.jpg",
      category: "Children",
      title: "CASA of Sacramento County - Making Memories",
      description: "Get children food",
      raised: "25,270",
      goal: "2000",
      targetPublicKey: "2sSeBbvCLfHMNKgJr1MzQaaDTxoYES2UZpFxNQt8xHXJ"
    },
    {
      id: 3,
      image: "causes-page-img-3.jpg",
      category: "Education",
      title: "The Educational Opportunity Program (EOP) at UC Davis",
      description: "Get children Education",
      raised: "25,270",
      goal: "30",
      targetPublicKey: "G1paLjaCpjbeAQCtbsSrXcFtYWwiSzYVRU8o96cBru8h"
    },
    // {
    //   id: 4,
    //   image: "causes-page-img-4.jpg",
    //   category: "Medical",
    //   title: "Promoting The Rights of Children",
    //   description:
    //     "There are not many of passages of lorem ipsum avail isn alteration donationa in form simply free.",
    //   raised: "25,270",
    //   goal: "30,000",
    // },
    // {
    //   id: 5,
    //   image: "causes-page-img-5.jpg",
    //   category: "Medical",
    //   title: "Fundrising for Early Childhood Rise",
    //   description:
    //     "There are not many of passages of lorem ipsum avail isn alteration donationa in form simply free.",
    //   raised: "25,270",
    //   goal: "30,000",
    // },
    // {
    //   id: 6,
    //   image: "causes-page-img-6.jpg",
    //   category: "Medical",
    //   title: "School Counseling for Children",
    //   description:
    //     "There are not many of passages of lorem ipsum avail isn alteration donationa in form simply free.",
    //   raised: "25,270",
    //   goal: "30,000",
    // },
  ];
}
