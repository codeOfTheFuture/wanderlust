import { signIn as SignInToProvider } from "next-auth/react";

interface Props {
  provider: any;
  text: string;
  btnStyles: string;
  type: "submit" | undefined;
}

const Button: React.FC<Props> = (props) => {
  const { provider, btnStyles, type, text, } = props;

  return provider ? (
    <button className={btnStyles} type={type}
      onClick={() => SignInToProvider(provider?.id, { callbackUrl: "/" })}
    >
      {`Sign in with ${provider?.name}`}
    </button>
  ) : (
    <button className={btnStyles} type={type}>
      {text}
    </button>
  );
}

export default Button