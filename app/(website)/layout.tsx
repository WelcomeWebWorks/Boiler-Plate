import { HeroHeader } from "@/components/navBar/header";
import { siteConfig } from "@/config/site";
import Footer from "@/components/footer/footer";
import PopupWrapper from "@/components/popup/PopupWrapper";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
        logo,
        logoLight,
        companyName
    }`
  return await client.fetch(query)
}

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings()

  const logoUrl = siteSettings?.logo?.asset ? urlFor(siteSettings.logo).url() : null
  const logoLightUrl = siteSettings?.logoLight?.asset ? urlFor(siteSettings.logoLight).url() : null
  const companyName = siteSettings?.companyName || siteConfig.name

  return (
    <>
      <HeroHeader
        logoUrl={logoUrl}
        logoLightUrl={logoLightUrl}
        companyName={companyName}
      />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer
        logoUrl={logoUrl}
        logoLightUrl={logoLightUrl}
        companyName={companyName}
      />
      <PopupWrapper />
    </>
  );
}
