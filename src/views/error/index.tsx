import { useRouteError } from "react-router-dom";

import Header from '../../components/header';
import Footer from '../../components/footer';

interface IError {
  statusText: string;
  message: string;
}

function isError(obj: unknown): obj is IError {
  return ((obj as IError)?.statusText !== undefined && typeof (obj as IError).statusText === "string") ||
  (obj as IError)?.message !== undefined && typeof (obj as IError).message === "string";
}

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />

      <div className="App">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{isError(error) ? (error.statusText || error.message) : ''}</i>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default ErrorPage

