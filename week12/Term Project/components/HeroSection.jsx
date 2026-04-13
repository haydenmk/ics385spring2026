function HeroSection({ name, island, tagline, imageURL }) {
  return (
    <section className="hero">
      <img src={imageURL} alt={`${name} in ${island}`} className="hero-image" />
      <div className="hero-text">
        <h1>{name}</h1>
        <h3>{island}</h3>
        <p>{tagline}</p>
      </div>
    </section>
  );
}

export default HeroSection;