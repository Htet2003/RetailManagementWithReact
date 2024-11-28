import DefaultLayout from "@/layouts/DefaultLayout";
import { StockView } from "@/modules/stock/StockView";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "./ui/toaster";
import { store } from "@/store";
import Loader from "./Loader";
import { CartView } from "@/modules/cart/CartView";
import NotFoundView from "@/modules/not-found/NotFoundView";
import { CashOutView } from "@/modules/cash-out/CashOutView";
import DashboardView from "@/modules/dashboard/DashboardView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/modules/auth/login/LoginView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <StockView />,
      },
      {
        path: "/cart",
        element: <CartView />,
      },
      {
        path: "/cash-out",
        element: <CashOutView />,
      },
      {
        path: "/dashboard",
        element: <DashboardView />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path:"",
        element: <Navigate to="login" replace/>
      },
      {
        path:"login",
        element: <LoginView/>,
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

const Wrapper = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Loader />
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default Wrapper;
