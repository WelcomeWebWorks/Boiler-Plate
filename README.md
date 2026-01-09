# Next.js Corporate Website Boilerplate

A modern, production-ready boilerplate for building corporate websites and landing pages. Built with Next.js 15, React 19, Sanity CMS, Tailwind CSS v4, and Shadcn/UI.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 (App Router), React 19, TypeScript.
- **CMS Integrated**: Sanity CMS for managing content (Blogs, Services, Global Settings).
- **Styling**: Tailwind CSS v4 + Shadcn/UI components.
- **SEO Optimized**: Dynamic metadata, Open Graph images, JSON-LD schema, Sitemap, and Robots.txt.
- **Performance**: Optimized images, font loading, and script management.
- **Analytics**: Google Analytics 4 integration with Cookie Consent.
- **Developer Experience**: Plop.js component generator, Husky pre-commit hooks, Smoke tests.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: React Hook Form + Zod
- **Testing**: Playwright (E2E/Smoke)

## 🏢 Default Branding (Dummy Data)

The project comes pre-configured with the following placeholder information. **You should update these immediately upon determining your client's details.**

- **Company Name**: Company Name
- **Email**: companyemail@gmail.com
- **Phone**: +91 01234 56789
- **Address**: Company Address
- **Domain**: www.companydomain.com

## ⚙️ Setup & Usage

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Configuration

**Branding & SEO Settings**:
Edit `config/site.ts` to update global company details. This single file controls branding across the header, footer, contact forms, and SEO metadata.

```typescript
// config/site.ts
export const siteConfig = {
  name: "My Client Company",
  url: "https://www.client-domain.com",
  contact: {
    email: "info@client-domain.com",
    // ...
  }
}
```

**CMS Settings**:
1. Run `pnpm dev` and visit `/studio`.
2. Go to the "Site Settings" document.
3. Upload the actual logo, light logo, and set social links.

### 4. Component Generation

Use the included generator to create new components:

```bash
pnpm generate
```

## 🔍 SEO & Customization

- **Metadata**: Managed in `lib/seo-config.ts` which consumes `config/site.ts`.
- **Open Graph**: Dynamic OG images are generated via `app/api/og`.
- **Sitemap**: Automatically generated at `/sitemap.xml` based on CMS content.

**How to Debrand/Rebrand:**
1. Update `config/site.ts`.
2. Update `public/manifest.json` (static file).
3. Update Sanity "Site Settings" in the Studio.
4. Replace `public/logo.png` and `public/og-image.png` (if used as fallbacks).

## ✅ Best Practices

- **Images**: Always use the `Next/Image` component.
- **Icons**: Use `lucide-react` icons.
- **Colors**: Define theme colors in `app/globals.css` (CSS variables).
- **Fonts**: Configure fonts in `app/layout.tsx`.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).