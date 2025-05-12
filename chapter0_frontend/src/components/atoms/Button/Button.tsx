type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: Props) => {
  return <button {...props}>{children}</button>;
};

export default Button;
