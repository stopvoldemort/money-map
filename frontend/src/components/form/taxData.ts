
const SINGLE = "single";
const MARRIED = "married";
const NY = "NY";
const NYC = "NYC";

const federalStandardDeduction = {
  [SINGLE]: 14600,
  [MARRIED]: 29200,
}

const stateStandardDeduction = {
  [NY]: {
    [SINGLE]: 8000,
    [MARRIED]: 16050,
  },
}

const localStandardDeduction = {
  [NYC]: {
    [SINGLE]: 8000,
    [MARRIED]: 16050,
  },
}

const federalTaxBrackets = {
  [SINGLE]: [
    {
      upper_bound: 11600,
      rate: 10.0,
    }, {
      upper_bound: 47150,
      rate: 12.0,
    }, {
      upper_bound: 100525,
      rate: 22.0,
    }, {
      upper_bound: 191950,
      rate: 24.0,
    }, {
      upper_bound: 243725,
      rate: 32.0,
    }, {
      upper_bound: 609350,
      rate: 35.0,
    }, {
      upper_bound: 999999999,
      rate: 37.0,
    },
  ],
  [MARRIED]: [
    {
      upper_bound: 23200,
      rate: 10.0,
    }, {
      upper_bound: 94300,
      rate: 12.0,
    }, {
      upper_bound: 201050,
      rate: 22.0,
    }, {
      upper_bound: 383900,
      rate: 24.0,
    }, {
      upper_bound: 487450,
      rate: 32.0,
    }, {
      upper_bound: 731200,
      rate: 35.0,
    }, {
      upper_bound: 999999999,
      rate: 37.0,
    },
  ]
}

const stateTaxBrackets = {
  [NY]: {
    [SINGLE]: [
      {
        upper_bound: 8500,
        rate: 4.0,
      }, {
        upper_bound: 11700,
        rate: 4.5,
      }, {
        upper_bound: 13900,
        rate: 5.25,
      }, {
        upper_bound: 80650,
        rate: 5.5,
      }, {
        upper_bound: 215400,
        rate: 6.0,
      }, {
        upper_bound: 1077550,
        rate: 6.85,
      }, {
        upper_bound: 5000000,
        rate: 9.65,
      }, {
        upper_bound: 25000000,
        rate: 10.3,
      }, {
        upper_bound: 999999999,
        rate: 10.9,
      },
    ],
    [MARRIED]: [
      {
        upper_bound: 17150,
        rate: 4.0,
      }, {
        upper_bound: 23600,
        rate: 4.5,
      }, {
        upper_bound: 27900,
        rate: 5.25,
      }, {
        upper_bound: 161550,
        rate: 5.5,
      }, {
        upper_bound: 323200,
        rate: 6.0,
      }, {
        upper_bound: 2155350,
        rate: 6.85,
      }, {
        upper_bound: 5000000,
        rate: 9.65,
      }, {
        upper_bound: 25000000,
        rate: 10.3,
      }, {
        upper_bound: 999999999,
        rate: 10.9,
      },
    ],
  },
}

const localTaxBrackets = {
  [NYC]: {
    [SINGLE]: [
      {
        upper_bound: 12000,
        rate: 3.078,
      }, {
        upper_bound: 25000,
        rate: 3.762,
      }, {
        upper_bound: 50000,
        rate: 3.819,
      }, {
        upper_bound: 999999999,
        rate: 3.876,
      },
    ],
    [MARRIED]: [
      {
        upper_bound: 21600,
        rate: 3.078,
      }, {
        upper_bound: 45000,
        rate: 3.762,
      }, {
        upper_bound: 90000,
        rate: 3.819,
      }, {
        upper_bound: 999999999,
        rate: 3.876,
      },
    ],
  },
}


export {
  federalStandardDeduction,
  stateStandardDeduction,
  localStandardDeduction,
  federalTaxBrackets,
  stateTaxBrackets,
  localTaxBrackets,
  SINGLE,
  MARRIED,
  NY,
  NYC,
};
