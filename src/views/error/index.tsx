import { useRouteError } from "react-router-dom";

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
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isError(error) ? (error.statusText || error.message) : ''}</i>
      </p>
    </>
  );
}

export default ErrorPage

