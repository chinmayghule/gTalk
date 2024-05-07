import Link from "next/link";

export default function Home() {
  return (
    <main className=" min-h-screen grid place-items-center">
      <section className="p-8 w-60">
        <h1 className="text-4xl font-bold text-center">gTalk</h1>
        <div className="mt-4 flex flex-row gap-4 justify-evenly text-lg">
          <Link href={"/signup"}>Signup</Link>
          <Link href={"/login"}>Login</Link>
        </div>
      </section>
    </main>
  );
}
