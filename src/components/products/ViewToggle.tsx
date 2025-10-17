import { CiBoxList, CiGrid41 } from "react-icons/ci";

interface ViewToggleProps {
  view: string;
  setView: (view: string) => void;
}

const ViewToggle = ({ view, setView }: ViewToggleProps) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setView("grid")}
        className={`px-4 py-2 rounded ${
          view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <CiGrid41 />
      </button>
      <button
        onClick={() => setView("list")}
        className={`px-4 py-2 rounded ${
          view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <CiBoxList />
      </button>
    </div>
  );
};

export default ViewToggle;
