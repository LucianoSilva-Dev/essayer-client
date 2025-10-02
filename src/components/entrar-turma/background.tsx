export function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-65 right-[5%] w-[800px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, #075F70 0%, #075F70 15%, #075F70 50%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  )
}
