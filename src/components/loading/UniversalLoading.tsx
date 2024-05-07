import { Atom } from "lucide-react";

function UniversalLoading() {
  return (
    <main className="h-screen w-screen grid place-items-center bg-secondary">
      <Atom className="animate-spin text-secondary-foreground" size={64} />
    </main>
  );
}

export default UniversalLoading;
