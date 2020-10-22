class Robot {
    constructor (name) {
      this.name = name
    }
  
    move () {
      console.log(`${this.name} is moving`)
    }
}
  
const r0 = new Robot('ordinary robot')
r0.move()

class Weapon {
    constructor (desc) {
        this.desc = desc
    }

    fire () {
        console.log(`${this.desc} is firing`)
    }
}

// The old fashioned/traditional way
// function Weapon(desc) {
//     this.desc = descthis.fire = function () {
//         console.log(`${this.desc} is firing`)
//     }
// }

class CombatRobot extends Robot {    
    constructor (name) {
        super(name)
        this.weapons = []
    }

    addWeapon (weapon) {
        this.weapons.push(weapon)
    }

    fire () {
        console.log('Firing all weapons')
        for (const weapon of this.weapons) {
            weapon.fire()
        }
    }
}

let cr0 = new CombatRobot('combat robot')
cr0.fire()
cr0.move()


let w0 = new Weapon('pew pew laser')
cr0.addWeapon(w0)
cr0.fire()

Robot.prototype.fly = function () {
    console.log(`${this.name} is flying`)
}

cr0.fly()

const f0 = cr0.fly

f0()

f0.apply(cr0)

const f1 = f0.bind(r0)
f1()