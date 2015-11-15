/*
 * I did this for personal benefit to not use Array.sort()
 * I remember key-indexed sort is linear, but this function sorts variable length so must use MSD sorting.
 * MSD can result in too many small temporary arrays and could be worse.
 * That led me to finding 3-way quicksort so implemented it for practice sake.
 * The idea is similar to quick sort but it's performed on each index.
 * Starting from index 0, algorithm partitions the list into 3 partitions based on a partition char of any string in the list (ie. last string in the list).
 * It moves strings in place to 3 partitions, those with str[index] < partition char, those with str[index] === partition char, and those with str[index] > partition char.
 * Then continue the same partitioning on each partition recursively.
 * But algorithm can skip comparing those with str[index] === partition char since they are all the same and can move on to next index.
 * Also skips when it hits end of string.
 */

function qLexSort(list, order) {
    var hash = {};
    for(var i = 0; i < order.length; i++) {
        hash[order[i]] = i + 1;
    }
    hash["undefined"] = -1;

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
            while (hash[list[++i][x]] < hash[v]) { if (i === hi) { break; }} // find first string[x] >= v from lo
            while (hash[v] < hash[list[--j][x]]) { if (j === lo) { break; }} // find first string[x] <= v from hi

            if (i > j) break; // break if i crossed j

            exch(list, i, j);

            if (hash[list[i][x]] === hash[v]) { exch(list, ++p, i); }
            if (hash[list[j][x]] === hash[v]) { exch(list, --q, j); }
        }

        if (p === q) {
            if (hash[v] != -1) {
                qSort(list, lo, hi, x + 1);
            }
            return;
        }

        if (hash[list[i][x]] < hash[v]) { i++; }// if list[i] is smaller than partitioning char, increment

        for (var k = lo; k <= p; k++) {
            exch(list, k, j--);
        } // swap top items with partition char to middle

        for (var k = hi; k >= q; k--) {
            exch(list, k, i++);
        } // swap bottom items with partition char to middle

        qSort(list, lo, j, x); // qSort first partition

        if ((i == hi) && hash[list[i][x]] === hash[v]) i++;
        if (hash[v] !== -1) qSort(list, j + 1, i - 1, x + 1); // qSort 2nd partition

        qSort(list, i, hi, x); // qSort 3rd partition
    }

    qSort(list, 0, list.length - 1, 0);
}

//var list = ["dab", "cab", "abcd", "dabc", "dabc", "dacb", "dbaa", "bcca", "b", "a", "ba"];
//qLexSort(list, "bcad");
//
//console.log(list);

