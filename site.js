document.querySelectorAll("[data-year]").forEach((el)=>el.textContent=new Date().getFullYear());

const schedule = window.AYC_SCHEDULE;
if (schedule) {
  document.querySelectorAll("[data-regular-hours]").forEach((container) => {
    container.innerHTML = schedule.regularHours.map(({ day, hours }) => `
      <div class="hours-row">
        <dt>${day}</dt>
        <dd>${hours.map((time) => `<span>${time}</span>`).join("")}</dd>
      </div>
    `).join("");
  });

  document.querySelectorAll("[data-month-changes]").forEach((container) => {
    const currentMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: schedule.timeZone
    }).format(new Date());
    const heading = container.closest(".schedule-changes")?.querySelector("[data-current-month]");
    if (heading) heading.textContent = currentMonth;

    if (!schedule.changes.length) {
      container.innerHTML = '<p class="no-schedule-changes">No schedule changes this month. Regular adjusting hours apply.</p>';
      return;
    }

    container.innerHTML = schedule.changes.map(({ date, details }) => `
      <article class="schedule-change-card">
        <h3>${date}</h3>
        ${details.map((line) => `<p>${line}</p>`).join("")}
      </article>
    `).join("");
  });
}

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
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "11:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "15:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "15:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "11:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "15:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "15:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "06:30", closes: "08:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "10:30" }
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
