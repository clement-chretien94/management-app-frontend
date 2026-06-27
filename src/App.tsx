import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import { AuthProvider } from "./hooks/auth/authProvider";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import { AuthContext } from "@/hooks/auth/authContext";
import { useContext } from "react";
import { Toaster } from "@/components/ui/sonner";
import Categories from "@/pages/Catagories";
import CategoryUpdate from "@/pages/CategoryUpdate";
import CategoryDetails from "./pages/CategoryDetails";
import CategoryCreate from "./pages/CategoryCreate";

function NoAuth() {
  const authContext = useContext(AuthContext);

  if (authContext?.isLoading) return null;
  if (authContext?.isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

function RequireAuth() {
  const authContext = useContext(AuthContext);

  if (authContext?.isLoading) return null;
  if (!authContext?.isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<NoAuth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/create" element={<CategoryCreate />} />
                <Route path="/categories/:id" element={<CategoryDetails />} />
                <Route
                  path="/categories/:id/edit"
                  element={<CategoryUpdate />}
                />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
