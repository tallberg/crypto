const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
export function encrypt(text, key) {
    const k = (typeof key === "string") ? alpha.indexOf(key) : key;
    let result = text.split('').map(c => alpha[(alpha.indexOf(c) + k) % alpha.length]).join('');
    return result;
}

export function decrypt(text, key) {
    let k = (typeof key === "string") ? alpha.indexOf(key) : key;
    k = alpha.length - k; // reverse 
    let result = text.split('').map(c => alpha[(alpha.indexOf(c) + k) % alpha.length]).join('');
    return result;
}