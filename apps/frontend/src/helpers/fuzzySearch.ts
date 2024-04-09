import FuzzySearch from "fuzzy-search";
// see usage here: https://www.npmjs.com/package/fuzzy-search

export function search(
  needle: string,
  haystack: string[],
  keys: string[],
): string[] {
  const searcher = new FuzzySearch(haystack, keys, {
    caseSensitive: false,
  });
  const result = searcher.search(needle);
  console.log(result);
  return result;
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
