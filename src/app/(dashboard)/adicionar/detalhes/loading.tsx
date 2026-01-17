export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F1F1F2] flex items-center justify-center">
      <div className="animate-pulse">
        <div className="bg-surface-light rounded-[88px] w-[1208px] h-[460px] mb-8"></div>
        <div className="bg-surface-light rounded-[88px] w-[1208px] h-[232px]"></div>
      </div>
    </div>
  );
}