import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col md:flex-row justify-center items-center ml-8 mr-8">
      <Ghost className="w-[50vw] h-[50vw] md:h-[20vw] md:w-[20vw] mb-8 md:mb-0" />
      <div className="flex flex-col justify-center">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">404 - Page Not Found</h1>
        <p className="mb-4">How spooky of me. Don't worry, there's some great options at the top of the page.</p>
      </div>
    </section>
  );
}
