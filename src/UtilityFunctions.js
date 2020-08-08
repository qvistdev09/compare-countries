import React from 'react';
export function format(input, type) {
  if (!input) {
    return 'n/a';
  }

  switch (type) {
    case 'population':
      if (input > 1000000) {
        let toMillion = input / 1000000;
        return Math.round(toMillion * 10) / 10 + ' mil';
      } else if (input > 10000) {
        let toThousand = input / 1000;
        return Math.round(toThousand * 10) / 10 + ' k';
      } else {
        return input;
      }
    case 'area':
      return [
        input.toLocaleString() + ' km',
        <span key="raised-span" className="raised">
          2
        </span>,
      ];
    case 'gini':
      return input + '%';
    default:
      return input;
  }
}
