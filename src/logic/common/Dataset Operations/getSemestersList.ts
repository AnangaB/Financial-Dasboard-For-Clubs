/**Returns the list of all the semester values in provided data set
 * 
 * @param data a data set that has a "Semester" column
 * @returns a list of data sets
 */
export function getUniqueSemesterList(data:  d3.DSVRowArray<string>){
    return [...new Set(
        data.map((d) => d?.["Semester"]).filter((semester) => semester !== undefined))];
}
