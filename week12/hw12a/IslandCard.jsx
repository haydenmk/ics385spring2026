function IslandCard({ name, description, tip }) {
  return (
    <div className="island-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>
        <strong>Visitor Tip:</strong> {tip}
      </p>
    </div>
  );
}

export default IslandCard;
