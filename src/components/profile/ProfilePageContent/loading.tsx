export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header skeleton */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] overflow-hidden">
            <div className="bg-gradient-to-r from-[#CA9C60] to-[#B8935A] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 animate-pulse"></div>
                  <div>
                    <div className="w-48 h-8 bg-white/20 rounded animate-pulse mb-2"></div>
                    <div className="w-32 h-6 bg-white/20 rounded animate-pulse mb-2"></div>
                    <div className="w-40 h-4 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-32 h-10 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Tabs skeleton */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="py-4">
                    <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="w-8 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
