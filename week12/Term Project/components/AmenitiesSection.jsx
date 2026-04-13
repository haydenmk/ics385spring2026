function AmenitiesSection({ amenities }) {
  return (
    <section className="amenities">
      <h2>Amenities</h2>
      <ul>
        {amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </section>
  );
}

export default AmenitiesSection;