import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
    const { status, statusText } = useRouteError();

    const errorLayout = (
        <div>
            <h1>Oops...</h1>
            <h2>Something Went Wrong!</h2>

            <h2>{"Code: " + status}</h2>
            <h2>{"Message: " + statusText}</h2>
        </div>
    );

    return errorLayout;
};

export default ErrorComponent;
