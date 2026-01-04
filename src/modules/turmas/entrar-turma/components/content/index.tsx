import { InfoSection } from "../info-section"
import JoinBox from "../box"


export function EntrarTurmaPage() {
  return (
    <div className="min-h-[calc(100vh-100px)] pt-0 bg-gray-50 flex">

      <main className="flex-1 relative">

        <div className="relative z-10 p-4 sm:p-8 lg:px-20 lg:py-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-12  ">
          <InfoSection />
          <JoinBox />
        </div>
      </main>

    </div>
  )
}
