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
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
        width: "60vw",
        marginTop: "15%",
        maxWidth: "1400px",
        marginBottom: "15%",
      }}
    >
      <Card className="h-[600px] flex flex-col justify-between">
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
          <Image src="/Marketplace2.jpg" layout="responsive" width={200} height={200} alt="Marketplace Screenshot" style={{ borderRadius: "8px" }} />
        </CardContent>
      </Card>
      <Card className="h-[500px] flex flex-col justify-between">
        <CardHeader>
          <CardTitle>DraftKings Pick6</CardTitle>
          <CardDescription>
            My current endeavor at DraftKings, Pick6 is a cutting edge peer to peer fantasy game available for major sports and some esports. Notable features
            I've tech planned and delivered include a Tokenized Rewards System, Player Pools Statuses, and a Jackpot Promotion Experience. Frameworks, libraries
            and tools I use on a daily basis include React 18, Remix v2, Emotion, Express, Vitest, Playwright, Storybook.
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="https://pick6.draftkings.com" target="_blank">
                View Site
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Image src="/picksix1.jpg" layout="responsive" alt="Pick6 Screenshot" width={200} height={200} style={{ borderRadius: "8px" }} />
        </CardContent>
      </Card>
      <Card className="h-[150px] flex-col justify-between">
        <CardHeader>
          <div className="flex flex-row gap-8">
            <Image src="/youarehere.png" width={60} height={60} alt="You are here icon" style={{ objectFit: "contain" }} />

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
      <Card className="h-[200px] flex-col justify-between">
        <CardHeader>
          <div className="flex flex-row gap-8">
            <div style={{ flex: 1, minWidth: "80px", width: "80px", height: "80px" }}>
              <Image src="/Edparty.png" width={80} height={80} alt="EdParty logo" style={{ borderRadius: "8px", objectFit: "contain" }} />
            </div>
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
      <Card className="h-[500px] flex-col justify-between">
        <CardHeader>
          <CardTitle>Nin Online</CardTitle>
          <CardDescription>
            Before I went to University of Michigan for Computer Science, I self taught myself how to code in VB6, learned client-server game networking
            architecture, partnered with an artist, and used an existing open source game engine to create Nin Online, a 2D online multiplayer role playing game
            for Windows.
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="https://ninonline.com" target="_blank">
                View Site
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Image src="/ninonline.png" layout="responsive" width={200} height={200} alt="Nin Online Screenshot" style={{ borderRadius: "8px" }} />
        </CardContent>
      </Card>
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle>GE Cloud Service Center</CardTitle>
          <CardDescription>
            The Cloud Service Center is a full-stack web application I created with TypeScript React and Golang to enable cloud gatekeepers across various GE
            business units to manage their catalog of 800+ AWS and Azure cloud environments. The backend service communicates with our interal Cloud team's API
            for a master list of AWS accounts, and uses RBAC roles to determine account ownership for management. From there it uses AWS and Azure APIs and is
            granted federated access into individual accounts to perform actions such as decommissioning environments, spinning up new resources, tagging
            assets, and managing service control policies.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="h-[200px]">
        <CardHeader>
          <CardTitle>Lumos Component Library</CardTitle>
          <CardDescription>
            Lumos is GE's in-house component library built to be used across business units for internal and public facing web applications. Created to be used
            for React applications, I audited existing components to fix bugs and accessibility issues, as well as created new components such as the Stepper.
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
