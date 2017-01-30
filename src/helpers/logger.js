/**
 * Created by jd on 16/01/2017.
 */

export default function () {
    let toLog = []
    for(let arg in arguments) {
        if(Array.isArray(arguments[arg])) {
            let arrayToLog = []
            for (let i in arguments[arg]) {
                if(arguments[arg][i].toLog) {
                    arguments[arg][i].toLog()
                }
                else {
                    arrayToLog.push(arguments[arg][i])
                }
            }
            toLog.push(arrayToLog)
        }
        else {
            toLog.push(arguments[arg])
        }
    }
    // eslint-disable-next-line no-console
    console.log.apply(null, toLog)
}
