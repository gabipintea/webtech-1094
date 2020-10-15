const sampleDictionary = ['the', 'quick', 'brown', 'fox',
            'jumps', 'over', 'the', 'lazy', 'dog']

const sampleString = `
    best
    read
    on
    windy
    nights
`

const checkAcrostic = (input, dictionary) => {
    let words = []
    let cWord = ''
    words = input.split('\n')
    for ( const word of words ) {
        if (word.trim()) {
            cWord += word.trim()[0]
        }
        
    }    
    
    return dictionary.indexOf(cWord) !== -1
}

console.log(checkAcrostic(sampleString, sampleDictionary))