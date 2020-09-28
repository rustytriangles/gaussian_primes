import {Gaussian} from './gaussian.js';

test('default ctor', () => {
    const a = new Gaussian();
    expect(a.equalTo(new Gaussian(0,0)));
});

test('single arg ctor', () => {
    const a = new Gaussian(3);
    expect(a.equalTo(new Gaussian(3,0)));
});

test('array ctor', () => {
    const a = new Gaussian([1, 2]);
    expect(a.equalTo(new Gaussian(1,2)));
});

test('object ctor', () => {
    const a = new Gaussian({x: 1, y: 2});
    expect(a.equalTo(new Gaussian(1,2)));
});

test('add', () => {
    expect(new Gaussian(1,0).add(new Gaussian(0,0)).equalTo(new Gaussian(1,0)));
    expect(new Gaussian(1,2).add(new Gaussian(3,4)).equalTo(new Gaussian(4,6)));
    expect(new Gaussian(1,2).add(new Gaussian(-3,4)).equalTo(new Gaussian(-2,6)));
});

test('subtract', () => {
    expect(new Gaussian(1,2).subtract(new Gaussian(3,4)).equalTo(new Gaussian(-2,-2)));
    expect(new Gaussian(-1,2).subtract(new Gaussian(3,4)).equalTo(new Gaussian(-4,-2)));
    expect(new Gaussian(1,-2).subtract(new Gaussian(3,4)).equalTo(new Gaussian(-2,-6)));
});

test('multiply', () => {
    const a = new Gaussian(1,1);
    const b = new Gaussian(3,-1);

    expect(a.add(b).equalTo(new Gaussian(4,2)));

    expect(new Gaussian(-1, 0).multiply(0,1).equalTo( 0,-1));
    expect(new Gaussian( 0,-1).multiply(0,1).equalTo( 1, 0));
    expect(new Gaussian( 1, 0).multiply(0,1).equalTo( 0, 1));
    expect(new Gaussian( 0, 1).multiply(0,1).equalTo(-1, 0));
});

test('conjugate', () => {
    expect(new Gaussian(1,2).conjugate().equalTo(new Gaussian(1,-2)));
    expect(new Gaussian(1,-2).conjugate().equalTo(new Gaussian(1,2)));
    expect(new Gaussian(-1,2).conjugate().equalTo(new Gaussian(-1,-2)));
    expect(new Gaussian(-1,-2).conjugate().equalTo(new Gaussian(-1,2)));
});

test('absoluteValue', () => {
    expect(new Gaussian(0).absoluteValue()).toBe(0);
    expect(new Gaussian(1).absoluteValue()).toBe(1);
    expect(new Gaussian(2).absoluteValue()).toBe(2);
    expect(new Gaussian(-2).absoluteValue()).toBe(2);
    expect(new Gaussian(0,2).absoluteValue()).toBe(2);
    expect(new Gaussian(0,-2).absoluteValue()).toBe(2);
    expect(new Gaussian(-3,-4).absoluteValue()).toBe(5);
});

test('norm', () => {
    expect(new Gaussian(0).norm()).toBe(0);
    expect(new Gaussian(1).norm()).toBe(1);
    expect(new Gaussian(2).norm()).toBe(4);
    expect(new Gaussian(-2).norm()).toBe(4);
    expect(new Gaussian(0,2).norm()).toBe(4);
    expect(new Gaussian(0,-2).norm()).toBe(4);
    expect(new Gaussian(1,1).norm()).toBe(2);
    expect(new Gaussian(-1,1).norm()).toBe(2);
    expect(new Gaussian(1,-1).norm()).toBe(2);
    expect(new Gaussian(-1,-1).norm()).toBe(2);
    expect(new Gaussian(-3,-4).norm()).toBe(25);
});

