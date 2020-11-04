import {fakeAsync, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('Async Testing Examles', () => {

  it('should be an async example with Jasmine done()', (done:DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  // Now we're executing our test in an angular "zone"
  it('should be an async test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {});
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      // expect(test).toBeTruthy(); Moving down and outside of this setTimeout
    }, 1000);
    // tick(1000); // can only be called within a fakeAsync zone
    // simulating the passage of time:
    tick(400);  // will fail the test
    // needs more time to pass
    tick(600);
    expect(test).toBeTruthy();
  }));

  it('should be an async test example w/ plain Promise', fakeAsync(() => {

    let test = false;
    console.log('Creating a promise');

    Promise.resolve().then(() => {
      return Promise.resolve();
    }).then(() => {
      console.log('Promise second then() evaluated successfully');
      test = true;
    });
    flushMicrotasks();
    console.log('running test assertions');
    expect(test).toBeTruthy();

  }));

  it('should be an async test example w/ Promises + setTimeout() ', fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => {
          counter += 1;
        }, 1000);
      });
    // good example of how he tasks and microtasks are working
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it('should be an example w/ Observables', fakeAsync(() => {
    let test = false;
    console.log('creating Observable');
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log('running test assertions');
    expect(test).toBe(true);
  }));

});
