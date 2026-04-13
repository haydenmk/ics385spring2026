function AboutSection({ description, targetSegment }) {
  return (
    <section className="about">
      <h2>About</h2>
      <p>{description}</p>
      <p><strong>Ideal For:</strong> {targetSegment}</p>
    </section>
  );
}

export default AboutSection;