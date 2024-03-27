"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  fetchUserLibrary,
  compareVideogamesInLibrary,
} from "@/lib/videogames-actions";

import { HiCheck, HiOutlinePlus } from "react-icons/hi";
import { videogameType } from "@/lib/types";

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
  const { username } = useSelector((state: RootState) => state.user);
  const [isUserLibrary, setIsUserLibrary] = useState<boolean>(false);

  const handleLibraryButton = () => {
    if (!username) {
      // modal
    } else {
      if (isUserLibrary) {
        fetchUserLibrary(id, "DELETE");
        setIsUserLibrary(false);
      } else {
        fetchUserLibrary(id, "POST");
        setIsUserLibrary(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setIsUserLibrary(await compareVideogamesInLibrary(id));
    })();
  }, []);

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
        onPress={() => router.push(`/videogames/${id}`)}
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
            title={
              isUserLibrary
                ? "Remove this videogame at your library"
                : "Add this videogame at your library"
            }
            onClick={handleLibraryButton}
          >
            {isUserLibrary ? (
              <HiCheck size={16} />
            ) : (
              <HiOutlinePlus size={14} />
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
