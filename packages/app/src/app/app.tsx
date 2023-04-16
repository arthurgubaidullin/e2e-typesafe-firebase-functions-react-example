// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { FormEvent, useRef } from 'react';
import { helloWorld } from './firebase';

export function App() {
  const name = useRef<string>('');
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await helloWorld({ content: name.current });
    alert(response.result);
  };
  return (
    <>
      <h1>
        <span> Hello there, </span>
        Welcome app 👋
      </h1>

      <form onSubmit={onSubmit}>
        <label>
          Your name:
          <input
            type="text"
            defaultValue=""
            onChange={(e) => {
              name.current = e.currentTarget.value;
            }}
            required
          />
        </label>
        <input type="submit" />
      </form>

      <div />
    </>
  );
}

export default App;
