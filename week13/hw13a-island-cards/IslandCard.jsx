export default function IslandCard({ name, nickname, segment, avgStay, img }) {
  return (
    <div className="island-card">
      <img src={img} alt={`${name} — ${nickname} island photo`} />
      <h2>{name}</h2>
      <p className="nickname">{nickname}</p>
      <p className="segment-badge">{segment}</p>
      <p className="avg-stay">Average stay: {avgStay} days</p>
    </div>
  );
}