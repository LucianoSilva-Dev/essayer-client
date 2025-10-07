import React from "react";

interface Props {
  title: string;
  text: string;
}

export default function NotificacaoCard({ title, text }: Props) {
  return (
    <div className="p-3 border rounded-lg flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
        🔔
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-500">{text}</div>
      </div>
    </div>
  );
}
