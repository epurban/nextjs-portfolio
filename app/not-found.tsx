import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-row items-center justify-center gap-6 w-full min-h-[calc(100vh-50px)]">
      <Ghost className="w-[50vw] h-[50vw] md:h-[20vw] md:w-[20vw] mb-8 md:mb-0" />
      <div className="flex flex-col justify-center">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">404 - Page Not Found</h1>
        <p className="mb-4">How spooky of me. Don't worry, there's some great options at the top of the page.</p>
      </div>
    </section>
  );
}
