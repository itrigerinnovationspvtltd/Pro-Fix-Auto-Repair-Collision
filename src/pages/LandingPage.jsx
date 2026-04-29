import { useEffect, useMemo, useRef, useState } from "react";
import brandLogo from "../assets/pro-fix-logo.png";
import heroShopImage from "../assets/pro-fix-hero-shop.png";
import certLucid from "../assets/cert-lucid.png";
import certBmw from "../assets/cert-bmw.png";
import certRivian from "../assets/cert-rivian.png";
import certTesla from "../assets/cert-tesla.png";
import certMercedes from "../assets/cert-mercedes.png";

const services = [
  {
    title: "Collision Repair",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Body damage repair",
      "Frame straightening",
      "Dent and scratch removal"
    ]
  },
  {
    title: "Auto Repairs",
    image: heroShopImage,
    points: [
      "Engine diagnostics and repair",
      "Exhaust system repairs"
    ]
  },
  {
    title: "Routine Maintenance",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Oil changes",
      "Tire rotations",
      "Fluid checks and refills",
      "Brake inspections and repairs"
    ]
  },
  {
    title: "Air Conditioning & Heating",
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=80",
    points: [
      "A/C diagnostics and recharge",
      "Heater repair",
      "Climate control system services"
    ]
  },
  {
    title: "Paint & Refinishing",
    image: heroShopImage,
    points: [
      "Using top-quality Sherwin Williams products",
      "Color matching and custom finishes",
      "Clear coat application for enhanced durability"
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

const heroSlides = [
  {
    title: "UNIQUE EYE FOR DETAIL",
    subtitle: "Luxury Collision Repair + Concierge Care",
    cta: "REQUEST SERVICE",
    image: heroShopImage
  }
];

const certifiedBrands = [
  {
    title: "Tesla",
    subtitle: "Approved Body Shop",
    image: certTesla
  },
  {
    title: "Rivian",
    subtitle: "Collision Network",
    image: certRivian
  },
  {
    title: "Lucid",
    subtitle: "Collision Center",
    image: certLucid
  },
  {
    title: "BMW",
    subtitle: "Collision Repair Center",
    image: certBmw,
    wide: true
  },
  {
    title: "Mercedes-Benz",
    subtitle: "Collision Center",
    image: certMercedes,
    wide: true
  }
];

export default function LandingPage() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceSlideIndex, setServiceSlideIndex] = useState(0);
  const [servicesAutoPlayPaused, setServicesAutoPlayPaused] = useState(false);
  const servicesSliderRef = useRef(null);

  const year = useMemo(() => new Date().getFullYear(), []);
  const totalServiceSlides = services.length + 1;

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

  const previousSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const onServiceImageError = (event) => {
    if (event.currentTarget.src.includes("pro-fix-hero-shop")) {
      return;
    }

    event.currentTarget.src = heroShopImage;
  };

  const previousServiceSlide = () => {
    setServiceSlideIndex((current) => (current - 1 + totalServiceSlides) % totalServiceSlides);
  };

  const nextServiceSlide = () => {
    setServiceSlideIndex((current) => (current + 1) % totalServiceSlides);
  };

  useEffect(() => {
    const slider = servicesSliderRef.current;

    if (!slider) {
      return;
    }

    const slides = slider.querySelectorAll(".service-showcase-card");
    const targetSlide = slides[serviceSlideIndex];

    if (targetSlide) {
      const targetOffset = targetSlide.offsetLeft - slider.offsetLeft;
      slider.scrollTo({
        left: targetOffset,
        behavior: "smooth"
      });
    }
  }, [serviceSlideIndex]);

  useEffect(() => {
    if (servicesAutoPlayPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setServiceSlideIndex((current) => (current + 1) % totalServiceSlides);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [servicesAutoPlayPaused, totalServiceSlides]);

  return (
    <div className="page page-has-aside">
      <aside className={`hero-side-menu ${mobileMenuOpen ? "menu-open" : ""}`}>
        <div className="side-menu-head">
          <a href="#top" className="side-brand" onClick={closeMobileMenu}>
            <img src={brandLogo} alt="Pro Fix Auto Repair & Collision" />
          </a>
          <button
            type="button"
            className="side-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle site navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <div className="side-menu-drawer">
          <nav className="side-nav">
            <a href="#about" onClick={closeMobileMenu}>
              About
            </a>
            <a href="#brand-certified" onClick={closeMobileMenu}>
              Brands We Service
            </a>
            <a href="#services" onClick={closeMobileMenu}>
              Services
            </a>
            <a href="#reviews" onClick={closeMobileMenu}>
              Reviews
            </a>
            <a href="#lead-form" onClick={closeMobileMenu}>
              Contact
            </a>
          </nav>
          <a href="tel:+17707550042" className="side-phone" onClick={closeMobileMenu}>
            <span>Call Us</span>
            <strong>(770) 755-0042</strong>
          </a>
        </div>
      </aside>

      <header className="brand-hero" id="top">
        <div className="brand-hero-slider">
          {heroSlides.map((slide, index) => (
            <article
              key={slide.title}
              className={`brand-hero-slide ${index === activeSlide ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={index !== activeSlide}
            >
              <div className="brand-hero-overlay" />
              <div className="brand-hero-content">
                <img src={brandLogo} alt="Pro Fix Auto Repair & Collision logo" />
                <p>{slide.subtitle}</p>
                <h1>{slide.title}</h1>
                <a href="#lead-form" className="btn btn-primary">
                  {slide.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
        {heroSlides.length > 1 ? (
          <>
            <div className="brand-hero-controls">
              <button type="button" onClick={previousSlide} aria-label="Previous hero slide">
                &#8592;
              </button>
              <button type="button" onClick={nextSlide} aria-label="Next hero slide">
                &#8594;
              </button>
            </div>
            <div className="brand-hero-pagination" aria-label="Hero slide numbers">
              {heroSlides.map((_, index) => (
                <button
                  type="button"
                  key={`slide-${index + 1}`}
                  className={index === activeSlide ? "active" : ""}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </header>

      <main>
        <section className="section section-about" id="about">
          <div className="container about-grid">
            <article className="about-content">
              <p className="about-stars" aria-label="Five star service">
                ★★★★★
              </p>
              <p className="about-kicker">Pro Fix Auto Repair & Collision</p>
              <h2>Enjoy a Tailored Collision Repair Experience</h2>
              <p>
                Welcome to one of Marietta's trusted collision centers. Our experienced customer
                service team keeps you updated at every step, while skilled technicians restore your
                vehicle with precision and care.
              </p>
              <p>
                From state-of-the-art equipment to detail-focused craftsmanship, we deliver
                high-quality repairs from start to finish so you can return to the road with
                confidence.
              </p>
            </article>
            <aside className="about-badge-wrap" aria-label="Trusted quality message">
              <div className="about-badge">
                <span className="about-badge-top">TRUSTED</span>
                <strong>GOLD CLASS</strong>
                <span className="about-badge-bottom">Collision Repair Excellence</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section-certified" id="brand-certified">
          <div className="container">
            <div className="certified-head">
              <p className="certified-kicker">Pro Fix Auto Repair & Collision</p>
              <h2>Brands We Service</h2>
            </div>
            <div className="certified-grid">
              {certifiedBrands.map((brand) => (
                <article
                  key={brand.title}
                  className={`certified-card ${brand.wide ? "wide" : ""}`}
                  aria-label={`${brand.title} ${brand.subtitle}`}
                >
                  <div className="certified-card-media">
                    <img src={brand.image} alt={`${brand.title} brand logo`} />
                  </div>
                  <div className="certified-card-footer">
                    <p>{brand.subtitle}</p>
                    <strong>{brand.title}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-services-dark" id="services">
          <div className="container">
            <div className="certified-head services-head">
              <p className="certified-kicker">High Quality</p>
              <h2>Services</h2>
            </div>
            <div
              className="services-slider"
              ref={servicesSliderRef}
              onMouseEnter={() => setServicesAutoPlayPaused(true)}
              onMouseLeave={() => setServicesAutoPlayPaused(false)}
              onTouchStart={() => setServicesAutoPlayPaused(true)}
              onTouchEnd={() => setServicesAutoPlayPaused(false)}
            >
              <article className="service-showcase-card services-contact-slide">
                <div className="service-card-body">
                  <p className="services-contact-kicker">Tailored Support</p>
                  <h3>Need Help Choosing the Right Service?</h3>
                  <p className="services-contact-copy">
                    Speak with our team and get expert guidance based on your vehicle and repair
                    needs.
                  </p>
                  <a href="tel:+17707550042" className="services-callout">
                    <span>For Information</span>
                    <strong>(770) 755-0042</strong>
                  </a>
                  <a href="tel:+17707550042" className="service-card-call">
                    Call Us
                  </a>
                </div>
              </article>
              {services.map((service, index) => (
                <article key={service.title} className="service-showcase-card">
                  <div className="service-card-top">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading={index > 1 ? "lazy" : "eager"}
                      onError={onServiceImageError}
                    />
                  </div>
                  <div className="service-card-body">
                    <h3>{service.title}</h3>
                    <ul>
                      {service.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <a href="tel:+17707550042" className="service-card-call">
                      Call Us
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="services-slider-controls">
              <button type="button" onClick={previousServiceSlide} aria-label="Previous service slide">
                &#8592;
              </button>
              <button type="button" onClick={nextServiceSlide} aria-label="Next service slide">
                &#8594;
              </button>
            </div>
            <div className="services-slider-dots" aria-label="Service slider pages">
              {Array.from({ length: totalServiceSlides }, (_, index) => (
                <button
                  type="button"
                  key={`service-slide-${index + 1}`}
                  className={serviceSlideIndex === index ? "active" : ""}
                  onClick={() => setServiceSlideIndex(index)}
                  aria-label={`Go to service slide ${index + 1}`}
                />
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

        <section className="section section-faq-theme">
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
            <img src={brandLogo} alt="Pro Fix Auto Repair & Collision logo" className="footer-logo" />
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

      <a href="tel:+17707550042" className="floating-call-button" aria-label="Call Pro Fix Auto Repair">
        Call Us
      </a>
    </div>
  );
}
