export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">Edu-Bot</header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="text-center p-2">© Edu-Bot</footer>
    </div>
  )
}
