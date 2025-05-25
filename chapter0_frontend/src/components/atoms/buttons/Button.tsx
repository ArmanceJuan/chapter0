type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: Props) => {
  return (
    <button className={`${props.className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
