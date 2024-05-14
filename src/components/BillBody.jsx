import "../bengali-font.css";

const BillBody = () => {


    const name = ".........................................................";
    const address = "......................................................";
    const totalTaka = 0, totalPoysha = 0;

  return (
    <div className="benaliPoppins">
      <p className="bengaliFont text-md">
        (পরীক্ষার ফল প্রকাশের পর এক বৎসরের মধ্যে নির্দিষ্ট বিভাগীয় পরীক্ষা
        পরিষদের সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রকের অফিসে পারিশ্রমিকের বিল পেশ
        করিতে হইবে।)
      </p>
      <h3 className="bengaliFont text-md py-2">
        পরীক্ষার নাম : জনাব/ডঃ/অধ্যাপক {name}
      </h3>
      <h3 className="bengaliFont text-md pb-2">
        পদবী সহকারে ঠিকানা : {address}
      </h3>

      <p className="bengaliFont text-md py-2">
        ২০...... সনের পরীক্ষাসমূহের প্রশ্নপত্র প্রণয়ন, সমন্বয় সাধন, এবং
        উত্তরপত্র মূল্যায়ন ইত্যাদির জন্য আমার পারিশ্রমিক দাবীসমূহ নিম্নে
        সন্নিবেশিত হইল :-
      </p>

      <section className="grid grid-cols-7">
        <div className="col-span-6">
             
        </div>
        <div className="col-span-1">
            <table>
                <thead>
                    <tr>
                        <th className="border-2 border-black px-5 py-1">টাকা</th>
                        <th className="border-2 border-black px-5 py-1">পয়সা</th>
                    </tr>
                </thead>
                <tbody>
                    <th className="border-2 border-black px-5 py-1">amount</th>
                    <th className="border-2 border-black px-5 py-1">amount</th>
                </tbody>
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
