import { Metadata } from "next";
import HeroSection from "@/components/heroSection/heroSection";
import ContentSection from "@/components/aboutSection/aboutSection";
import FeaturesSection from "@/components/servicesSection/servicesSection";
import TestimonialsSection from "@/components/testimonialsSection/testimonialsSection";
import ContactSection from "@/components/contactSection/contactSection";
import { generateBreadcrumbJsonLd, generatePageMetadata } from "@/lib/seo-config";
import { siteConfig } from "@/config/site";

// Page-specific metadata for home page
export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata(
  `${siteConfig.name} - Global Business Solutions`,
  siteConfig.description,
  "/",
  [
    siteConfig.name,
    "business consulting",
    "marketing solutions",
    "logistics services",
    "global business solutions",
    "startup consulting",
    "SME solutions",
    "corporate consulting",
    "business growth",
    "digital transformation",
  ]
)

// Home page breadcrumb
const homeBreadcrumb = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
]);

export default function Home() {
  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeBreadcrumb),
        }}
      />
      <div>
        <HeroSection />
        <ContentSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
}
