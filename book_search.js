/**
 * Implementation of required solution/tests for USDC task. 
 */

/**
 * Searches for matches in scanned text.
 * @param {String} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    let searchResults = [];

    for (const book of scannedTextObj) {
        let scannedTextWithSearchTerm = getScannedTextWithSearchTerm(book?.Content, searchTerm);
        searchResults = addScannedTextToSearchResults(searchResults, scannedTextWithSearchTerm, book?.ISBN);
    }

    return {
        SearchTerm: searchTerm,
        Results: searchResults,
    };
}

/**
 * Gets all scanned text which contains the search term.
 * @param {Array} content - Scanned text for a particular book.
 * @param {String} searchTerm - The word or term we're searching for. 
 * @returns {Array} Scanned text which contains the search term.
 */
function getScannedTextWithSearchTerm(content, searchTerm) {
    return content.filter(content => (content?.Text).includes(searchTerm));
}

/**
 * Adds scanned text to search results.
 * @param {Array} searchResults - Search results.
 * @param {Array} scannedTextWithSearchTerm - Scanned text which contains the search term.
 * @param {String} ISBN - Book identifier.
 * @returns {Array} Updated search results.
 */
function addScannedTextToSearchResults(searchResults, scannedTextWithSearchTerm, ISBN) {
    return [
        ...searchResults,
        ...scannedTextWithSearchTerm.map(scannedText => {
            return {
                ISBN,
                Page: scannedText?.Page,
                Line: scannedText?.Line,
            };
        })
    ];
}

// Example input object
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
];
    
// Example output object
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

// Input without scanned text
const inputWithoutScannedText = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
];

// Input with case sensitive / insensitive text
const inputWithCaseSensitiveAndInsensitiveText = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "The"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "the"
            },
        ] 
    }
];




/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/**
 * Should get a known output given a known input.
 */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/**
 * Should get the right number of results when books and scanned text exist.
 */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/**
 * Should get the right number of results when books don't exist.
 */
const test3result = findSearchTermInBooks("the", []);
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
    console.log("Received:", test3result.Results.length);
}

/**
 * Should get the right number of results when books exist but scanned text does not.
 */
const test4result = findSearchTermInBooks("the", inputWithoutScannedText);
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 0);
    console.log("Received:", test4result.Results.length);
}

/**
 * Should get the right number of results when matching case insensitive text exists.
 */
const test5result = findSearchTermInBooks("the", inputWithCaseSensitiveAndInsensitiveText);
if (test5result.Results.length == 1) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 1);
    console.log("Received:", test5result.Results.length);
}

/**
 * Should get the right number of results for a multi word search term.
 */
const test6result = findSearchTermInBooks("now simply went on by her own", twentyLeaguesIn);
if (test6result.Results.length == 1) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 1);
    console.log("Received:", test6result.Results.length);
}

/**
 * Should get the right number of results for a search term with special characters. 
 */
const test7result = findSearchTermInBooks("Canadian\'s", twentyLeaguesIn);
if (test7result.Results.length == 1) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", 1);
    console.log("Received:", test7result.Results.length);
}

/**
 * Should get the right number of results when the search term cannot be found in any scanned text. 
 */
const test8result = findSearchTermInBooks('ddd', twentyLeaguesIn);
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", 0);
    console.log("Received:", test8result.Results.length);
}

/**
 * Should get the right number of results when the search term is null. 
 */
const test9result = findSearchTermInBooks(null, twentyLeaguesIn);
if (test9result.Results.length == 0) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", 0);
    console.log("Received:", test9result.Results.length);
}
