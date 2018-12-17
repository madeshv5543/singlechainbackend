function anagrams(word, words) {
    return words.filter( n=> {
    return checkAnagram(word, n)
    })
 }
 
 function checkAnagram (one, two) {
    let wc1 = countletter(one);
    let wc2 = countletter(two);
    if(Object.keys(wc1).length != Object.keys(wc2).length){
        return false
    }

    for(key of Object.keys(wc1)){
      if(wc1[key] != wc2[key])
      return false;
    }
    return true;
   
 }
 
 function countletter(word){
   let wc = {};
   for(c of word) {
    wc[c] = wc[c] + 1 || 1;
   }
   return wc;
 }

 console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']))