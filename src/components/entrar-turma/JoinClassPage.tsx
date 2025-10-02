import { InfoSection } from "./InfoSection"
import JoinBox  from "./JoinBox"
import { Background } from "./background"

export function EntrarTurmaPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      <div className="flex-1 flex flex-col">

        <main className="flex-1 relative">
          <Background />

          <div className="relative z-10 p-4 sm:p-8 lg:px-12 lg:py-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-16  ">
            <InfoSection />
            <JoinBox />
          </div>
        </main>
      </div>
    </div>
  )
}
