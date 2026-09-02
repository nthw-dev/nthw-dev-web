import About from "./_components/About";
import Background from "./_components/Background";
import Contact from "./_components/Contact";
import DevCatMascot from "./_components/DevCatMascot";
import Experience from "./_components/Experience";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Nav from "./_components/Nav";
import Skills from "./_components/Skills";
import { education, experiences, profile, skills } from "~/data/resume";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: profile.websiteUrl,
  image: `${profile.websiteUrl}${profile.avatar}`,
  sameAs: [profile.githubUrl, profile.linkedinUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangkok",
    addressCountry: "TH",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  worksFor: { "@type": "Organization", name: experiences[0]?.company },
  knowsAbout: skills.flatMap((g) => g.items),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled data — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <a
        href="#about"
        className="focus:bg-accent-500 focus:text-ink-950 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
      <DevCatMascot />
    </>
  );
}
