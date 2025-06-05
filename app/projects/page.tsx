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
import Image from "next/image";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    // <section className="flex flex-wrap flex-1 flex-row justify-center items-start gap-10 w-[60vw] mt-24">
    <section style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", alignItems: "flex-start", width: "60vw", marginTop: "15%" }}>
      <Card className="flex-1 min-w-[400px] min-h-[200px]">
        <CardHeader>
          <div className="flex flex-row gap-8">
            <Image src="/youarehere.png" width={60} height={60} alt="You are here icon" style={{ borderRadius: "8px" }} />
            <div className="flex flex-col gap-1.5">
              <CardTitle>edwardurban.com</CardTitle>
              <CardDescription>An updated personal portfolio website created using React with Nextjs 15, Tailwind, and Shadcn.</CardDescription>
            </div>
          </div>
          <CardAction>
            <Button asChild variant="link">
              <Link href="https://github.com/epurban/nextjs-portfolio" target="_blank">
                View Source
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="flex-1 min-w-[400px] min-h-[200px]">
        <CardHeader>
          <div className="flex flex-row gap-8">
            <Image src="/Edparty.png" width={40} height={40} alt="EdParty logo" style={{ borderRadius: "8px", minWidth: "40px", height: "40xp" }} />
            <div className="flex flex-col gap-1.5">
              <CardTitle>EdParty</CardTitle>
              <CardDescription>
                A fun iOS application for video chatting with your friends. Created using React Native, WebRTC and Expo, and features a signaling server used
                for facilitating connections written in Node.js
              </CardDescription>
            </div>
          </div>
          <CardAction>
            <Button asChild variant="link">
              <Link href="https://github.com/epurban/EdParty" target="_blank">
                View Source
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="flex-1 min-w-[400px] min-h-[200px]">
        <CardHeader>
          <CardTitle>DraftKings Marketplace</CardTitle>
          <CardDescription>
            An NFT marketplace which allowed users to purchase digital memorabilia and player cards to be used in our gamified NFT experience, known as
            Reignmakers. Notable features that I tech planned and delivered include the Bulk Listings Manager, Inline Card Actions, a Revamped Virtualized Grid,
            Time Extension Auctions, a Revamped Pack Reveal Experience, and Dark Mode.
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="https://youtu.be/ElzyGrCVjwc?list=PLCJVf8kosMyJwU24CDArrdwTDPxbgIyyh&t=66" target="_blank">
                View Video
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Image src="/Marketplace2.jpg" width={500} height={500} alt="Picture of the author" style={{ borderRadius: "8px" }} />
        </CardContent>
      </Card>
      <Card className="flex-1 min-w-[400px] min-h-[200px]">
        <CardHeader>
          <CardTitle>Pick6</CardTitle>
          <CardDescription>
            My current endeavor at DraftKings, Pick6 is a cutting edge peer to peer fantasy game available for major sports and some esports. Notable features
            I've tech planned and delivered include a Tokenized Rewards System, Player Pools Statuses, and a Jackpot Promotion Experience. Frameworks, libraries
            and tools I use on a daily basis include React 18, Remix v2, Emotion, Express, Vitest, Playwright, Storybook.
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="https://pick6.draftkings.com" target="_blank">
                Open App
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </section>
  );
}
