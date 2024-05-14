import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class BillCalculator {

    // HashMap for Question types and values
    public static final Map<String, Double> QUESTION = new HashMap<>();
    static {
        QUESTION.put("BSC(Full)", 2250.0);
        QUESTION.put("BSC(Half)", 1500.0);
        QUESTION.put("MSC(Full)", 2250.0);
        QUESTION.put("MSC(Half)", 1500.0);
    }

    // HashMap for Paper Evaluation types and values
    public static final Map<String, Double> PAPER_EVALUATION = new HashMap<>();
    static {
        PAPER_EVALUATION.put("BSC(Full)", 143.75);
        PAPER_EVALUATION.put("BSC(Half)", 112.5);
        PAPER_EVALUATION.put("MSC(Full)", 150.0);
        PAPER_EVALUATION.put("MSC(Half)", 112.5);
    }

    public static final double PROJECT_PAPER_AMOUNT = 31.25;
    public static final double MID_1_AMOUNT = 18.75;
    public static final double MID_2_AMOUNT = 18.75;
    public static final double ASSIGNMENT_AMOUNT = 56.25;
    public static final double THESIS_SUPERVISOR_AMOUNT = 6000.0;
    public static final double THESIS_EXAMINER_AMOUNT = 1800.0;
    public static final double AUDIT_PRESIDENT_HONARARIUM_AMOUNT = 2250.0;
    public static final double QUESTION_UNION_AMOUNT = 2000.0;
    public static final double SPL_SUPERVISION_AMOUNT = 2000.0;
    public static final double SPL_REPORT_CHECK_AMOUNT = 2000.0;


    // Method to accept a HashMap
    public static Double calculateBill(Map<String, String> row) {

        double grand_bill = 0.0;

        String teacherName = String.valueOf(row.get("teacherName"));
        String designation = String.valueOf(row.get("designation"));
        String questionType = String.valueOf(row.get("questionType"));
        String subject = String.valueOf(row.get("subject"));
        String examName = String.valueOf(row.get("examName"));
        String examCode = String.valueOf(row.get("examCode"));
        String answerEvaluation = String.valueOf(row.get("answerEvaluation"));
        String answerExam = String.valueOf(row.get("answerExam"));
        String answerCode = String.valueOf(row.get("answerCode"));
        String finalMarks = String.valueOf(row.get("finalMarks"));
        String midMarks = String.valueOf(row.get("midMarks"));
        String courseCount = String.valueOf(row.get("courseCount"));
        String evaluationCount = String.valueOf(row.get("evaluationCount"));
        String inspectedExamName = String.valueOf(row.get("inspectedExamName"));
        String resultCourseCode = String.valueOf(row.get("resultCourseCode"));
        String assignmentCount = String.valueOf(row.get("assignmentCount"));
        String supervisorCount = String.valueOf(row.get("supervisorCount"));
        String splReportCheckCount = String.valueOf(row.get("splReportCheckCount"));
        String thesisSupervisorCount = String.valueOf(row.get("thesisSupervisorCount"));
        String thesisReportCheckCount = String.valueOf(row.get("thesisReportCheckCount"));
        String examChairman = String.valueOf(row.get("examChairman"));

        if (questionType != null && !assignmentCount.isEmpty()){
            grand_bill += QUESTION.get(questionType);
        }

        if (assignmentCount != null && !assignmentCount.isEmpty()){
            grand_bill += Double.parseDouble(assignmentCount) * ASSIGNMENT_AMOUNT;
        }

        if (thesisSupervisorCount != null && !assignmentCount.isEmpty()){
            grand_bill += Double.parseDouble(thesisSupervisorCount) * THESIS_SUPERVISOR_AMOUNT;
        }

        if(thesisReportCheckCount != null && !assignmentCount.isEmpty()){
            grand_bill += Double.parseDouble(thesisReportCheckCount) * THESIS_EXAMINER_AMOUNT;
        }

        if(!Objects.equals(examChairman, "No")){
            grand_bill += AUDIT_PRESIDENT_HONARARIUM_AMOUNT;
        }

        if(supervisorCount != null && !supervisorCount.isEmpty()){
            grand_bill += SPL_SUPERVISION_AMOUNT;
        }

        if(splReportCheckCount != null && !splReportCheckCount.isEmpty()){
            grand_bill += SPL_REPORT_CHECK_AMOUNT;
        }


        return grand_bill;
    }
}



