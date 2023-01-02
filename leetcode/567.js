/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var checkInclusion = function(s1, s2) {
    // Edge cases
    if (s1.length > s2.length) return false
    let freq1 = []
    let freq2 = []
    
    // Fill freq arrays with 0
    for(let i = 0; i < 26; i++) {
        freq1.push(0)
        freq2.push(0)
    }
    
    // Fill freq1 with s1
    for (let i = 0; i < s1.length; i++) { 
        freq1[s1.charCodeAt(i) - 97] += 1
        freq2[s2.charCodeAt(i) - 97] += 1           
    }
    // Sliding Window
    for (let i = 0; i < s2.length; i++) {
        if (compareArrays(freq1, freq2)) return true
        console.log({freq1});
        console.log({freq2});
        freq2[s2.charCodeAt(i) - 97] -= 1
        freq2[s2.charCodeAt(i + s1.length) - 97] += 1
    }

    return false
};

function compareArrays(arr1, arr2) {
    // Compare elements of 2 arrays of same size
    for(let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false
    } 
    return true
}

console.log(checkInclusion('ab', 'eidbaooo'))