import IslandCard from "./IslandCard";
import Header from "./Header";

const islands = [
  {
    id: 1,
    name: "Maui",
    description:
      "Known as the Valley Isle, famous for Road to Hana and Haleakala.",
    tip: "Visit Haleakala crater at sunrise — arrive 30 min early.",
  },
  {
    id: 2,
    name: "Oahu",
    description: "Home to Honolulu, Waikiki Beach, and Pearl Harbor.",
    tip: "Take TheBus — it covers the entire island and is very affordable.",
  },
  {
    id: 3,
    name: "Kauai",
    description:
      "The Garden Isle, renowned for the Na Pali Coast and Waimea Canyon.",
    tip: "Bring good walking shoes for outdoor exploring.",
  },
];

function App() {
  return (
    <div className="app">
      <Header />
      <div className="card-container">
        {islands.map((island) => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>
    </div>
  );
}

export default App;
