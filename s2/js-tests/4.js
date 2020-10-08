let a = [1, 2, 3, 4, 5]

let o = {
    name: 'some name',
    age: 111
}

console.log('Classic For C like')
for (let i = 0; i < a.length; i++) {
    if (a[i] > 3) {
        console.log(a[i])
    }
}

console.log('for...of')
for (let elem of a) {
    if ( elem > 3 ) {
        console.log(elem)
    }
}

console.log('arr.forEach')
a.forEach(e => {
    if ( e > 3 ) {
        console.log(e)
    }
})

console.log('arr.filter')
let b = a.filter(e => e > 3)
console.log(b)

console.log('for...in - objects example')
for (let key in o) {
    console.log(o[key])
}

console.log(Object.keys(o))