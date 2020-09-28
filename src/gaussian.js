const {isPrime} = require('mathjs');

export class Gaussian {
    constructor(...args) {
        this.x = 0;
        this.y = 0;
        if (args.length === 0) {
            return;
        }

        if (args.length === 1 && args[0] instanceof Array && args[0].length === 2) {
            let arr = args[0];
            if (typeof (arr[0]) == "number" && typeof (arr[1]) == "number") {
                this.x = arr[0];
                this.y = arr[1];
                return;
            }
        }

        if (args.length === 1 && args[0] instanceof Object && 'x' in args[0]) {
            this.x = args[0].x;
            if ('y' in args[0]) {
                this.y = args[0].y;
            }
            return;
        }

        if (args.length === 1 && typeof(args[0]) == "number") {
            this.x = args[0];
            this.y = 0;
            return;
        }

        if (args.length === 2) {
            if (typeof (args[0]) == "number" && typeof (args[1]) == "number") {
                this.x = args[0];
                this.y = args[1];
                return;
            }
        }

        //        throw Errors.ILLEGAL_PARAMETERS;
        console.log('throw');
        throw 666;
    }

    conjugate() {
        return new Gaussian(this.x, -this.y);
    }

    equalTo(g) {
        return (this.x == g.x) && (this.y == g.y);
    }

    add(g) {
        return new Gaussian(this.x + g.x, this.y + g.y);
    }

    subtract(g) {
        return new Gaussian(this.x - g.x, this.y - g.y);
    }

    multiply(g) {
        return new Gaussian(this.x*g.x - this.y*g.y,
                            this.x*g.y + this.y*g.x);
    }

    absoluteValue() {
        return Math.sqrt(this.norm());
    }

    norm() {
        return this.x*this.x + this.y*this.y;
    }

    isPrime() {
        if (this.x * this.y !== 0) {
            const hypot = this.x*this.x + this.y*this.y;
            return isPrime(hypot);
        } else {
            const c = Math.abs(this.x + this.y);
            return isPrime(c) && (c%4) == 3;
        }
    }

}

export default Gaussian;
