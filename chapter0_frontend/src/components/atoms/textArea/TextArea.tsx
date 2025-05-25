type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const TextArea = ({ children, ...props }: Props) => {
  return (
    <div className="area-container">
      <label htmlFor={props.id || props.name}>{children}</label>
      <textarea {...props} className="area-container__textarea" />
    </div>
  );
};

export default TextArea;
