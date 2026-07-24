document.querySelectorAll("[data-year]").forEach((el)=>el.textContent=new Date().getFullYear());

const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["Chiropractor", "MedicalBusiness"],
  "@id": "https://aboutyouchiro.com/#practice",
  name: "About You Chiropractic",
  url: "https://aboutyouchiro.com/",
  telephone: "+1-732-583-0600",
  foundingDate: "1984",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "245 Main Street, Suite 2M",
    addressLocality: "Matawan",
    addressRegion: "NJ",
    postalCode: "07747",
    addressCountry: "US"
  },
  hasMap: "https://www.google.com/maps/search/?api=1&query=About+You+Chiropractic+245+Main+Street+Suite+2M+Matawan+NJ+07747",
  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=About+You+Chiropractic+Matawan+NJ",
    "https://www.instagram.com/aboutyouchiro/",
    "https://www.facebook.com/aboutyouchiro/"
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:45", closes: "11:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "14:45", closes: "18:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "14:45", closes: "18:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:45", closes: "11:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "14:45", closes: "18:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "14:45", closes: "18:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "09:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:15", closes: "10:45" }
  ]
};
const businessSchema = document.createElement("script");
businessSchema.type = "application/ld+json";
businessSchema.textContent = JSON.stringify(localBusiness);
document.head.appendChild(businessSchema);

const visibleFaqs = [...document.querySelectorAll(".faq-list details")].map((item) => ({
  "@type": "Question",
  name: item.querySelector("summary")?.textContent?.trim(),
  acceptedAnswer: {
    "@type": "Answer",
    text: item.querySelector("p")?.textContent?.trim()
  }
})).filter((item) => item.name && item.acceptedAnswer.text);
if (visibleFaqs.length) {
  const faqSchema = document.createElement("script");
  faqSchema.type = "application/ld+json";
  faqSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleFaqs
  });
  document.head.appendChild(faqSchema);
}
