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
                activeSemester == s ? "text-red-700" : "hover:text-red-800"
              } p-1`}
              onClick={() => setActiveSemester(s)}
            >
              {s}
            </button>
          ))}
      </div>
    </nav>
  );
}
