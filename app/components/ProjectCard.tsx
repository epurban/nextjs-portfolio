"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";

export interface Img {
  url: string;
  alt: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  logo: Img;
  images: Img[];
  linkText?: string;
  linkUrl?: string;
}

export const ProjectCard = ({ description, title, logo, images, linkText, linkUrl }: ProjectCardProps) => {
  return (
    <motion.div whileHover="hovered" initial="rest" animate="rest">
      <Card className="break-inside-avoid mb-6">
        <CardHeader>
          <div className="flex flex-row gap-8">
            <motion.div
              variants={{
                rest: { opacity: 0.8, y: 0, scale: 1 },
                hovered: { opacity: 1, y: 5, scale: 1.2 },
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ flex: 1, minWidth: "50px", width: "50px", height: "50px" }}
            >
              <Image src={logo.url} width={50} height={50} alt={logo.alt} style={{ objectFit: "contain" }} />
            </motion.div>
            <div className="flex flex-col gap-1.5">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {linkText && linkUrl && (
            <CardAction>
              <Button asChild variant="link">
                <Link href={linkUrl} target="_blank">
                  {linkText}
                </Link>
              </Button>
            </CardAction>
          )}
        </CardHeader>
        {images.length > 0 && (
          <CardContent>
            <Image src={images[0].url} layout="responsive" alt={images[0].alt} width={200} height={200} style={{ borderRadius: "8px" }} />
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};
