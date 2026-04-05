import { Button } from "@/components/ui/button";
import { AuthContext } from "@/hooks/auth/authContext";
import { useContext } from "react";

export default function Home() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">
        Welcome, {authContext?.user?.firstName}!
      </h1>
      <Button onClick={() => authContext?.logOut?.()}>Log Out</Button>
    </div>
  );
}
