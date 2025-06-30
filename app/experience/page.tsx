import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "A showcase of Edward Urban's professional experience and personal projects.",
};

const projects: ProjectCardProps[] = [
  {
    title: "DraftKings Pick6",
    description:
      "My current endeavor at DraftKings, Pick6 is a cutting edge peer to peer fantasy game available for major sports and some esports. Notable features I've tech planned and delivered include a Tokenized Rewards System, Player Pools Statuses, and a Jackpot Promotion Experience. Frameworks, libraries and tools I use on a daily basis include React 18, Remix v2, Emotion, Express, Vitest, Playwright, Storybook.",
    logo: { url: "/pick-six-logo.png", alt: "Pick6 Logo" },
    images: [{ url: "/pick-six-1.jpg", alt: "Pick6 Screenshot" }],
    linkText: "Visit Site",
    linkUrl: "https://pick6.draftkings.com",
  },
  {
    title: "GE Cloud Service Center",
    description:
      "The Cloud Service Center is an internal full-stack web application I created with TypeScript React and Golang to enable cloud gatekeepers across various GE business units to manage their catalog of 800+ AWS and Azure cloud environments. The backend service communicates with our interal Cloud team's API for a master list of AWS accounts, and uses RBAC roles to determine account ownership for management. From there it uses AWS and Azure APIs and is granted federated access into individual accounts to perform actions such as decommissioning environments, spinning up new resources, tagging assets, and managing service control policies.",
    logo: { url: "/ge.png", alt: "General Electric meatball" },
    images: [],
  },
  {
    title: "edwardurban.com",
    description: "An updated personal portfolio website created using React with Next.js 15, Tailwind for styling, and Shadcn for base components.",
    logo: { url: "/you-are-here.png", alt: "You are here icon" },
    images: [],
    linkText: "View Source",
    linkUrl: "https://github.com/epurban/nextjs-portfolio",
  },
  {
    title: "AWS Data Exfiltration Prevention",
    description:
      "During my time at GE's Cyber center in Richmond, I led development and testing of a serverless flow to prevent data exfiltration of AMI images in our AWS cloud accounts. A potential attack vector for a large company which at the time AWS did not provide any native means of whitelist accounts, users with access could send AMI images to external AWS accounts within the AWS console. This flow was serverless and used CloudWatch, Step Functions, Lambda Functions, and DynamoDB. The Lambda functions were written in Python, and I created terraform templates to deploy this bot across all 100+ GE Corporate cloud accounts.",
    logo: { url: "/ge.png", alt: "General Electric meatball" },
    images: [],
  },
  {
    title: "DraftKings Marketplace",
    description:
      "An NFT marketplace which allowed users to purchase digital memorabilia and player cards to be used in our gamified NFT experience, known as Reignmakers. Notable features that I tech planned and delivered include the Bulk Listings Manager, Inline Card Actions, a Revamped Virtualized Grid, Time Extension Auctions, a Revamped Pack Reveal Experience, and Dark Mode.",
    logo: { url: "/draftkings.webp", alt: "DraftKings logo" },
    images: [{ url: "/marketplace-2.jpg", alt: "Marketplace Screenshot" }],
    linkText: "Watch Video",
    linkUrl: "https://youtu.be/ElzyGrCVjwc?list=PLCJVf8kosMyJwU24CDArrdwTDPxbgIyyh&t=66",
  },
  {
    title: "Edparty",
    description:
      "A fun iOS application for video chatting with your friends. Created using React Native, WebRTC and Expo, and features a signaling server used for facilitating connections written in Node.js",
    logo: { url: "/ed-party.png", alt: "EdParty logo", style: { borderRadius: "12px" } },
    images: [],
    linkText: "View Source",
    linkUrl: "https://github.com/epurban/EdParty",
  },
  {
    title: "Lumos Component Library",
    description:
      "Lumos is GE's in-house component library built to be used across business units for internal and public facing web applications. Created to be used for React applications, I audited existing components to fix bugs and accessibility issues, as well as created new components such as the Stepper.",
    logo: { url: "/ge.png", alt: "General Electric meatball" },
    images: [],
  },
  {
    title: "Nin Online",
    description:
      "Before I went to University of Michigan for Computer Science, I self taught myself how to code in VB6, learned client-server game networking architecture, partnered with an artist, and used an existing open source game engine to create Nin Online, a 2D online multiplayer role playing game for Windows.",
    logo: { url: "/nin-online-logo.png", alt: "Nin Online Logo" },
    images: [
      { url: "/nin-online.png", alt: "Nin Online Screenshot" },
      { url: "/nin-online-2.png", alt: "Nin Online Screenshot 2" },
      { url: "/nin-online-3.png", alt: "Nin Online Screenshot 3" },
    ],
    cutoffAtTop: true,
    linkText: "Visit Site",
    linkUrl: "https://ninonline.com",
  },
];

export default function Page() {
  return (
    <section className="flex flex-col items-center w-full mt-[10%] mb-[10%]">
      <div className="columns-1 lg:columns-2 gap-6 w-[90vw] xl:w-[75vw] max-w-[1400px]">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
