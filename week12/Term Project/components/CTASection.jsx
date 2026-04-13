function CTASection({ email }) {
  return (
    <section className="cta">
      <h2>Plan Your Family Stay</h2>
      <p>Contact us today to learn more about available North Shore vacation rentals.</p>
      <a href={`mailto:${email}`} className="cta-button">Contact Us</a>
    </section>
  );
}

export default CTASection;