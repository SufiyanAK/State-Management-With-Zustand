import Column from "./components/Column"

function App() {
  return (
    <div className="flex gap-4 rounded-md bg-gray-200 shadow-lg p-6">
      <Column state="PLANNED" />
      <Column state="DONE" />
      <Column state="ONGOING" />
    </div>

  )
}

export default App
