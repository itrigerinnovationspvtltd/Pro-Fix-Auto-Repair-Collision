import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submitted",
      page_type: "thank_you",
      form_name: "collision_concierge_lead_form"
    });
  }, []);

  return (
    <main className="thank-you-page">
      <div className="thank-you-card">
        <p className="eyebrow">Message Received</p>
        <h1>Thank you for contacting Pro Fix</h1>
        <p>
          A team member will contact you shortly to confirm details and next steps for your
          vehicle.
        </p>
        <div className="hero-actions">
          <a href="index.html" className="btn btn-primary">
            Back to Home
          </a>
          <a href="tel:+17707550042" className="btn btn-secondary">
            Call Now
          </a>
        </div>
      </div>
    </main>
  );
}
