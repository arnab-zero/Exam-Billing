import "../bengali-font.css";

const BillBody = () => {
  return (
    <div className="benaliPoppins">
      <p className="bengaliFont text-md">
        (পরীক্ষার ফল প্রকাশের পর এক বৎসরের মধ্যে নির্দিষ্ট বিভাগীয় পরীক্ষা
        পরিষদের সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রকের অফিসে পারিশ্রমিকের বিল পেশ
        করিতে হইবে।)
      </p>
      <h3 className="bengaliFont text-md py-2">
        পরীক্ষার নাম : জনাব/ডঃ/অধ্যাপক
        .........................................................
      </h3>
      <h3 className="bengaliFont text-md py-2">
        পদবী সহকারে ঠিকানা :
        .......................................................................
      </h3>

      <p className="bengaliFont text-sm">
        ২০...... সনের পরীক্ষাসমূহের প্রশ্নপত্র প্রণয়ন, সমন্বয় সাধন, এবং
        উত্তরপত্র মূল্যায়ন ইত্যাদির জন্য আমার পারিশ্রমিক দাবীসমূহ নিম্নে
        সন্নিবেশিত হইল :-
      </p>

      <div className="grid template-cols-7"></div>
    </div>
  );
};

export default BillBody;
