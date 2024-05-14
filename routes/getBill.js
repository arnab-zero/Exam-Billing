const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const router = express.Router();

const csvFile = './resources/dbms_input2.csv';
const columnNamesMap = {
  'শিক্ষকের নাম': 'teacherName',
  'পদবী': 'designation',
  'প্রশ্নের ধরন': 'questionType',
  'প্রশ্নের বিষয়': 'subject',
  'প্রশ্নপত্রের পরীক্ষা': 'examName',
  'প্রশ্নপত্রের পত্র/কোর্স কোড': 'examCode',
  'উত্তরপত্র মূল্যায়ন': 'answerEvaluation',
  'যে পরীক্ষার উত্তরপত্র': 'answerExam',
  'উত্তরপত্রের পত্র/কোর্স কোড': 'answerCode',
  'ফাইনালের খাতা দেখা হয়েছে কতটি': 'finalMarks',
  'মিডের খাতা দেখা হয়েছে কতটি': 'midMarks',
  'সেমিস্টারে কোর্স সংখ্যা': 'courseCount',
  'উত্তরপত্র নিরীক্ষা কতটি': 'evaluationCount',
  'নিরীক্ষিত পরীক্ষার নাম': 'inspectedExamName',
  'ফলাফল সমন্বয়ের কোর্স কোড': 'resultCourseCode',
  'এসাইনমেন্ট দেখা হয়েছে কতটি': 'assignmentCount',
  'SPL এ সুপারভাইজ করা হয়েছে কতজনকে': 'supervisorCount',
  'SPL রিপোর্ট চেক করা হয়েছে কতটি': 'splReportCheckCount',
  'থিসিসে সুপারভাইজ করা হয়েছে কতজনকে': 'thesisSupervisorCount',
  'থিসিস রিপোর্ট চেক করা হইছে কতটি': 'thesisReportCheckCount',
  'পরীক্ষা কমিটির চেয়ারম্যান ছিলো': 'examChairman',
};

const QUESTION = new Map([
  ['BSC(Full)', 2250.0],
  ['BSC(Half)', 1500.0],
  ['MSC(Full)', 2250.0],
  ['MSC(Half)', 1500.0],
]);

const PAPER_EVALUATION = new Map([
  ['BSC(Full)', 143.75],
  ['BSC(Half)', 112.5],
  ['MSC(Full)', 150.0],
  ['MSC(Half)', 112.5],
]);

const PROJECT_PAPER_AMOUNT = 31.25;
const MID = 18.75;
const FINAL = 38.75;
const ASSIGNMENT_AMOUNT = 56.25;
const THESIS_SUPERVISOR_AMOUNT = 6000.0;
const THESIS_EXAMINER_AMOUNT = 1800.0;
const AUDIT_PRESIDENT_HONARARIUM_AMOUNT = 2250.0;
const QUESTION_UNION_AMOUNT = 2000.0;
const SPL_SUPERVISION_AMOUNT = 2000.0;
const SPL_REPORT_CHECK_AMOUNT = 2000.0;

function calculateBill(row) {
  let grandBill = 0.0;
  const {
    teacherName,
    designation,
    questionType,
    subject,
    examName,
    examCode,
    answerEvaluation,
    answerExam,
    answerCode,
    finalMarks,
    midMarks,
    courseCount,
    evaluationCount,
    inspectedExamName,
    resultCourseCode,
    assignmentCount,
    supervisorCount,
    splReportCheckCount,
    thesisSupervisorCount,
    thesisReportCheckCount,
    examChairman,
  } = row;

  if (questionType && !isNaN(questionType)) {
    if (courseCount && !isNaN(courseCount)) {
      grandBill += QUESTION.get(questionType) * courseCount;
    }
  }

  if (assignmentCount && !isNaN(assignmentCount)) {
    grandBill += parseFloat(assignmentCount) * ASSIGNMENT_AMOUNT;
  }

  if (thesisSupervisorCount && !isNaN(thesisSupervisorCount)) {
    grandBill += parseFloat(thesisSupervisorCount) * THESIS_SUPERVISOR_AMOUNT;
  }

  if (thesisReportCheckCount && !isNaN(thesisReportCheckCount)) {
    grandBill += parseFloat(thesisReportCheckCount) * THESIS_EXAMINER_AMOUNT;
  }

  if (examChairman !== 'No') {
    grandBill += AUDIT_PRESIDENT_HONARARIUM_AMOUNT;
  }

  if (supervisorCount && !isNaN(supervisorCount)) {
    grandBill += SPL_SUPERVISION_AMOUNT;
  }

  if (splReportCheckCount && !isNaN(splReportCheckCount)) {
    grandBill += SPL_REPORT_CHECK_AMOUNT;
  }

  if (answerEvaluation && !isNaN(answerEvaluation)) {
    let temp_total = 0.0;

    if (finalMarks && !isNaN(finalMarks)) {
      temp_total += parseFloat(finalMarks) * FINAL;
    }

    if (midMarks && !isNaN(midMarks)) {
      temp_total += parseFloat(midMarks) * MID;
    }

    temp_total *= PAPER_EVALUATION.get(answerEvaluation);

    if (courseCount && !isNaN(courseCount)) {
      temp_total *= courseCount;
    }

    grandBill += temp_total;
  }

  return grandBill;
}

router.get('/getBill', (req, res) => {
  const results = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (row) => {
      const extractedValues = {};
      Object.keys(row).forEach((key) => {
        const englishColumnName = columnNamesMap[key];
        if (englishColumnName) {
          extractedValues[englishColumnName] = row[key];
        }
      });
      results.push(extractedValues);
    })
    .on('end', () => {
      const bills = results.map((row) => ({
        ...row,
        calculatedBill: calculateBill(row)
      }));
      res.json(bills);
    });
});

module.exports = router;
