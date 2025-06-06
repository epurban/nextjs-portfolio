import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-row justify-center items-center">
      <Ghost className="h-[15vw] w-[15vw]" />
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">404 - Page Not Found</h1>
        <p className="mb-4">How spooky of us. Don't worry, there's some great options at the top of the page.</p>
      </div>
    </section>
  );
}
