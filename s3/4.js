const sampleString = 'the quick brown fox jumps over the lazy dog'

const getCounts = (input) => {
    let result = {}
    const words = input.split(' ')
    for ( const word of words) {
        if ( word in result ) {
            result[word]++
        } else {
            result[word] = 1
        }
    }
    return result
}

console.log(getCounts(sampleString))

const getFreq = (input) => {
    let result = {}
    const words = input.split(/[\s,]/)
    for ( const word of words) {
        if ( word in result ) {
            result[word]++
        } else {
            result[word] = 1
        }
    }
    for ( const word in result ) {
        result[word] /= words.length
    }
    return result
}

console.log(getFreq(sampleString))