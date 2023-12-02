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
        if (!(book?.Content).length) {
            continue;
        }
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
    return content.filter(content => {
        if (!content?.Text) {
            return false;
        }

        return (content?.Text).includes(searchTerm);
    });
}

/**
 * Adds scanned text to search results.
 * @param {Array} searchResults - Search results.
 * @param {Array} scannedTextWithSearchTerm - Scanned text which contains the search term.
 * @param {String} ISBN - Book identifier.
 * @returns {Array} Updated search results.
 */
function addScannedTextToSearchResults(searchResults, scannedTextWithSearchTerm, ISBN) {
    if (!scannedTextWithSearchTerm.length) {
        return searchResults;
    }

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

/** Example input object. */
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
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

//future tests
//no book
//book
//book, no text
//book, text
//book, case senstiative text
//do not modify origianl inputs

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
 * Should get the right number of results.
 */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}
