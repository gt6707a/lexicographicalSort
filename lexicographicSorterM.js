/**
 * Created by micha on 11/15/15.
 */
/**
 * I thought of this immediately after I emailed you the github links.
 * I was thinking if I could take advantage of memoization. Then I realized I could have just mapped letters to what they could've been:
 * first letter in order is 'a', 2nd is 'b', so on.. and use native string comparison do th comparison.
 * I am making an assumption that native string comparison of === is faster than looping through each char.
 * Disavantage of Memoization is it can take up space.
 *
 */
function lexicographicalSortM(list, order) {
    if (typeof list === "undefined" || list === null) {
        throw new Error("Invalid list of strings");
    }

    if (typeof order === "undefined" || order === null) {
        throw new Error("No sort order defined");
    }

    var hash = {};
    for(var i = 0; i < order.length; i++) {
        hash[order[i]] = String.fromCharCode("a".charCodeAt(0) + i);
    }

    var memoization = {};
    function valueOf(str) {
        var value = memoization[str];
        if (typeof value === "undefined") {
            var charArray = [];
            for (var i = 0; i < str.length; i++) {
                charArray.push(hash[str[i]]);
            }
            value = charArray.join("");
        }
        memoization[str] = value;
        return value;
    }


    function _sort(str1, str2) {
        var v1 = valueOf(str1);
        var v2 = valueOf(str2);

        return v1 < v2 ? -1 : (v1 > v2) ? 1 : 0;
    }

    list.sort(_sort);
//    console.log(list);
}

//lexicographicalSortM(["dab", "cab", "abcd", "dabc", "dabc", "dacb", "dbaa", "bcca", "b", "a", "ba"], "bcad");
