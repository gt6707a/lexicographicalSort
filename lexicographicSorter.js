/**
 * Created by micha on 11/14/15.
 */
function lexicographicalSort(list, order) {
    if (typeof list === "undefined" || list === null) {
        throw new Error("Invalid list of strings");
    }

    if (typeof order === "undefined" || order === null) {
        throw new Error("No sort order defined");
    }

    var hash = {};
    for(var i = 0; i < order.length; i++) {
        hash[order[i]] = i + 1;
    }

    function _sort(str1, str2) {
        var commonLength = str1.length <= str2.length ? str1.length : str2.length;

        for (var i = 0; i < commonLength; i++) {
            if (hash[str1[i]] > hash[str2[i]]) { return 1; }
            if (hash[str1[i]] < hash[str2[i]]) { return -1; }
        }

        if (str1.length > commonLength) return 1;
        if (str2.length > commonLength) return -1;

        return 0;
    }

    list.sort(_sort);
//    console.log(list);

    /*
     * Using Array.sort, it could be either quick sort O(1.39NlogN) in practice [quadratic in theory] or mergesort O(NlogN) where N is number of elements to sort.
     * Within each compare, it could take O(m) where m is the length of shorter string. Hash access is constant.
     * Overall, in theory, O is between O(mNLogN) (merge sort) to O(m x N^2 / 2) (quick sort).
     * I implemented 3-way quicksort in qLexSort.js to not use Array.sort()
     */
}

//lexicographicalSort(["dab", "cab", "abcd", "dabc", "dabc", "dacb", "dbaa", "bcca", "b", "a", "ba"], "bcad");
