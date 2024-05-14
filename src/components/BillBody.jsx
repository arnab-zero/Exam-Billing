import "../bengali-font.css";

const BillBody = ({ data }) => {
  const totalTaka = data.calculatedBill?data.calculatedBill:0,
    totalPoysha = 0;
  const name = data.teacherName
    ? data.teacherName
    : "............................................................";
  const address =
    "............................................................";

  return (
    <div className="benaliPoppins px-12">
      <p className="bengaliFont text-md">
        (পরীক্ষার ফল প্রকাশের পর এক বৎসরের মধ্যে নির্দিষ্ট বিভাগীয় পরীক্ষা
        পরিষদের সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রকের অফিসে পারিশ্রমিকের বিল পেশ
        করিতে হইবে।)
      </p>
      <h3 className="bengaliFont text-lg font-semibold">
        পরীক্ষকের নাম : জনাব/ডঃ/অধ্যাপক {data.teacherName}
      </h3>
      <h3 className="bengaliFont text-lg font-semibold">
        পদবী সহকারে ঠিকানা : {data.address}
      </h3>

      <p className="bengaliFont text-lg py-2">
        ২০...... সনের পরীক্ষাসমূহের প্রশ্নপত্র প্রণয়ন, সমন্বয় সাধন, এবং
        উত্তরপত্র মূল্যায়ন ইত্যাদির জন্য আমার পারিশ্রমিক দাবীসমূহ নিম্নে
        সন্নিবেশিত হইল :-
      </p>

      <section className="grid grid-cols-7">
        <div className="col-span-6">
          <section className="grid template-cols-7">
            <div className="col-span-6">
              <p>
                (১)প্রশ্নপত্র প্রণয়নঃ একটি পূর্ণ/অর্ধপত্র{" "}
                {data.answerExam ? data.answerExam : "............"}
                পরীক্ষার ............ বিষয়{" "}
                {data.examCode ? data.examCode : "............"} পত্র/ কোর্স
              </p>
              <p>
                (২) প্রশ্নপত্র সমন্বয় সাধনঃ ...............................
                পরীক্ষার .......................বিষয় ....................... টাঃ
                প্রশ্নপত্র ............................................. জন
                সদস্য .................................
              </p>
              <p>
                (৩) উত্তরপত্র মূল্যায়ন করা:{" "}
                <p>
                  (ক) {data.finalMarks ? data.finalMarks : "............"} পূর্ণ
                  খাতা
                  {data.inspectedExamName
                    ? data.inspectedExamName
                    : "............"}{" "}
                  পরীক্ষার SE বিষয়{" "}
                  {data.resultCourseCode
                    ? data.resultCourseCode
                    : "............"}{" "}
                  পত্র/কোর্স
                </p>{" "}
                <p>
                  (খ) {data.midMarks ? data.midMarks : "............"} অর্ধ খাতা
                  {data.answerExam
                    ? data.answerExam
                    : "............................."}{" "}
                  পরীক্ষার SE বিষয়{" "}
                  {data.answerCode
                    ? data.answerCode
                    : "................................."}{" "}
                  পত্র/কোর্স
                </p>{" "}
                <p>(গ) ............ ............ ............ ............</p>
              </p>
              <p>
                (৪) ব্যবহারিক পরীক্ষা: ২০......... সনের SE পরীক্ষার SPL বিষয়ে
                {data.splReaportCheckCount
                  ? data.splReaportCheckCount
                  : "..............."}{" "}
                জন পরীক্ষার্থীর জন্য........................দিন (৫) ব্যবহারিক
                পরীক্ষা: ২০....... সনের SE পরীক্ষার SPL বিষয়ে
                {data.thesisSuperviseCount
                  ? data.thesisSuperviseCount
                  : "..............."}
                জন পরীক্ষার্থীর জন্য সুপারভাইজ করেছে।
              </p>{" "}
              <p>
                (৬) তিনি পরীক্ষা কমিটির চেয়ারম্যান ছিলেন{" "}
                {data.examChairman === "Yes" ? "" : "না"}।
              </p>{" "}
              <p>
                (৭) ডাক মাশুল ও সংশ্লিষ্ট অন্যান্য বিবিধ খরচ :- (ডাক মাশুলের এবং
                সংশ্লিষ্ট অন্যান্য বিবিধ খরচের রশিদ বিলের সহিত সংযুক্ত না থাকিলে
                উহা পরিশোধযোগ্য বলিয়া গণ্য হইবে না)।
              </p>{" "}
              <p>
                (৭) প্রত্যয়ন করা যাইতেছে যে অত্র বিলের টাকা পূর্বে গ্রহণ করা হয়
                নাই। মোট টাকা{" "}
                {data.calculatedBill
                  ? data.calculatedBill
                  : ".............................."}{" "}
              </p>
            </div>
          </section>
        </div>
        <div className="col-span-1">
          <table className="h-[200px]">
            <thead>
              <tr>
                <th className="border-2 border-black px-5 py-1">টাকা</th>
                <th className="border-2 border-black px-5 py-1">পয়সা</th>
              </tr>
            </thead>
            <tbody>
              <th className="border-2 border-black px-5 py-1">{totalTaka}</th>
              <th className="border-2 border-black px-5 py-1">{totalPoysha}</th>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BillBody;
