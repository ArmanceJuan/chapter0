type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const AuthenticateButton = ({ children, ...props }: Props) => {
  return <button {...props}>{children}</button>;
};

export default AuthenticateButton;
