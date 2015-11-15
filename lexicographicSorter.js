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

    function exch(list, i, j) {
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }

    function qSort(list, lo, hi, x) {
        if ((hi - lo) <= 0) { return; } // Done

        var i = lo - 1, j = hi;
        var p = lo - 1, q = hi;
        var v = list[hi][x];

        while (i < j) {
            while (list[++i][x] < v) { if (i === hi) { break; }} // find first string[x] >= v from lo
            while (v < list[--j][x]) { if (j === lo) { break; }} // find first string[x] <= v from hi

            if (i > j) break; // break if i crossed j

            exch(list, i, j);

            if (list[i][x] === v) { exch(list, ++p, i); }
            if (list[j][x] === v) { exch(list, --q, j); }
        }

        if (p === q) {
            if (v != '\0') {
                qSort(list, lo, hi, x + 1);
            }
        }



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
    console.log(list);

    /*
     * Using Array.sort, it could be either qsort O(1.39NlogN) or mergesort O(NlogN).
     * Within each compare,
     */
}

lexicographicalSort(["dab", "cab", "abcd", "dabc", "dabc", "dacb", "dbaa", "bcca", "b", "a", "ba"], "bcad");