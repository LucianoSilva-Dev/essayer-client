// components/JoinClass/InfoItem.tsx
import { ReactNode } from 'react';

interface InfoItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function InfoItem({ icon, title, description }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="text-primary">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
