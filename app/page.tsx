import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";
import {
  RemixDark,
  React,
  NextJs,
  ViteJS,
  TailwindCSS,
  Firebase,
  Redis,
  Datadog,
  Go,
  NodeJs,
  AWS,
  TypeScript,
  JavaScript,
  Vitest,
  Jest,
  Playwright,
  HTML5,
  CSS3,
  Git,
  Framer,
  // Expo,
  WebRTC,
  MongoDB,
  PostgreSQL,
  VercelDark,
  Figma,
  ReactQuery,
  Supabase,
} from "developer-icons";
import Link from "next/link";
import Image from "next/image";
import { SkillPool } from "./components/SkillPool";

export default function Page() {
  return (
    <section className="ml-[10%] mr-[10%] mt-[60px] lg:mt-[0px] flex flex-1 flex-col md:flex-row justify-center items-center gap-10 min-h-[calc(100vh-50px)]">
      <div className="flex flex-1 flex-col justify-center max-w-xl">
        <div className="flex flex-row items-center gap-4 mb-8">
          <div className="w-[60px] h-[60px] bg-gray-400 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/avatar.jpeg" width={60} height={60} alt="Edward Urban Avatar" className="w-[60px] h-[60px] object-cover" priority quality={100} />
          </div>
          <h1 className="text-6xl font-semibold tracking-tighter">Edward Urban,</h1>
        </div>
        <p className="mb-4">{`a senior software engineer passionate about creating high quality user experiences and performant applications. Web development is my expertise, but I'm also experienced working on backend APIs, mobile applications, and online multiplayer games.`}</p>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/epurban"
            target="_blank"
            aria-label="Check out my public projects"
            title="Check out my public projects"
            className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2 w-10 h-10 cursor-pointer")}
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/epurban"
            target="_blank"
            aria-label="Connect with me on LinkedIn"
            title="Connect with me on LinkedIn"
            className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2 w-10 h-10 cursor-pointer")}
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:edurbancodes@gmail.com"
            aria-label="Shoot me an email"
            title="Shoot me an email"
            className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2 w-10 h-10 cursor-pointer")}
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <SkillPool
        skills={[
          { name: "Remix", icon: <RemixDark className="h-5 w-5" /> },
          { name: "Next.js", icon: <NextJs className="h-5 w-5" /> },
          { name: "React", icon: <React className="h-5 w-5" /> },
          { name: "TypeScript", icon: <TypeScript className="h-5 w-5" /> },
          { name: "Tailwind", icon: <TailwindCSS className="h-5 w-5" /> },
          { name: "Vite", icon: <ViteJS className="h-5 w-5" /> },
          { name: "Firebase", icon: <Firebase className="h-5 w-5" /> },
          { name: "CSS", icon: <CSS3 className="h-5 w-5" /> },
          { name: "HTML", icon: <HTML5 className="h-5 w-5" /> },
          { name: "Redis", icon: <Redis className="h-5 w-5" /> },
          { name: "Datadog", icon: <Datadog className="h-5 w-5" /> },
          { name: "Go", icon: <Go className="h-5 w-5" /> },
          { name: "React Native", icon: <React className="h-5 w-5" /> },
          { name: "Node.js", icon: <NodeJs className="h-5 w-5" /> },
          { name: "AWS", icon: <AWS className="h-5 w-5" /> },
          { name: "Git", icon: <Git className="h-5 w-5" /> },
          { name: "JavaScript", icon: <JavaScript className="h-5 w-5" /> },
          { name: "Vitest", icon: <Vitest className="h-5 w-5" /> },
          { name: "Playwright", icon: <Playwright className="h-5 w-5" /> },
          // { name: "Vercel", icon: <VercelDark className="h-5 w-5" /> },
          // { name: "Unity", icon: <Gamepad2 color="black" className="h-5 w-5" /> },
          // { name: "Jest", icon: <Jest className="h-5 w-5" /> },
          // { name: "New Relic", icon: <ChartPie color="black" className="h-5 w-5" /> },
          // { name: "Figma", icon: <Figma className="h-5 w-5" /> },
          // { name: "Framer Motion", icon: <Framer className="h-5 w-5" /> },
          // { name: "React Native", icon: <React className="h-5 w-5" /> },
          // { name: "Expo", icon: <Phone color="black" className="h-5 w-5" /> },
          // { name: "WebRTC", icon: <WebRTC className="h-5 w-5" /> },
          // { name: "WebSockets", icon: <Cable color="black" className="h-5 w-5" /> },
          // { name: "SQL", icon: <Cable color="black" className="h-5 w-5" /> },
          // { name: "MongoDB", icon: <MongoDB className="h-5 w-5" /> },
          // { name: "React Query", icon: <ReactQuery className="h-5 w-5" /> },
          // { name: "Supabase", icon: <Supabase className="h-5 w-5" /> },
        ]}
      />
    </section>
  );
}
