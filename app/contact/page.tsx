import ContactHeroSection from "@/components/sections/ContactHeroSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import { contactApi, getPageMetadata } from "@/lib/api";
import type { Metadata } from "next";

const SITE_NAME = "Malik Seeds";

export async function generateMetadata(): Promise<Metadata> {
  let fallback: Metadata = {
    title: "Contact Us - Malik Seeds",
    description:
      "Get in touch with Malik Seeds. Have questions, inquiries or partnership proposals? Reach out to our head office or send us a message.",
  };

  try {
    const data = await contactApi.getContact({ revalidate: 60 });
    if (data) {
      fallback = {
        title: `${data.title} - ${SITE_NAME}`,
        description: data.description || "Get in touch with Malik Seeds.",
      };
    }
  } catch (err) {
    console.error("Failed to fetch contact page metadata from API:", err);
  }

  return getPageMetadata("/contact", fallback, { revalidate: 60 });
}


export default async function ContactPage() {
  let apiData = null;

  try {
    apiData = await contactApi.getContact({ revalidate: 60 });
  } catch (err) {
    console.error("Failed to fetch contact page data from API:", err);
  }
  return (
    <>
      <ContactHeroSection apiData={apiData} />
      <JoinTeamSection />
    </>
  );
}

