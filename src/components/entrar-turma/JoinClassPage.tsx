import { InfoSection } from "./InfoSection"
import JoinBox  from "./JoinBox"


export function EntrarTurmaPage() {
  return (
    <div className="min-h-screen pt-40 bg-gray-50 flex">

      <div className="flex-1 flex flex-col">

        <main className="flex-1 relative">

          <div className="relative z-10 p-4 sm:p-8 lg:px-20 lg:py-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-12  ">
            <InfoSection />
            <JoinBox />
          </div>
        </main>
      </div>
    </div>
  )
}
