// eslint-disable-next-line
export const numberWithCommas = (x, withDollar, toFixed) => {
  try {
    if (x || x === 0) {
      if (withDollar) {
        if (x < 0) {
          const num = x
            .toFixed(toFixed !== undefined ? toFixed : 0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            .replace('-', '');
          return `-$${num}`;
        }

        return `$${x
          .toFixed(toFixed !== undefined ? toFixed : 0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
      }

      return x
        .toFixed(toFixed !== undefined ? toFixed : 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return 'N/A';
  }
  return null;
};
