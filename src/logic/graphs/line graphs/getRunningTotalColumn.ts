// takes a list of numbers, called amount, and returns a new list, where each entry is the sum of a entry in 'amount' and all the entries before it in 'amount'
export function getRunningPaymentAmount(amount:number[]){
    console.log(amount)
    if(amount && amount.length > 1){
        const runningTotal: number[] = new Array(amount.length);
        runningTotal[0] = amount[0] 
        for(let i = 1; i < runningTotal.length; i ++  ){
            runningTotal[i] = runningTotal[i - 1] + amount[i]
        }
        return runningTotal
    }
    return amount
}