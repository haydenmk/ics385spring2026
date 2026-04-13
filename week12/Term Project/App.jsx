import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import AmenitiesSection from "./components/AmenitiesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import heroImage from "./assets/sunset-beach.jpg";

function App() {
  const property = {
  name: "North Shore Family Vacation Rentals",
  island: "Oahu",
  tagline: "Relaxing North Shore stays designed for families with children.",
  imageURL: heroImage,
  description:
    "North Shore Family Vacation Rentals is a family-focused hospitality project featuring spacious vacation rentals across Oahu. Our goal is to provide families with children a comfortable, convenient, and welcoming place to stay while enjoying beaches, local dining, and attractions around the island, while being conveniently located in the North Shore.",
  targetSegment: "Families with children seeking spacious and convenient Oahu stays",
  amenities: [
    "Multiple beds",
    "Full kitchen",
    "Beach access",
    "Parking",
    "Wi-Fi",
    "Family-friendly living space"
  ],
  email: "haydenmk@hawaii.edu"
};

  return (
    <div className="app">
      <Header />
      <HeroSection
        name={property.name}
        island={property.island}
        tagline={property.tagline}
        imageURL={property.imageURL}
      />
      <AboutSection
        description={property.description}
        targetSegment={property.targetSegment}
      />
      <AmenitiesSection amenities={property.amenities} />
      <CTASection email={property.email} />
      <Footer />
    </div>
  );
}

export default App;