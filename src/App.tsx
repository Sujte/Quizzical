import { QuestionContextProvider } from "./QuestionContext";
import Quiz from "./Quiz";
import Intro from "./Intro";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <QuestionContextProvider>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </QuestionContextProvider>
  );
}

export default App;
