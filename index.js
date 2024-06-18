import * as verify from "./src/verify.js";
import * as caesar from "./src/caesar.js";
import {ToAZ} from "./src/ngram.js"

document.getElementById('run').addEventListener('click', ()=>run());

function run(){

const largeInput = ToAZ(document.getElementById('large-input').value);
const smallInput = ToAZ(document.getElementById('small-input').value);

const largeIcResult = verify.IndexOfCoincidence(largeInput);
const smallIcResult = verify.IndexOfCoincidence(smallInput);
const largeChiResults = [];
const smallChiResults = [];
const largeChiBiResults = [];
const smallChiBiResults = [];

for (let i = 0; i < 26; i++) {
    let enc1 = caesar.encrypt(largeInput, i);
    let enc2 = caesar.encrypt(smallInput, i);
    largeChiResults[i] = verify.ChiSquare(enc1);
    smallChiResults[i] = verify.ChiSquare(enc2);
    largeChiBiResults[i] = verify.ChiSquareBigrams(enc1);
    smallChiBiResults[i] = verify.ChiSquareBigrams(enc2);
    console.log(smallChiBiResults[i], enc2);
}

document.getElementById('large-ic-output').innerText = "IC: " + largeIcResult.toFixed(4);
document.getElementById('small-ic-output').innerText = "IC: " + smallIcResult.toFixed(4);

let min = Math.min(...largeChiResults);
document.getElementById('large-chi-output').innerText = "CHI: " 
    + largeChiResults.sort((a,b)=>a-b).map(d => (d/min).toFixed(1)).join(", ");

min = Math.min(...smallChiResults);
document.getElementById('small-chi-output').innerText = "CHI: " 
    + smallChiResults.sort((a,b)=>a-b).map(d => (d/min).toFixed(1)).sort().join(", ");

min = Math.min(...largeChiBiResults);
document.getElementById('large-chi-bi-output').innerText = "CHI-BI: " 
    + largeChiBiResults.sort((a,b)=>a-b).map(d => (d/min).toFixed(1)).sort().join(", ");

min = Math.min(...smallChiBiResults);
document.getElementById('small-chi-bi-output').innerText = "CHI-BI: " 
    + smallChiBiResults.sort((a,b)=>a-b).map(d => (d/min).toFixed(1)).sort().join(", ");

}

run();
// export default class Helper {
//     static dictionaryToSortedArrayByValue(obj) {
//         const keys = Object.keys.sort((a, b) => obj[a] > obj[b] ? 1 : -1);
//         const result = [];
//         keys.forEach(key => {
//             result.push([key, obj[key]]);
//         });
//         return result;
//     }

//     static dictionaryToSortedArrayByKey(obj) {
//         const keys = Object.keys.sort();
//         const result = [];
//         keys.forEach(key => {
//             result.push([key, obj[key]]);
//         });
//         return result;
//     }
// }
