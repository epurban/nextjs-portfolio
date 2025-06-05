import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Server,
  Database,
  Globe,
  Terminal,
  Cloud,
  Layers,
  FileCode,
  FileText,
  Activity,
  LineChart,
  Cpu,
  GitBranch,
  Gamepad2,
  Figma,
} from "lucide-react";
import Link from "next/link";
import { SkillPool } from "./components/SkillPool";

export default function Page() {
  return (
    <section className="flex flex-1 flex-row justify-center items-center gap-10">
      <div className="flex flex-1 flex-col justify-center max-w-xl">
        <h1 className="mb-8 text-6xl font-semibold tracking-tighter">Edward Urban,</h1>
        <p className="mb-4">{`senior software engineer passionate about creating high quality user experiences and performant applications.`}</p>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="flex items-center gap-2 w-10 h-10 cursor-pointer">
            <Link href="https://github.com/epurban" target="_blank">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex items-center gap-2 w-10 h-10 cursor-pointer">
            <Link href="https://www.linkedin.com/in/epurban" target="_blank">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex items-center gap-2 w-10 h-10 cursor-pointer">
            <Link href="mailto:edurbancodes@gmail.com">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <SkillPool
        skills={[
          { name: "Remix", icon: <Code color="black" className="h-5 w-5" /> },
          { name: "Next.js", icon: <Globe color="black" className="h-5 w-5" /> },
          { name: "Tailwind", icon: <Layers color="black" className="h-5 w-5" /> },
          { name: "Vite", icon: <Terminal color="black" className="h-5 w-5" /> },
          { name: "Vercel", icon: <Cloud color="black" className="h-5 w-5" /> },
          { name: "Firebase", icon: <Database color="black" className="h-5 w-5" /> },
          { name: "CSS", icon: <FileCode color="black" className="h-5 w-5" /> },
          { name: "HTML", icon: <FileText color="black" className="h-5 w-5" /> },
          { name: "Redis", icon: <Database color="black" className="h-5 w-5" /> },
          { name: "New Relic", icon: <Activity color="black" className="h-5 w-5" /> },
          { name: "Datadog", icon: <LineChart color="black" className="h-5 w-5" /> },
          { name: "Go", icon: <Cpu color="black" className="h-5 w-5" /> },
          { name: "Node.js", icon: <Server color="black" className="h-5 w-5" /> },
          { name: "AWS", icon: <Cloud color="black" className="h-5 w-5" /> },
          { name: "React", icon: <Code color="black" className="h-5 w-5" /> },
          { name: "Git", icon: <GitBranch color="black" className="h-5 w-5" /> },
          { name: "Unity", icon: <Gamepad2 color="black" className="h-5 w-5" /> },
          { name: "TypeScript", icon: <FileCode color="black" className="h-5 w-5" /> },
          { name: "JavaScript", icon: <FileCode color="black" className="h-5 w-5" /> },
          // { name: "Vitest", icon: <Activity color="black" className="h-5 w-5" /> },
          // { name: "Jest", icon: <Activity color="black" className="h-5 w-5" /> },
          // { name: "Playwright", icon: <Terminal color="black" className="h-5 w-5" /> },
          // { name: "Figma", icon: <Figma color="black" className="h-5 w-5" /> },
          // { name: "Framer Motion", icon: <FileCode color="black" className="h-5 w-5" /> },
        ]}
      />
    </section>
  );
}
