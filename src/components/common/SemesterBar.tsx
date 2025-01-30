type SemesterBarProps = {
  activeSemester: string;
  setActiveSemester: (s: string) => void;
  semesterList: string[];
};

export default function SemesterBar({
  activeSemester,
  setActiveSemester,
  semesterList,
}: SemesterBarProps) {
  return (
    <nav className="bg-sky-100 p-3">
      <div className="flex flex-wrap items-center">
        {semesterList &&
          semesterList.length > 0 &&
          semesterList.map((s) => (
            <button
              key={s}
              className={`${
                activeSemester == s ? " bg-red-700" : "bg-blue-700"
              } p-1 hover:bg-red-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
              onClick={() => setActiveSemester(s)}
            >
              {s}
            </button>
          ))}
      </div>
    </nav>
  );
}
