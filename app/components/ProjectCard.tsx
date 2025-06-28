"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Img } from "./types";
import { useState } from "react";

export interface ProjectCardProps {
  title: string;
  description: string;
  logo: Img;
  images: Img[];
  linkText?: string;
  linkUrl?: string;
}

export const ProjectCard = ({ description, title, logo, images, linkText, linkUrl }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
            <div className={`flex flex-row items-center justify-between mb-2`}>
              <CardTitle>{title}</CardTitle>
              {linkText && linkUrl && (
                <Button asChild variant="link">
                  <Link href={linkUrl} target="_blank" className="h-[16px]">
                    {linkText}
                  </Link>
                </Button>
              )}
            </div>
            <CardDescription>{description}</CardDescription>
          </span>
        </CardHeader>
        {images.length > 0 && (
          <CardContent className="relative" style={{ width: "100%", height: "auto" }}>
            <div style={{ aspectRatio: "16/9" }} className={`w-[100%] h-auto bg-gray-900 rounded-lg relative`}>
              <Image
                className={`rounded-lg absolute width-[100%] h-auto aspect-16/9 transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                src={images[0].url}
                alt={images[0].alt}
                priority
                quality={100}
                width={1000}
                height={1000}
                placeholder="empty"
                onLoad={() => {
                  setImageLoaded(true);
                }}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};
