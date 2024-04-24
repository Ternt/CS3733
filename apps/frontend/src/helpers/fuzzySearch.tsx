import FuzzySearch from "fuzzy-search";
// see usage here: https://www.npmjs.com/package/fuzzy-search

import {PageCardInfo} from "../pages/SearchPage/SearchPage.tsx";

export function search(
  needle: string,
  haystack: PageCardInfo[],
): PageCardInfo[] {
  const searcher = new FuzzySearch(haystack, ["keywords"], {
    caseSensitive: false,
    sort: true,
  });
  return searcher.search(needle);
}

// example code/how to use keys for objects:

// const people = [{
//     name: {
//         firstName: 'Jesse',
//         lastName: 'Bowen',
//     },
//     state: 'Seattle',
// }];
//
// const searcher = new FuzzySearch(people, ['name.firstName', 'state'], {
//     caseSensitive: true,
// });
// const result = searcher.search('ess');
