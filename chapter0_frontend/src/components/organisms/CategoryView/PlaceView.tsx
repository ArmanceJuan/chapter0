const PlaceView = ({ data }: { data: any }) => {
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
              <h3>Lieux</h3>
              <p>{item.location}</p>
            </div>
            <div>
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <h3>History</h3>
              <p>{item.history}</p>
            </div>
            <div>
              <h4>Informations</h4>
              <p>Crée le : {item.createdAt}</p>
              <p>Mis à jour le : {item.updatedAt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PlaceView;
