type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = ({ children, ...props }: Props) => {
  return (
    <div className="input-container" style={{ width: "100%" }}>
      <label htmlFor={props.id || props.name}>{children || ""}</label>
      <input {...props} className="input-container__input" />
    </div>
  );
};

export default Input;
