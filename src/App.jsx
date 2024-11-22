import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";

export default function App() {
  return (
    <>
      <div className="relative">
        <div>
          <Navbar />
        </div>
        <div className="fixed bottom-10 left-0 w-full">
          <BottomBar />
        </div>
      </div>
    </>
  );
}
