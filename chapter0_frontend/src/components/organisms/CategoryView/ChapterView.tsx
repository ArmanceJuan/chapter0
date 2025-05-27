const ChapterView = ({ data }: { data: any }) => {
  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>
          <div className="view-container__header">
            <h1>Chapitre n°{item.number}</h1>
            <h2>{item.name}</h2>
          </div>
          <div className="view-container__infos">
            <div>
              <h3>Contenu</h3>
              <p>{item.content}</p>
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

export default ChapterView;
