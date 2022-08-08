interface Props {
  text: string;
}

const LoginHeading: React.FC<Props> = ({ text }) => {
  return (
    <header>
      <h1 className='text-2xl font-bold text-[#4285F4]'>{text}</h1>
    </header>
  );
};

export default LoginHeading;
