import React, { Suspense } from "react";
import { ChatSidebar } from "../component";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense>
        <ChatSidebar />
      </Suspense>
      {children}
    </section>
  );
}
