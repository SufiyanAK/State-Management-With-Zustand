import Column from "./components/Column"

function App() {
  return (
    <div className="flex gap-4 rounded-md bg-gray-200 shadow-lg p-6">
      <Column state="Name" />
      <Column state="Email" />
      <Column state="Password" />
    </div>

  )
}

export default App
