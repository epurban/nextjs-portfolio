import { GraduationCap, BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Img } from "./types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/Tooltip";

export enum EducationType {
  School = 0,
  Work = 1,
}

export interface TimelineCardProps {
  index: number;
  educationType: EducationType;
  title: string;
  description: string | React.ReactNode;
  logo: Img;
  courses?: string[];
  timeline: string;
}

export const TimelineCard = ({ index, educationType, title, description, logo, courses = [], timeline }: TimelineCardProps) => {
  return (
    <div className={`flex ${index % 2 ? "flex-row-reverse" : "flex-row"} gap-4`}>
      <div className="flex flex-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="break-inside-avoid mb-6 mt-6 w-[100%]">
              <CardHeader>
                <div className="flex flex-row gap-8">
                  <Image src={logo.url} width={50} height={50} alt={logo.alt} style={{ objectFit: "contain", ...logo.style }} />
                  <div className="flex flex-col gap-1.5">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-4">Relevant Courses</CardTitle>
                <ul className="list-disc pl-6 space-y-2">
                  {courses.map((course) => (
                    <li key={course} className="text-muted-foreground text-sm">
                      {course}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent side={index % 2 ? "left" : "right"} className={`relative left-[${index % 2 ? "-" : ""}40px]`}>
            <p>{timeline}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="min-w-0 flex-shrink-0 flex-col items-center lg:flex">
        <div className="w-[1px] flex-1 bg-[var(--border)]"></div>
        {educationType === EducationType.School ? <GraduationCap className="h-5 w-5 my-2" /> : <BriefcaseBusiness className="h-5 w-5 my-2" />}
        <div className="w-[1px] flex-1 bg-[var(--border)]"></div>
      </div>
      <div className="hidden min-w-0 flex-1 flex-shrink-0 flex-row lg:flex"></div>
    </div>
  );
};
