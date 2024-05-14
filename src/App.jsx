import {
  PDFViewer,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ExamBill from "./pages/ExamBill";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
          <ExamBill />
        </Text>
      </View>
    </Page>
  </Document>
);

const App = () => {
  const handleDownload = () => {
    const blob = new Blob([<PdfDocument key={1} />], {
      type: "application/pdf",
    });
    saveAs(blob, "exam_bill.pdf");
  };

  return (
    <div>
      <PDFViewer width="1850" height="900">
        <PdfDocument />
      </PDFViewer>
      <PDFDownloadLink document={<PdfDocument />} fileName="exam_bill.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );

};

export default App;
