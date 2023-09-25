import React from "react";
import { ChatSidebar } from "../component";
import RightSidebar from "../component/chat/RightSidebar/RightSidebar";

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
