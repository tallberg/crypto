import * as verify from "./src/verify.js";
import * as caesar from "./src/caesar.js";
import {ToAZ} from "./src/ngram.js"

const largeInput = ToAZ(document.getElementById('large-input').value);
const smallInput = ToAZ(document.getElementById('small-input').value);

const largeIcResult = verify.IndexOfCoincidence(largeInput);
const smallIcResult = verify.IndexOfCoincidence(smallInput);
const largeChiResults = [];
const smallChiResults = [];
const largeChiBiResults = [];
const smallChiBiResults = [];

for (let i = 0; i <= 65; i++) {
    let enc1 = caesar.encrypt(largeInput, i);
    let enc2 = caesar.encrypt(smallInput, i);
    largeChiResults[i] = verify.ChiSquare(enc1);
    smallChiResults[i] = verify.ChiSquare(enc2);
    largeChiBiResults[i] = verify.ChiSquareBigrams(enc1);
    smallChiBiResults[i] = verify.ChiSquareBigrams(enc2);
    console.log(smallChiBiResults[i], enc2);
}

document.getElementById('large-ic-output').innerText = largeIcResult.toFixed(4);
document.getElementById('small-ic-output').innerText = smallIcResult.toFixed(4);
document.getElementById('large-chi-output').innerText = largeChiResults.map(d => d.toFixed(0)).join(", ");
document.getElementById('small-chi-output').innerText = smallChiResults.map(d => d.toFixed(0)).join(", ");
document.getElementById('large-chi-bi-output').innerText = largeChiBiResults.map(d => d.toFixed(0)).join(", ");
document.getElementById('small-chi-bi-output').innerText = smallChiBiResults.map(d => d.toFixed(0)).join(", ");



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
