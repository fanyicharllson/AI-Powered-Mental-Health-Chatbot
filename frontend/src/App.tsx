import WelcomePage from "./pages/WelcomePage";
export default function App() {
  return (
    <main className="flex flex-col relative">
      {/* Modern White & Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-200 z-0" />
      <WelcomePage />
    </main>
  );
}
