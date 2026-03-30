import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Home</h1>
      <Button onClick={() => alert("Button clicked!")}>Click me</Button>
    </div>
  );
}
