import Column from "./components/Column"

function App() {
  return (
    <div className="rounded-md space-y-4 bg-gray-200 shadow-lg px-6 py-2">
      <Column state="Name" />
      <Column state="Email" />
      <Column state="Password" />
    </div>

  )
}

export default App
