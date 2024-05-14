import BillFooter from "../components/BillFooter";
import BillBody from "../components/BillBody";
import BillHeading from "../components/BillHeading";
import MyPdfComponent from "../components/MyPdfComponent";

const ExamBillForm = ({ data }) => {
  return (
    <div className="mt-8 mb-16">
      <MyPdfComponent data ={data}/>
    </div>
  );
};

export default ExamBillForm;
