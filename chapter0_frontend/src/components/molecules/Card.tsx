interface CardProps {
  title: string;
  items?: { id: string; name: string }[];
  onClick?: () => void;
}

const Card = ({ title, items, onClick }: CardProps) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
      {!isMobile ? (
        <div>
          <ul>
            {items?.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
