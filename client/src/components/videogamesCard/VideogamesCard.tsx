"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";

import { videogameType } from "@/lib/types";
import { useRouter } from "next/navigation";

interface videogameCardType extends videogameType {
  index: number;
}

export default function VideogamesCard({
  id,
  name,
  image,
  index,
}: videogameCardType) {
  const router = useRouter();

  return (
    <motion.article
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1, ease: "easeInOut", duration: 0.5 }}
      viewport={{ amount: 0 }}
      className="relative"
    >
      <Card
        // fullWidth
        shadow="sm"
        key={index}
        isPressable
        onPress={() => router.push(`/videogame/${id}`)}
        className="w-[300px] sm:w-[25rem] h-[15rem]"
      >
        <CardBody className="overflow-visible p-0 w-full h-full">
          <Image
            src={
              image ||
              "https://res.cloudinary.com/dub4acwkh/image/upload/v1710040327/default_image_qep19b.jpg"
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            title={`${name} ${image ? "Image" : "not contain an image"}`}
            alt={`${name} image`}
            className="w-full object-fill h-[140px]"
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{name}</b>
          <Button
            size="sm"
            color="success"
            title="Add this videogame at your library"
          >
            +
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