//////


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CSVReader {

    public static void main(String[] args) {
        String csvFile = "/home/tanvir/Desktop/Bill/src/dbms.csv";
        String line;
        String csvSplitBy = ",";
        List<Map<String, String>> data = new ArrayList<>();

        // Map to rename Bengali column names to English names
        Map<String, String> columnNamesMap = new HashMap<>();
        columnNamesMap.put("শিক্ষকের নাম", "teacherName");
        columnNamesMap.put("পদবী", "designation");
        columnNamesMap.put("প্রশ্নের ধরন", "questionType");
        columnNamesMap.put("প্রশ্নের বিষয়", "subject");
        columnNamesMap.put("প্রশ্নপত্রের পরীক্ষা", "examName");
        columnNamesMap.put("প্রশ্নপত্রের পত্র/কোর্স কোড", "examCode");
        columnNamesMap.put("উত্তরপত্র মূল্যায়ন", "answerEvaluation");
        columnNamesMap.put("যে পরীক্ষার উত্তরপত্র", "answerExam");
        columnNamesMap.put("উত্তরপত্রের পত্র/কোর্স কোড", "answerCode");
        columnNamesMap.put("ফাইনালের খাতা দেখা হয়েছে কতটি", "finalMarks");
        columnNamesMap.put("মিডের খাতা দেখা হয়েছে কতটি", "midMarks");
        columnNamesMap.put("সেমিস্টারে কোর্স সংখ্যা", "courseCount");
        columnNamesMap.put("উত্তরপত্র নিরীক্ষা কতটি", "evaluationCount");
        columnNamesMap.put("নিরীক্ষিত পরীক্ষার নাম", "inspectedExamName");
        columnNamesMap.put("ফলাফল সমন্বয়ের কোর্স কোড", "resultCourseCode");
        columnNamesMap.put("এসাইনমেন্ট দেখা হয়েছে কতটি", "assignmentCount");
        columnNamesMap.put("SPL এ সুপারভাইজ করা হয়েছে কতজনকে", "supervisorCount");
        columnNamesMap.put("SPL রিপোর্ট চেক করা হয়েছে কতটি", "splReportCheckCount");
        columnNamesMap.put("থিসিসে সুপারভাইজ করা হয়েছে কতজনকে", "thesisSupervisorCount");
        columnNamesMap.put("থিসিস রিপোর্ট চেক করা হইছে কতটি", "thesisReportCheckCount");
        columnNamesMap.put("পরীক্ষা কমিটির চেয়ারম্যান ছিলো", "examChairman");

        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String[] columnNames = br.readLine().split(csvSplitBy);
            while ((line = br.readLine()) != null) {
                String[] values = line.split(csvSplitBy);
                Map<String, String> row = new HashMap<>();
                for (int i = 0; i < columnNames.length; i++) {
                    // Rename Bengali column names to English names
                    String englishColumnName = columnNamesMap.get(columnNames[i]);
                    row.put(englishColumnName, values[i]);
                }
                data.add(row);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Accessing the data
        for (Map<String, String> row : data) {
            Map<String, String> extractedValues = new HashMap<>();
            String teacherName = row.get("teacherName");
            String designation = row.get("designation");
            String questionType = row.get("questionType");
            String subject = row.get("subject");
            String examName = row.get("examName");
            String examCode = row.get("examCode");
            String answerEvaluation = row.get("answerEvaluation");
            String answerExam = row.get("answerExam");
            String answerCode = row.get("answerCode");
            String finalMarks = row.get("finalMarks");
            String midMarks = row.get("midMarks");
            String courseCount = row.get("courseCount");
            String evaluationCount = row.get("evaluationCount");
            String inspectedExamName = row.get("inspectedExamName");
            String resultCourseCode = row.get("resultCourseCode");
            String assignmentCount = row.get("assignmentCount");
            String supervisorCount = row.get("supervisorCount");
            String splReportCheckCount = row.get("splReportCheckCount");
            String thesisSupervisorCount = row.get("thesisSupervisorCount");
            String thesisReportCheckCount = row.get("thesisReportCheckCount");
            String examChairman = row.get("examChairman");

            // Store the extracted values in a new HashMap
            extractedValues.put("teacherName", teacherName);
            extractedValues.put("designation", designation);
            extractedValues.put("questionType", questionType);
            extractedValues.put("subject", subject);
            extractedValues.put("examName", examName);
            extractedValues.put("examCode", examCode);
            extractedValues.put("answerEvaluation", answerEvaluation);
            extractedValues.put("answerExam", answerExam);
            extractedValues.put("answerCode", answerCode);
            extractedValues.put("finalMarks", finalMarks);
            extractedValues.put("midMarks", midMarks);
            extractedValues.put("courseCount", courseCount);
            extractedValues.put("evaluationCount", evaluationCount);
            extractedValues.put("inspectedExamName", inspectedExamName);
            extractedValues.put("resultCourseCode", resultCourseCode);
            extractedValues.put("assignmentCount", assignmentCount);
            extractedValues.put("supervisorCount", supervisorCount);
            extractedValues.put("splReportCheckCount", splReportCheckCount);
            extractedValues.put("thesisSupervisorCount", thesisSupervisorCount);
            extractedValues.put("thesisReportCheckCount", thesisReportCheckCount);
            extractedValues.put("examChairman", examChairman);

            double calculated_bill = BillCalculator.calculateBill(extractedValues);

            System.out.println(teacherName + " " + calculated_bill);
        }

    }
}



/////


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class temp {

    public static void main(String[] args) {
        String csvFile = "/home/tanvir/Desktop/Bill/src/dbms_input.csv";
        String line;
        String csvSplitBy = ",";
        List<Map<String, String>> data = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            String[] columnNames = br.readLine().split(csvSplitBy);
            while ((line = br.readLine()) != null) {
                String[] values = line.split(csvSplitBy);
                Map<String, String> row = new HashMap<>();
                for (int i = 0; i < columnNames.length; i++) {
                    row.put(columnNames[i], values[i]);
                }
                data.add(row);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Accessing the data
        for (Map<String, String> row : data) {
            String teacherName = row.get("শিক্ষকের নাম");
            String designation = row.get("পদবী");
            String questionType = row.get("প্রশ্নের ধরন");
            String subject = row.get("প্রশ্নের বিষয়");
            String examName = row.get("প্রশ্নপত্রের পরীক্ষা");
            String examCode = row.get("প্রশ্নপত্রের পত্র/কোর্স কোড");
            String answerEvaluation = row.get("উত্তরপত্র মূল্যায়ন");
            String answerExam = row.get("যে পরীক্ষার উত্তরপত্র");
            String answerCode = row.get("উত্তরপত্রের পত্র/কোর্স কোড");
            String finalMarks = row.get("ফাইনালের খাতা দেখা হয়েছে কতটি");
            String midMarks = row.get("মিডের খাতা দেখা হয়েছে কতটি");
            String courseCount = row.get("সেমিস্টারে কোর্স সংখ্যা");
            String evaluationCount = row.get("উত্তরপত্র নিরীক্ষা কতটি");
            String inspectedExamName = row.get("নিরীক্ষিত পরীক্ষার নাম");
            String resultCourseCode = row.get("ফলাফল সমন্বয়ের কোর্স কোড");
            String assignmentCount = row.get("এসাইনমেন্ট দেখা হয়েছে কতটি");
            String supervisorCount = row.get("SPL এ সুপারভাইজ করা হয়েছে কতজনকে");
            String splReportCheckCount = row.get("SPL রিপোর্ট চেক করা হয়েছে কতটি");
            String thesisSupervisorCount = row.get("থিসিসে সুপারভাইজ করা হয়েছে কতজনকে");
            String thesisReportCheckCount = row.get("থিসিস রিপোর্ট চেক করা হইছে কতটি");
            String examChairman = row.get("পরীক্ষা কমিটির চেয়ারম্যান ছিলো");

            System.out.println("Teacher Name: " + teacherName + ", Designation: " + designation + ", Question Type: " + questionType +
                    ", Subject: " + subject + ", Exam Name: " + examName + ", Exam Code: " + examCode + ", Answer Evaluation: " + answerEvaluation +
                    ", Answer Exam: " + answerExam + ", Answer Code: " + answerCode + ", Final Marks: " + finalMarks + ", Mid Marks: " + midMarks +
                    ", Course Count: " + courseCount + ", Evaluation Count: " + evaluationCount + ", Inspected Exam Name: " + inspectedExamName +
                    ", Result Course Code: " + resultCourseCode + ", Assignment Count: " + assignmentCount + ", Supervisor Count: " + supervisorCount +
                    ", SPL Report Check Count: " + splReportCheckCount + ", Thesis Supervisor Count: " + thesisSupervisorCount +
                    ", Thesis Report Check Count: " + thesisReportCheckCount + ", Exam Chairman: " + examChairman);
        }
    }
}



//
//import java.io.BufferedReader;
//import java.io.FileReader;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class CSVReader {
//
//    public static void main(String[] args) {
//        String csvFile = "/home/tanvir/Desktop/Bill/src/dbms_input.csv";
//        String line;
//        String csvSplitBy = ",";
//        List<String> columnNames = new ArrayList<>();
//        List<Map<String, String>> data = new ArrayList<>();
//        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
//            // Read the first row to extract column names
//            line = br.readLine();
//            String[] columnNamesArray = line.split(csvSplitBy);
//            // Store column names
//            for (String columnName : columnNamesArray) {
//                columnNames.add(columnName);
//            }
//            // Read remaining rows
//            while ((line = br.readLine()) != null) {
//                String[] values = line.split(csvSplitBy);
//                Map<String, String> row = new HashMap<>();
//                // Iterate over the column names and corresponding values
//                for (int i = 0; i < columnNames.size(); i++) {
//                    row.put(columnNames.get(i), values[i]);
//                }
//                data.add(row);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        // Accessing the data
//        for (Map<String, String> row : data) {
//            StringBuilder rowData = new StringBuilder();
//            // Iterate over column names and access corresponding data
//            for (String columnName : columnNames) {
//                String value = row.get(columnName);
//                rowData.append(columnName).append(": ").append(value).append(", ");
//            }
//            // Remove the last comma and space
//            if (rowData.length() > 0) {
//                rowData.setLength(rowData.length() - 2);
//            }
//            // Print the row data
//            System.out.println(rowData.toString());
//        }
//
//    }
//}


