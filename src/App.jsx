
import { useEffect, useState } from "react";
import ExamBillForm from "./pages/ExamBillForm";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/getBill")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setData(result); // Print data in the console
        console.log(result);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
  }, []);

  return (
    <>
      {data && data.map((each) => (
        <div key={each.teacherName}>
          <ExamBillForm data={each}></ExamBillForm>
        </div>
      ))}
    </>
  );
}

export default App;
