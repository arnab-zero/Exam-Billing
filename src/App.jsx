import ExamBillForm from "./pages/ExamBillForm";
import MyPdfComponent from "./components/MyPdfComponent"

function App() {
  return (
    <>
      <ExamBillForm />
      <h1>Generate PDF with Bengali Text</h1>
      <MyPdfComponent />
    </>
  );
}

export default App;
