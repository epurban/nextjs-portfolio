import { Metadata } from "next";
import { Resume } from "@/components/Resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download Edward Urban's Resume.",
};

export default function Page() {
  return <Resume />;
}
