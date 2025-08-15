export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex space-x-4">
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] overflow-hidden">
            {/* Author info skeleton */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse mr-3"></div>
                  <div>
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Content skeleton */}
            <div className="p-8">
              <div className="text-center border-b border-gray-200 pb-6 mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                <div>
                  <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
