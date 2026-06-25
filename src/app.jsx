import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { MoviesController } from "./utils/contexts/MovieContext";
import Main from "./components/Main/Main";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

const RootLayout = () => {
    return (
        <div className="container">
            <Outlet />
        </div>
    );
};

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorComponent />,
        element: (
            <>
                <RootLayout />

                <MoviesController>
                    <Main />
                </MoviesController>
            </>
        ),
        children: [],
    },
]);

const getRoot = document.getElementById("root");
const root = ReactDOM.createRoot(getRoot);

root.render(
    <RouterProvider
        router={routes}
        future={{
            v7_startTransition: true,
        }}
    />
);
