import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/hooks/auth/authContext";
import TimeBlocksPanel from "@/components/TimeBlocksPanel";
import MicroTasksPanel from "@/components/MicroTasksPanel";

export default function Home() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex min-h-screen flex-col items-stretch gap-6 bg-background px-6 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          Welcome, {authContext?.user?.firstName}!
        </h1>
        <Button onClick={() => authContext?.logOut?.()}>Log Out</Button>
      </header>
      <main className="flex w-full items-start gap-8">
        <TimeBlocksPanel />
        <MicroTasksPanel />
      </main>
    </div>
  );
}
