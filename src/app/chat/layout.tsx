import React from "react";
import { ChatSidebar } from "../component";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ChatSidebar />
      {children}
    </section>
  );
}
