type SemesterBarProps = {
  activeSemester: string;
  semesterList: string[];
};

export default function SemesterBar({
  activeSemester,
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
              className={activeSemester == s ? "p-1" : "text-red-700 p-1"}
            >
              {s}
            </button>
          ))}
      </div>
    </nav>
  );
}
