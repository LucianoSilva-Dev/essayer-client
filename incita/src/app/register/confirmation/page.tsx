import CodeForm from "../../../../components/auth/confirmation-code"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <CodeForm />
    </main>
  )
}