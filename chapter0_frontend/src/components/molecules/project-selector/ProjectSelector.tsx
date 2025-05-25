import Select from "../../atoms/Select";

type Props = {
  projects: { id: string; name: string }[];
  selectedId: string;
  onChange: (id: string) => void;
};

const ProjectSelector = ({ projects, selectedId, onChange }: Props) => {
  return (
    <div>
      <Select
        options={projects.map((project) => ({
          label: project.name,
          value: project.id,
        }))}
        value={selectedId}
        onChange={onChange}
        placeholder="Choisissez un projet"
      />
    </div>
  );
};

export default ProjectSelector;
