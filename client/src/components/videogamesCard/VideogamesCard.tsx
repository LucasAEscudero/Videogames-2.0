"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";

import { videogameType } from "@/lib/types";

interface videogameCardType extends videogameType {
  index: number;
}

export default function VideogamesCard({
  id,
  name,
  image,
  rating,
  released,
  metacritic,
  platforms,
  genres,
  tags,
  stores,
  index,
}: videogameCardType) {
  return (
    <motion.article
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1, ease: "easeInOut", duration: 0.5 }}
      viewport={{ amount: 0 }}
      className="min-w-[20rem] relative"
    >
      <Card
        // fullWidth
        shadow="sm"
        key={index}
        isPressable
        onPress={() => console.log("item pressed")}
        className="w-[25rem] h-[15rem]"
      >
        <CardBody className="overflow-visible p-0 w-full h-full">
          <Image
            src={
              image ||
              "https://res.cloudinary.com/dub4acwkh/image/upload/v1710040327/default_image_qep19b.jpg"
            }
            // shadow="sm"
            // radius="lg"
            // width={500}
            // height={500}
            fill
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
