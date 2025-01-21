
export function getRunningCoreBalance(amount:number[], amountFundType:string[]){
    if(amount && amount.length > 1 && amountFundType && amountFundType.length > 1){
        const runningTotal: number[] = new Array(amount.length);
        runningTotal[0] = 0
        if (amountFundType[0] === "Core"){
            runningTotal[0] += amount[0]
        }
        for(let i = 1; i < runningTotal.length; i ++  ){
            if(amountFundType[i] === "Core"){
                runningTotal[i] = runningTotal[i - 1] + amount[i]
            }
            else{
                runningTotal[i] = runningTotal[i - 1]
            }
        }
        return runningTotal
    }
    return amount
}