import { Metadata } from "next";
import { EducationType, TimelineCard, TimelineCardProps } from "@/components/TimelineCard";
import { Brain, CirclePower } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/Tooltip";
import Link from "next/link";
import { getYearsOfExperience } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Education",
  description: "A showcase of Edward Urban's education including high school, undergraduate, and masters programs.",
};

const educations: TimelineCardProps[] = [
  {
    index: 0,
    educationType: EducationType.School,
    title: "Graduate Studies - Georgia Institute of Technology",
    description:
      "Pursuing a Master of Science in Computer Science with a specialization in Machine Learning. Completed graduate-level coursework in AI and security.",
    logo: { url: "/georgiatech.png", alt: "Georgia Tech Logo" },
    courses: [
      "CS 6035 - Introduction to Info Security (Graduate)",
      "CS 7637 - Knowledge-Based AI (Graduate)",
      "CS 7646 - Machine Learning for Traders (Graduate)",
    ],
    timeline: "May 2020 - April 2021",
  },
  {
    index: 1,
    educationType: EducationType.Work,
    title: "Digital Technology Leadership Program",
    description: (
      <>
        A 2-year leadership development program which thrusts individuals into four different six month long rotations, each with their own role, team, and
        goals. The program also includes education, personal mentorship, and a host of experiences from the top minds in the field, all while working on real
        world projects and initiatives. Graduated in July 2021.{" "}
        <Link
          href="https://careers.gevernova.com/global/en/lp-dtlp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          Read more about the program here.
        </Link>{" "}
      </>
    ),
    logo: { url: "/ge.png", alt: "Georgia Tech Logo" },
    courses: ["Digital Technology Experience 1 (DTX1)", "Activating your Leadership Journey (ALJ)", "Digital Technology Experience 2 (DTX2)"],
    timeline: "July 2019 - July 2021",
  },
  {
    index: 2,
    educationType: EducationType.School,
    title: "Undergrad - University of Michigan-Dearborn",
    description: (
      <>
        Bachelor of Science in Software Engineering. Received the{" "}
        <Link
          href="https://honors.umich.edu/awards.php#branstromprize"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          William J. Branstrom Prize
        </Link>{" "}
        as a freshman, and was a member of the Intelligent Systems Club. Graduated in April 2019.
      </>
    ),
    logo: { url: "/michigan.svg", alt: "University of Michigan Logo" },
    courses: [
      "CIS 150 - Computer Science",
      "CIS 200 - Computer Science II",
      "CIS 275 - Discrete Structures",
      "CIS 285 - Software Engineering Tools",
      "CIS 297 - Introduction to C#",
      "CIS 306 - Discrete Structures II",
      "CIS 310 - Computer Organization and Assembly Language",
      "CIS 350 - Data Structures and Algorithm Analysis",
      "CIS 375 - Software Engineering I",
      "CIS 376 - Software Engineering II",
      "CIS 427 - Computer Networks",
      "CIS 435 - Web Technology",
      "CIS 450 - Operating Systems",
      "CIS 476 - Software Architecture and Design Patterns",
      "CIS 4961 - Senior Design Seminar I",
      "CIS 4962 - Senior Design Seminar II",
      "IMSE 317 - Engineering Probability and Statistics",
    ],
    timeline: "September 2015 - April 2019",
  },
  {
    index: 3,
    educationType: EducationType.School,
    title: "Port Huron Northern High School",
    description:
      "Top 20 in graduating class. Was a member of Chess Club, National Honors Society, and participated in Mathcounts state competitions. Go huskies!",
    logo: { url: "/huskies.png", alt: "Georgia Tech Logo" },
    courses: ["Introduction to Web Publishing", "Advanced Web Publishing", "Building Tomorrow's Leaders"],
    timeline: "September 2011 - June 2015",
  },
];

export default function Page() {
  return (
    <section className="flex flex-col items-center gap-6 w-full mt-[10%] mb-[10%]">
      <div className="w-[90vw] xl:w-[75vw] max-w-[1400px]">
        <div className={`flex flex-row justify-center`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Brain className="h-5 w-5 my-2" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{getYearsOfExperience()} years of professional experience</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {educations.map((education) => (
          <TimelineCard key={education.index} {...education} />
        ))}
        <div className={`flex flex-row justify-center`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <CirclePower className="h-5 w-5 my-2" />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Powered on December 8th, 1996</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}
