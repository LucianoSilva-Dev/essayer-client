// components/JoinClass/JoinClassPage.tsx
import InfoSection from './InfoSection';
import JoinBox from './JoinBox';

export default function JoinClassPage() {
  return (
    <div className="flex justify-between items-center gap-12 px-12 py-10">
      <InfoSection />
      <JoinBox />
    </div>
  );
}
