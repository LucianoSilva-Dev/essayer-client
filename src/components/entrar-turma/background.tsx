export function Background() {
  return (
    <div
      className="absolute inset-0 rounded-2xl size-[110%] z-0 opacity-60"
      style={{
        background: "radial-gradient(circle, #075F70 0%, #075F70 30%, #075F70 80%)",
        filter: "blur(80px)",
      }}
    />
  )
}
