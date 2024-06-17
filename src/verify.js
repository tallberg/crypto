/**
 * Focus: Measures the likelihood of letter repetition in the text.
 * Simplicity: Easier and quicker to calculate, as it doesn’t require comparison with detailed frequency tables.
 * General Use: Good for a quick check to see if the text has the general characteristics of the target language.
 * 
 * Opt for this if you need a faster, more straightforward method to get a general sense of whether the decryption is on the right track.
 * Good for an initial check before potentially applying more detailed methods like the Chi-Square Test.
 * 
 * Most if not all English texts should have an IC between IC_Random = 0.038466 and IC_English = 0.0686. 
 * A text whose IC is close to ICEnglish indicates that it is likely a valid English text or an English text encrypted with a mono-alphabetic cipher.
 * @param {string} text 
 * @returns
 */
export function IndexOfCoincidence(text) {
    // Remove non-letter characters and convert to uppercase
    let filteredText = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    let letterCounts = {};

    // Count the frequency of each letter
    for (let char of filteredText) {
        if (letterCounts[char]) {
            letterCounts[char]++;
        } else {
            letterCounts[char] = 1;
        }
    }

    let N = filteredText.length;
    let IC = 0;

    // Calculate the IC using the formula
    for (let char in letterCounts) {
        let f = letterCounts[char];
        IC += f * (f - 1);
    }

    IC /= N * (N - 1);
    return IC;
}

/**
 * Focus: Measures how closely the frequency distribution of letters in the decrypted text matches the expected distribution for a language.
 * Detail Level: Provides a detailed comparison of individual letter frequencies.
 * Sensitivity: More sensitive to specific deviations in letter frequencies, which can be particularly useful if you need to distinguish between very similar texts or identify partial decryptions.
 * @param {string} text 
 * @returns A low chi-square value indicates that the observed distribution matches the expected distribution, suggesting a successful decryption.
 */
export function ChiSquare(text) {
    // Expected frequencies for English letters (percentage)
    const expectedFrequencies = {
        'A': 8.167, 'B': 1.492, 'C': 2.782, 'D': 4.253, 'E': 12.702,
        'F': 2.228, 'G': 2.015, 'H': 6.094, 'I': 6.966, 'J': 0.153,
        'K': 0.772, 'L': 4.025, 'M': 2.406, 'N': 6.749, 'O': 7.507,
        'P': 1.929, 'Q': 0.095, 'R': 5.987, 'S': 6.327, 'T': 9.056,
        'U': 2.758, 'V': 0.978, 'W': 2.360, 'X': 0.150, 'Y': 1.974, 'Z': 0.074
    };

    let letterCounts = {};

    // Count the frequency of each letter
    for (let char of text) {
        if (letterCounts[char]) {
            letterCounts[char]++;
        } else {
            letterCounts[char] = 1;
        }
    }

    let N = text.length;
    let chiSquare = 0;

    // Calculate the Chi-Square statistic
    for (let char in expectedFrequencies) {
        let observed = letterCounts[char] || 0;
        let expected = (expectedFrequencies[char] / 100) * N;
        chiSquare += Math.pow(observed - expected, 2) / expected;
    }

    return chiSquare;
}

/**
 * Since bigrams are less common than single letters, their frequencies can provide a more sensitive measure of text similarity, potentially improving the accuracy of the verification.
 * @param {string} text 
 * @returns 
 */
export function ChiSquareBigrams(text) {
    // Expected frequencies for English bigrams (percentage)
    // 100 most common bigrams for english
    const expectedFrequencies = {
        'TH': 1.52, 'HE': 1.28, 'IN': 0.94, 'ER': 0.94, 'AN': 0.82,
        'RE': 0.68, 'ND': 0.63, 'AT': 0.59, 'ON': 0.57, 'NT': 0.56,
        'HA': 0.56, 'ES': 0.56, 'ST': 0.55, 'EN': 0.55, 'ED': 0.53,
        'TO': 0.52, 'IT': 0.50, 'OU': 0.50, 'EA': 0.47, 'HI': 0.46,
        'IS': 0.46, 'OR': 0.43, 'TI': 0.34, 'AS': 0.33, 'TE': 0.27,
        'ET': 0.19, 'NG': 0.18, 'AL': 0.09, 'DE': 0.09, 'SE': 0.08,
        'LE': 0.08, 'SA': 0.08, 'SI': 0.07, 'AR': 0.07, 'VE': 0.07,
        'RA': 0.07, 'LD': 0.07, 'UR': 0.07, 'ME': 0.06, 'HE': 0.06,
        'DO': 0.06, 'FO': 0.06, 'TH': 0.06, 'RE': 0.06, 'CH': 0.05,
        'RO': 0.05, 'CO': 0.05, 'ME': 0.05, 'HI': 0.05, 'MI': 0.05,
        'EL': 0.05, 'CL': 0.05, 'PA': 0.05, 'PR': 0.05, 'BE': 0.04,
        'MA': 0.04, 'NI': 0.04, 'NO': 0.04, 'IC': 0.04, 'LI': 0.04,
        'LO': 0.04, 'KE': 0.04, 'NE': 0.04, 'WI': 0.04, 'TH': 0.04,
        'GO': 0.03, 'RU': 0.03, 'WA': 0.03, 'DE': 0.03, 'ER': 0.03,
        'WO': 0.03, 'RO': 0.03, 'OU': 0.03, 'SE': 0.03, 'LY': 0.03,
        'LL': 0.03, 'SU': 0.03, 'EE': 0.03, 'MO': 0.03, 'WH': 0.03,
        'FR': 0.02, 'VA': 0.02, 'BR': 0.02, 'DI': 0.02, 'RU': 0.02,
        'VI': 0.02, 'PL': 0.02, 'FE': 0.02, 'SY': 0.02, 'GR': 0.02,
        'TR': 0.02, 'UN': 0.02, 'EN': 0.02, 'DE': 0.02, 'TW': 0.02,
        'HA': 0.02, 'SH': 0.02
    };

    // Remove non-letter characters and convert to uppercase
    const filteredText = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const bigramCounts = {};

    // Count the frequency of each bigram
    for (let i = 0; i < filteredText.length - 1; i++) {
        const bigram = filteredText[i] + filteredText[i + 1];
        if (bigramCounts[bigram]) {
            bigramCounts[bigram]++;
        } else {
            bigramCounts[bigram] = 1;
        }
    }

    const N = filteredText.length - 1;
    let chiSquare = 0;

    // Calculate the Chi-Square statistic
    for (const bigram in expectedFrequencies) {
        const observed = bigramCounts[bigram] || 0;
        const expected = (expectedFrequencies[bigram] / 100) * N;
        chiSquare += Math.pow(observed - expected, 2) / expected;
    }

    return chiSquare;
}