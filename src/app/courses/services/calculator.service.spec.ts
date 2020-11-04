// Defining test suite here.
import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

describe('CalculatorService', () => {


  let calculator: CalculatorService,
    loggerSpy: any;

  beforeEach(() => {
    console.log('calling beforeEach');
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    // Configuring DI for testing
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy},
      ]
    });
    calculator = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    console.log('add test');
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

  it('should subtact two numbers', () => {
    console.log('subtract test');
    const result = calculator.subtract(5, 2);
    expect(result).toBe(3, 'unexpected subraction result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});
