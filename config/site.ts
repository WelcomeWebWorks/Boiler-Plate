export const siteConfig = {
    name: "Company Name",
    url: "https://www.companydomain.com",
    ogImage: "https://www.companydomain.com/og.jpg",
    description:
        "Your company description goes here. This is a boilerplate for building modern websites with Next.js and Sanity.",
    links: {
        twitter: "https://twitter.com/company",
        github: "https://github.com/company",
        instagram: "https://instagram.com/company",
        facebook: "https://facebook.com/company",
        linkedin: "https://linkedin.com/company",
    },
    contact: {
        email: "companyemail@gmail.com",
        phone: "+91 01234 56789",
        address: "Company Address, City, Country",
    },
}

export type SiteConfig = typeof siteConfig
