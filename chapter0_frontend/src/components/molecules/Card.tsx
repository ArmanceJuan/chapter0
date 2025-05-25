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
    </div>
  );
};

export default Card;
