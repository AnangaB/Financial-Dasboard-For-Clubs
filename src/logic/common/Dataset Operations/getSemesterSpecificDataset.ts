export function getDataSetForSemester(data: d3.DSVRowArray<string>, semester: string): d3.DSVRowArray<string> {
    if(semester == "Overall"){
        return data
    }
    return data.filter((d) => d["Semester"] === semester) as  d3.DSVRowArray<string>;
  }