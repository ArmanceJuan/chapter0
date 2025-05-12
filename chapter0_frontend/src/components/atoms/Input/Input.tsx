type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ children, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={props.id}>{children}</label>
      <input {...props} />
    </div>
  );
};

export default Input;
