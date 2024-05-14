import "../bengali-font.css";

const BillHeading = () => {
  return (
    <div className="flex justify-center">
      <div>
        <div className="flex justify-center mb-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY_SVw8tPtOnrE6qgIkS5QIXjeIupd-MBWfBibA5cekQ&s"
            alt="Dhaka University Logo"
            className="h-24 w-20"
          />
        </div>
        <h1 className="bengaliPoppins text-2xl font-bold">
          ঢাকা বিশ্ববিদ্যালয়
        </h1>
      </div>
    </div>
  );
};

export default BillHeading;
