"use client";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

interface ShortTextProps {
  text: string;
  shortedText: string;
}

export default function ShortText({ text, shortedText }: ShortTextProps) {
  const [fullText, setFullText] = useState<string>("");
  const [shortText, setShortText] = useState<string>("");
  const [showFullText, setShowFullText] = useState<boolean>(false);

  useEffect(() => {
    if (text && shortedText) {
      setFullText(text);
      setShortText(shortedText);
    }
  }, [text, shortedText]);

  const handleShowFullText = () => setShowFullText(!showFullText);

  return (
    <>
      <p className="mb-3">{!showFullText ? `${shortText}...` : fullText} </p>
      <Button
        onPress={handleShowFullText}
        color="primary"
        size="sm"
        className="w-[10rem]"
      >
        Read {!showFullText ? "more..." : "less..."}
      </Button>
    </>
  );
}
