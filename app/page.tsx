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
  Phone,
} from "lucide-react";
import Link from "next/link";
import { SkillPool } from "./components/SkillPool";
import { Tooltip, TooltipContent, TooltipTrigger } from "./components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";

export default function Page() {
  return (
    <section className="flex flex-1 flex-col md:flex-row justify-center items-center gap-10">
      <div className="flex flex-1 flex-col justify-center max-w-xl">
        <div className="flex flex-row items-center gap-4 mb-8">
          <Avatar className="w-15 h-15">
            <AvatarImage src="https://avatars.githubusercontent.com/u/22136514?v=4" alt="Edward Urban Avatar" />
            <AvatarFallback>EU</AvatarFallback>
          </Avatar>
          <h1 className="text-6xl font-semibold tracking-tighter">Edward Urban,</h1>
        </div>
        <p className="mb-4">{`senior software engineer passionate about creating high quality user experiences and performant applications.`}</p>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" className="flex items-center gap-2 w-10 h-10 cursor-pointer">
                <Link href="https://github.com/epurban" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Check out my public projects</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" className="flex items-center gap-2 w-10 h-10 cursor-pointer">
                <Link href="https://www.linkedin.com/in/epurban" target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Connect with me on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" className="flex items-center gap-2 w-10 h-10 cursor-pointer">
                <Link href="mailto:edurbancodes@gmail.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Shoot over an email</p>
            </TooltipContent>
          </Tooltip>
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
          // { name: "React Native", icon: <Phone color="black" className="h-5 w-5" /> },
          // { name: "Expo", icon: <Phone color="black" className="h-5 w-5" /> },
        ]}
      />
    </section>
  );
}
