// src/pages/ParentView.jsx
import Evaluations from "../pages/Evaluations";
import { useParent }   from "../contexts/ParentContext";
//import LearningTree from "../components/LearningTree";




export default function ParentView() {
  const { exitParentMode } = useParent();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <header className="p-4 flex justify-between items-center bg-primary text-primary-content">
        <h1 className="text-xl font-bold">Parent Dashboard</h1>
        <button onClick={exitParentMode} className="btn btn-sm">Exit</button>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x">
        <section className="lg:w-1/2 p-6 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Learning Tree</h2>
        </section>

        <section className="lg:w-1/2 p-6 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Generate Evaluation</h2>
          <Evaluations />
        </section>
      </main>
    </div>
  );
}
