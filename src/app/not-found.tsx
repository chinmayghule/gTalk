import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid place-items-center min-h-screen">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-medium text-2xl text-black">404: Not Found</h1>
        <Link
          href={"/chat"}
          className="py-2 px-6 rounded-md bg-black text-white text-lg font-semi-bold"
        >
          Go back
        </Link>
      </div>
    </section>
  );
}
