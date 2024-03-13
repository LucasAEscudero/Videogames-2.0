import { ReactNode, Suspense } from "react";
import { Spinner } from "@nextui-org/react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
