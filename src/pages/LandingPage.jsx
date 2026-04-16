import { useMemo, useState } from "react";

const services = [
  {
    title: "Collision Repair",
    tag: "Insurance-Ready",
    points: [
      "Body damage repair and precision frame straightening",
      "Factory-grade paint matching and refinishing",
      "Insurance coordination from estimate to delivery"
    ]
  },
  {
    title: "Paint & Refinishing",
    tag: "Sherwin-Williams",
    points: [
      "Advanced color match and blending",
      "Clear coat application for durable protection",
      "Detail-focused finish inspection before delivery"
    ]
  },
  {
    title: "Concierge Service",
    tag: "Convenience First",
    points: [
      "Vehicle pick-up and drop-off support",
      "Progress updates throughout your repair timeline",
      "Convenient scheduling for busy professionals"
    ]
  }
];

const testimonials = [
  {
    author: "Noemi T.",
    date: "03/07/26",
    source: "Google/Yelp Public Review",
    quote:
      "I truly recommend this place because they are fast and they do great work at a reasonable price. It is hard to find a reliable mechanic, but they are dependable."
  },
  {
    author: "Kristian C.",
    date: "08/01/24",
    source: "Google/Yelp Public Review",
    quote:
      "Had a vehicle repaired here recently and had a great experience. Fast, professional, and high-quality work. Vehicle looks like new."
  },
  {
    author: "Dexter B.",
    date: "06/11/24",
    source: "Google/Yelp Public Review",
    quote:
      "Very respectful and courteous team with excellent workmanship. I highly recommend them over any corporate body shop."
  }
];

const processSteps = [
  {
    title: "1. Quick Intake",
    copy: "Share damage photos and your preferred schedule. We handle the next steps immediately."
  },
  {
    title: "2. Insurance + Repair Plan",
    copy: "Our team coordinates with your insurance carrier and provides a transparent repair timeline."
  },
  {
    title: "3. Delivery Ready",
    copy: "Final quality checks, paint verification, and clean handoff with pickup or drop-off support."
  }
];

const faqItems = [
  {
    question: "Do you work with my insurance company?",
    answer:
      "Yes. We work with all major insurance providers and guide you through documentation and approvals."
  },
  {
    question: "How long does collision repair usually take?",
    answer:
      "Timelines depend on parts and damage severity, but we provide regular status updates from intake through delivery."
  },
  {
    question: "Can I get pickup and delivery service?",
    answer:
      "Yes. Our concierge option includes pickup and delivery support designed for busy schedules."
  },
  {
    question: "Do you provide paint and refinishing?",
    answer:
      "Absolutely. We perform color matching and refinishing with premium Sherwin-Williams products."
  }
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  message: ""
};

