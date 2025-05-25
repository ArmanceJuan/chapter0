const CharacterView = ({ data }: { data: any }) => {
  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <div className="view-container__header">
            <h1>{item.name}</h1>
            {item.imageUrl && (
              <img
                className="view-container__image"
                src={item.imageUrl}
                alt={item.name}
              />
            )}
          </div>
          <div className="view-container__infos">
            <div>
              <h3>Age</h3>
              <p>{item.age}</p>
            </div>
            <div>
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <h3>Histoire</h3>
              <p>{item.history}</p>
            </div>
            <div>
              <h3>Psychological Profile</h3>
              <p>{item.psychologicalProfile}</p>
            </div>
            <div>
              <h3>Relationships</h3>
              <p>{item.relationships}</p>
            </div>
            <div className="view-container__infos__item">
              <h4>Informations</h4>
              <span>Status : {item.status ? "Actif" : "Inactif"}</span>
              <span>Créé le {item.createdAt}</span>
              <span>Modifié le {item.updatedAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CharacterView;
