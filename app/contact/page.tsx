import ContactHeroSection from "@/components/sections/ContactHeroSection";
import JoinTeamSection from "@/components/sections/JoinTeamSection";

export const metadata = {
  title: "Contact Us — Malik Seeds",
  description:
    "Get in touch with Malik Seeds. Have questions, inquiries or partnership proposals? Reach out to our head office or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <JoinTeamSection />
    </>
  );
}