test('isPrime real', () => {
    // these are integer primes and gaussian primes
    expect(new Gaussian(3).isPrime()).toBeTruthy();
    expect(new Gaussian(7).isPrime()).toBeTruthy();
    expect(new Gaussian(11).isPrime()).toBeTruthy();
    expect(new Gaussian(19).isPrime()).toBeTruthy();
    expect(new Gaussian(23).isPrime()).toBeTruthy();
    expect(new Gaussian(31).isPrime()).toBeTruthy();
    expect(new Gaussian(43).isPrime()).toBeTruthy();

    // these are integer primes, but are not gaussian primes
    expect(new Gaussian(2).isPrime()).toBeFalsy();
    expect(new Gaussian(5).isPrime()).toBeFalsy();
    expect(new Gaussian(13).isPrime()).toBeFalsy();
    expect(new Gaussian(17).isPrime()).toBeFalsy();
    expect(new Gaussian(29).isPrime()).toBeFalsy();
    expect(new Gaussian(37).isPrime()).toBeFalsy();

    // and these aren't primes of any sort
    expect(new Gaussian(4).isPrime()).toBeFalsy();
    expect(new Gaussian(6).isPrime()).toBeFalsy();
    expect(new Gaussian(8).isPrime()).toBeFalsy();
    expect(new Gaussian(9).isPrime()).toBeFalsy();
    expect(new Gaussian(10).isPrime()).toBeFalsy();
    expect(new Gaussian(12).isPrime()).toBeFalsy();
    expect(new Gaussian(14).isPrime()).toBeFalsy();
    expect(new Gaussian(15).isPrime()).toBeFalsy();
    expect(new Gaussian(16).isPrime()).toBeFalsy();
});

