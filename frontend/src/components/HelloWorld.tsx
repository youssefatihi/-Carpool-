interface HelloWorldProps {
  name: string;
}

function HelloWorld({ name }: HelloWorldProps) {
  return (
    <div className="hello-world">
      <h1>Hellodxxq, {name}!</h1>
      <p>Welcome to my React component.</p>
    </div>
  );
}
export default HelloWorld;