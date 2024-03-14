"use client";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import {
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface CarouselProps {
  images: string[];
  imagesType: string;
}

export default function Carousel({ images, imagesType }: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [previousImage, setPreviousImage] = useState<string>("");
  const [nextImage, setNextImage] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImage, setModalImage] = useState<string>("");

  useEffect(() => {
    if (images) {
      setPreviousImage(images[images.length - 1]);
      setSelectedImage(images[0]);
      setNextImage(images[1]);
    }
  }, [images]);

  const selectNewImage = (next = true) => {
    const condition = next
      ? selectedIndex < images.length - 1
      : selectedIndex > 0;
    let nextIndex: number = 0;

    if (next) {
      if (condition) {
        nextIndex = selectedIndex + 1;
      } else nextIndex = 0;
    } else if (condition) {
      nextIndex = selectedIndex - 1;
    } else nextIndex = images.length - 1;

    setPreviousImage(selectedImage);
    setSelectedImage(nextImage);
    setSelectedIndex(nextIndex);
    setNextImage(
      nextIndex === images.length - 1 ? images[0] : images[nextIndex + 1]
    );
  };

  const previous = () => selectNewImage(false);

  const next = () => selectNewImage();

  const handleModalImage = (image: string) => setModalImage(image);

  return (
    <>
      <div className="flex justify-center items-center gap-2 transition-all my-5">
        <Button
          onClick={previous}
          size="md"
          isIconOnly
          className="rounded-full bg-transparent"
        >
          <MdKeyboardArrowLeft size={50} />
        </Button>
        <div className="hidden sm:inline-block">
          <Image
            as={NextImage}
            src={previousImage}
            alt={`${imagesType} ${
              selectedIndex === 0 ? images.length : selectedIndex
            }`}
            title={`${imagesType} ${
              selectedIndex === 0 ? images.length : selectedIndex
            }`}
            width={200}
            height={150}
            radius="sm"
            shadow="lg"
            loading="lazy"
            disableSkeleton
            isBlurred
            onClick={() => {
              handleModalImage(previousImage);
              onOpen();
            }}
          />
        </div>

        <Image
          as={NextImage}
          src={`${selectedImage}`}
          alt={`${imagesType} ${selectedIndex + 1}`}
          title={`${imagesType} ${selectedIndex + 1}`}
          width={300}
          height={200}
          radius="sm"
          shadow="lg"
          loading="lazy"
          disableSkeleton
          isBlurred
          onClick={() => {
            handleModalImage(selectedImage);
            onOpen();
          }}
        />

        <div className="hidden sm:inline-block">
          <Image
            as={NextImage}
            src={nextImage}
            alt={`${imagesType} ${
              selectedIndex === images.length - 1 ? 1 : selectedIndex + 2
            }`}
            title={`${imagesType} ${
              selectedIndex === images.length - 1 ? 1 : selectedIndex + 2
            }`}
            width={200}
            height={150}
            radius="sm"
            shadow="lg"
            loading="lazy"
            disableSkeleton
            isBlurred
            onClick={() => {
              handleModalImage(nextImage);
              onOpen();
            }}
          />
        </div>
        <Button
          onClick={next}
          size="md"
          isIconOnly
          className="rounded-full bg-transparent"
        >
          <MdKeyboardArrowRight size={50} />
        </Button>
      </div>
      {/* modal */}
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <Image
                as={NextImage}
                src={modalImage}
                alt={modalImage}
                title={modalImage}
                width={550}
                height={400}
                radius="sm"
                shadow="lg"
                loading="lazy"
                disableSkeleton
                isBlurred
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
