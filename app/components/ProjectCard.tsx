"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Img } from "./types";

export interface ProjectCardProps {
  title: string;
  description: string;
  logo: Img;
  images: Img[];
  linkText?: string;
  linkUrl?: string;
}

export const ProjectCard = ({ description, title, logo, images, linkText, linkUrl }: ProjectCardProps) => {
  return (
    <motion.div whileHover="hovered" whileFocus="hovered" initial="rest" animate="rest" tabIndex={0}>
      <Card className="break-inside-avoid mb-6">
        <CardHeader>
          <span>
            <Image
              className="float-left mr-3"
              src={logo.url}
              width={50}
              height={50}
              alt={logo.alt}
              style={{ objectFit: "contain", ...logo.style }}
              priority
              quality={100}
            />
            <div className="flex flex-row items-center justify-between mb-2">
              <CardTitle>{title}</CardTitle>
              {linkText && linkUrl && (
                <CardAction>
                  <Button asChild variant="link">
                    <Link href={linkUrl} target="_blank">
                      {linkText}
                    </Link>
                  </Button>
                </CardAction>
              )}
            </div>
            <CardDescription>{description}</CardDescription>
          </span>
        </CardHeader>
        {images.length > 0 && (
          <CardContent>
            <Image className="rounded-lg" src={images[0].url} layout="responsive" alt={images[0].alt} width={200} height={200} priority quality={100} />
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};
