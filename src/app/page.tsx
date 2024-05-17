import Link from "next/link";

export default function Home() {
  return (
    <main className=" min-h-screen grid place-items-center">
      <section className="p-8 w-full lg:w-[70ch] flex flex-col gap-8 lg:gap-12">
        <h1 className="text-4xl font-bold text-center">gTalk</h1>
        <p className="text-xl font-medium text-center">
          gTalk is a messaging web app that&apos;s heavily inspired by Whatsapp.
        </p>
        <div className="flex max-[425px]:flex-col flex-row gap-4 justify-center items-center">
          <TechStackBox text="Next.js 14" />
          <TechStackBox text="WebSockets" />
          <TechStackBox text="Express.js" />
        </div>
        <div className="mt-4 flex flex-row gap-16 justify-center text-xl">
          <Link href={"/signup"}>Signup</Link>
          <Link href={"/login"}>Login</Link>
        </div>
      </section>
    </main>
  );
}

function TechStackBox({ text }: { text: string }) {
  return (
    <div className="p-2 lg:p-4 rounded-md bg-gray-200 text-gray-600 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
      {text}
    </div>
  );
}
