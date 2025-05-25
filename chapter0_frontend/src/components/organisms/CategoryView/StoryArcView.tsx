const StoryArcView = ({ data }: { data: any }) => {
  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <div className="view-container__header">
            <h1>{item.name}</h1>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
          </div>
          <div className="view-container__infos">
            <div>
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <h3>Arcs liées</h3>
              <p>{item.linkedArcs}</p>
            </div>
            <div>
              <h4>Informations</h4>
              <p>Status : {item.status ? "Actif" : "Inactif"}</p>
              <p>Crée le : {item.createdAt}</p>
              <p>Mis à jour le : {item.updatedAt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryArcView;