export default function LandingPage() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const year = useMemo(() => new Date().getFullYear(), []);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = new URLSearchParams(formData);
      const response = await fetch("send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload.toString()
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      window.location.assign("thank-you.html");
    } catch (error) {
      setSubmitError("We could not send your request. Please call us directly at (770) 755-0042.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="container topbar-inner">
          <p>Collision + Concierge Service in Marietta, GA</p>
          <a href="tel:+17707550042">Call (770) 755-0042</a>
        </div>
      </div>

      <nav className="navbar">
        <div className="container nav-inner">
          <a href="index.html" className="brand">
            PRO FIX COLLISION
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#reviews">Reviews</a>
            <a href="#lead-form" className="btn btn-primary btn-small">
              Free Estimate
            </a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-left">
            <p className="eyebrow">Pro Fix Auto Repair & Collision</p>
            <h1>Collision Repair and Concierge Service in Marietta, GA</h1>
            <p className="hero-copy">
              We restore your vehicle to pre-accident condition with skilled craftsmanship,
              transparent communication, and concierge-level convenience from start to finish.
            </p>
            <div className="hero-badges">
              <span>5-Star Local Reputation</span>
              <span>Insurance Claim Support</span>
              <span>Pickup & Delivery Available</span>
            </div>
            <div className="hero-actions">
              <a href="#lead-form" className="btn btn-primary">
                Get a Free Estimate
              </a>
              <a href="tel:+17707550042" className="btn btn-secondary">
                Call (770) 755-0042
              </a>
            </div>
            <div className="stat-row">
              <div className="stat-card">
                <strong>5.0</strong>
                <span>Customer Rating</span>
              </div>
              <div className="stat-card">
                <strong>All Major</strong>
                <span>Insurance Carriers</span>
              </div>
              <div className="stat-card">
                <strong>Mon-Fri</strong>
                <span>7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
          <div className="hero-card hero-float-card">
            <h2>Fast Start Concierge Intake</h2>
            <p>
              Tell us what happened and we will call with next-step guidance. Priority response
              during business hours.
            </p>
            <div className="hero-mini-grid">
              <div>
                <span>Response Window</span>
                <strong>Same Day</strong>
              </div>
              <div>
                <span>Claim Support</span>
                <strong>Included</strong>
              </div>
            </div>
            <a href="#lead-form" className="btn btn-secondary full-width">
              Start Your Estimate
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="services">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow dark">Trusted Repair Capabilities</p>
              <h2>High-Quality Services</h2>
              <p className="section-intro">
                From impact damage and frame correction to refinishing and concierge pickup,
                everything is built around quality, speed, and clear communication.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <p className="service-tag">{service.tag}</p>
                  <h3>{service.title}</h3>
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="process">
          <div className="container">
            <h2>Simple 3-Step Repair Experience</h2>
            <div className="process-grid">
              {processSteps.map((step) => (
                <article key={step.title} className="process-card">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-soft" id="reviews">
          <div className="container">
            <div className="section-heading centered">
              <h2>What Customers Say</h2>
            </div>
            <div className="reviews-shell">
              <div className="reviews-head">
                <div className="reviews-google">
                  <span className="google-wordmark" aria-label="Google">
                    <span className="g-blue">G</span>
                    <span className="g-red">o</span>
                    <span className="g-yellow">o</span>
                    <span className="g-blue">g</span>
                    <span className="g-green">l</span>
                    <span className="g-red">e</span>
                  </span>
                  <span>Reviews</span>
                  <strong>5.0</strong>
                  <span className="stars">★★★★★</span>
                </div>
                <a
                  href="https://share.google/4eVzMNt7rcRwxXTKs"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark btn-small"
                >
                  Review us on Google
                </a>
              </div>
              <div className="review-grid">
                {testimonials.map((item) => (
                  <article key={item.author} className="review-card">
                    <div className="review-meta">
                      <p className="review-author">{item.author}</p>
                      <span>{item.date}</span>
                    </div>
                    <p className="stars">★★★★★</p>
                    <p className="quote">"{item.quote}"</p>
                    <p className="source">{item.source}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-estimate" id="lead-form">
          <div className="container estimate-shell">
            <div className="estimate-panel">
              <p className="eyebrow">Fast Estimate Request</p>
              <h2>Request Your Collision Estimate</h2>
              <p className="estimate-description">
                Send a few details now and our team will call you with next steps, timeline, and
                claim guidance.
              </p>
              <div className="estimate-points">
                <div className="estimate-point">
                  <span className="estimate-point-number">01</span>
                  <div>
                    <p>Quick response</p>
                    <small>Same-day callback during business hours</small>
                  </div>
                </div>
                <div className="estimate-point">
                  <span className="estimate-point-number">02</span>
                  <div>
                    <p>Insurance support</p>
                    <small>We help with claim workflow and documentation</small>
                  </div>
                </div>
                <div className="estimate-point">
                  <span className="estimate-point-number">03</span>
                  <div>
                    <p>Concierge options</p>
                    <small>Pickup and delivery available by schedule</small>
                  </div>
                </div>
              </div>
            </div>
            <form className="lead-form elevated" onSubmit={onSubmit}>
              <div className="form-meta">
                <span className="form-chip">2-Minute Form</span>
                <span className="form-chip">No Obligation</span>
              </div>
              <p className="form-title">Get Started Now</p>
              <p className="form-subtitle">
                Fill out this form and a collision specialist will contact you shortly.
              </p>
              <div className="field-grid">
                <label>
                  Full Name *
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={onInputChange}
                  />
                </label>
                <label>
                  Phone *
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={onInputChange}
                  />
                </label>
              </div>
              <div className="field-grid">
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                  />
                </label>
                <label>
                  Vehicle (Year/Make/Model)
                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={onInputChange}
                  />
                </label>
              </div>
              <label>
                Repair Details *
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={onInputChange}
                />
              </label>
              {submitError ? <p className="error-text">{submitError}</p> : null}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {faqItems.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <p className="footer-title">Pro Fix Auto Repair & Collision Inc.</p>
            <p>1460 Roswell Rd, Marietta, GA 30062</p>
          </div>
          <div>
            <p>Phone: (770) 755-0042</p>
            <p>Email: info@profixautomotive.net</p>
          </div>
          <p className="copyright">© {year} Pro Fix Auto Repair & Collision</p>
        </div>
      </footer>
    </div>
  );
}