test('isPrime complex', () => {

    expect(new Gaussian(-5,-4).isPrime()).toBeTruthy();
    expect(new Gaussian(-5,-2).isPrime()).toBeTruthy();
    expect(new Gaussian(-5, 2).isPrime()).toBeTruthy();
    expect(new Gaussian(-5, 4).isPrime()).toBeTruthy();
    expect(new Gaussian(-4,-5).isPrime()).toBeTruthy();
    expect(new Gaussian(-4,-1).isPrime()).toBeTruthy();
    expect(new Gaussian(-4, 1).isPrime()).toBeTruthy();
    expect(new Gaussian(-4, 5).isPrime()).toBeTruthy();
    expect(new Gaussian(-3,-2).isPrime()).toBeTruthy();
    expect(new Gaussian(-3, 2).isPrime()).toBeTruthy();
    expect(new Gaussian(-2,-5).isPrime()).toBeTruthy();
    expect(new Gaussian(-2,-3).isPrime()).toBeTruthy();
    expect(new Gaussian(-2,-1).isPrime()).toBeTruthy();
    expect(new Gaussian(-2, 1).isPrime()).toBeTruthy();
    expect(new Gaussian(-2, 3).isPrime()).toBeTruthy();
    expect(new Gaussian(-2, 5).isPrime()).toBeTruthy();
    expect(new Gaussian(-1,-4).isPrime()).toBeTruthy();
    expect(new Gaussian(-1,-2).isPrime()).toBeTruthy();
    expect(new Gaussian(-1,-1).isPrime()).toBeTruthy();
    expect(new Gaussian(-1, 1).isPrime()).toBeTruthy();
    expect(new Gaussian(-1, 2).isPrime()).toBeTruthy();
    expect(new Gaussian(-1, 4).isPrime()).toBeTruthy();
    expect(new Gaussian( 0,-3).isPrime()).toBeTruthy();
    expect(new Gaussian( 0, 3).isPrime()).toBeTruthy();
    expect(new Gaussian( 1,-4).isPrime()).toBeTruthy();
    expect(new Gaussian( 1,-2).isPrime()).toBeTruthy();
    expect(new Gaussian( 1,-1).isPrime()).toBeTruthy();
    expect(new Gaussian( 1, 1).isPrime()).toBeTruthy();
    expect(new Gaussian( 1, 2).isPrime()).toBeTruthy();
    expect(new Gaussian( 1, 4).isPrime()).toBeTruthy();
    expect(new Gaussian( 2,-5).isPrime()).toBeTruthy();
    expect(new Gaussian( 2,-3).isPrime()).toBeTruthy();
    expect(new Gaussian( 2,-1).isPrime()).toBeTruthy();
    expect(new Gaussian( 2, 1).isPrime()).toBeTruthy();
    expect(new Gaussian( 2, 3).isPrime()).toBeTruthy();
    expect(new Gaussian( 2, 5).isPrime()).toBeTruthy();
    expect(new Gaussian( 3,-2).isPrime()).toBeTruthy();
    expect(new Gaussian( 3, 2).isPrime()).toBeTruthy();
    expect(new Gaussian( 4,-5).isPrime()).toBeTruthy();
    expect(new Gaussian( 4,-1).isPrime()).toBeTruthy();
    expect(new Gaussian( 4, 1).isPrime()).toBeTruthy();
    expect(new Gaussian( 4, 5).isPrime()).toBeTruthy();
    expect(new Gaussian( 5,-4).isPrime()).toBeTruthy();
    expect(new Gaussian( 5,-2).isPrime()).toBeTruthy();
    expect(new Gaussian( 5, 2).isPrime()).toBeTruthy();
    expect(new Gaussian( 5, 4).isPrime()).toBeTruthy();

    expect(new Gaussian(-5,-3).isPrime()).toBeFalsy();
    expect(new Gaussian(-5,-1).isPrime()).toBeFalsy();
    expect(new Gaussian(-5, 1).isPrime()).toBeFalsy();
    expect(new Gaussian(-5, 3).isPrime()).toBeFalsy();
    expect(new Gaussian(-4,-4).isPrime()).toBeFalsy();
    expect(new Gaussian(-4,-3).isPrime()).toBeFalsy();
    expect(new Gaussian(-4,-2).isPrime()).toBeFalsy();
    expect(new Gaussian(-4, 2).isPrime()).toBeFalsy();
    expect(new Gaussian(-4, 3).isPrime()).toBeFalsy();
    expect(new Gaussian(-4, 4).isPrime()).toBeFalsy();
    expect(new Gaussian(-3,-4).isPrime()).toBeFalsy();
    expect(new Gaussian(-3,-3).isPrime()).toBeFalsy();
    expect(new Gaussian(-3,-1).isPrime()).toBeFalsy();
    expect(new Gaussian(-3, 1).isPrime()).toBeFalsy();
    expect(new Gaussian(-3, 3).isPrime()).toBeFalsy();
    expect(new Gaussian(-3, 4).isPrime()).toBeFalsy();
    expect(new Gaussian(-2,-4).isPrime()).toBeFalsy();
    expect(new Gaussian(-2,-2).isPrime()).toBeFalsy();
    expect(new Gaussian(-2, 2).isPrime()).toBeFalsy();
    expect(new Gaussian(-2, 4).isPrime()).toBeFalsy();
    expect(new Gaussian(-1,-3).isPrime()).toBeFalsy();
    expect(new Gaussian(-1, 3).isPrime()).toBeFalsy();
    expect(new Gaussian( 1,-3).isPrime()).toBeFalsy();
    expect(new Gaussian( 1, 3).isPrime()).toBeFalsy();
    expect(new Gaussian( 2,-4).isPrime()).toBeFalsy();
    expect(new Gaussian( 2,-2).isPrime()).toBeFalsy();
    expect(new Gaussian( 2, 2).isPrime()).toBeFalsy();
    expect(new Gaussian( 2, 4).isPrime()).toBeFalsy();
    expect(new Gaussian( 3,-4).isPrime()).toBeFalsy();
    expect(new Gaussian( 3,-3).isPrime()).toBeFalsy();
    expect(new Gaussian( 3,-1).isPrime()).toBeFalsy();
    expect(new Gaussian( 3, 1).isPrime()).toBeFalsy();
    expect(new Gaussian( 3, 3).isPrime()).toBeFalsy();
    expect(new Gaussian( 3, 4).isPrime()).toBeFalsy();
    expect(new Gaussian( 4,-4).isPrime()).toBeFalsy();
    expect(new Gaussian( 4,-3).isPrime()).toBeFalsy();
    expect(new Gaussian( 4,-2).isPrime()).toBeFalsy();
    expect(new Gaussian( 4, 2).isPrime()).toBeFalsy();
    expect(new Gaussian( 4, 3).isPrime()).toBeFalsy();
    expect(new Gaussian( 4, 4).isPrime()).toBeFalsy();
    expect(new Gaussian( 5,-3).isPrime()).toBeFalsy();
    expect(new Gaussian( 5,-1).isPrime()).toBeFalsy();
    expect(new Gaussian( 5, 1).isPrime()).toBeFalsy();
    expect(new Gaussian( 5, 3).isPrime()).toBeFalsy();
});
