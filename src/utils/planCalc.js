import moment from 'moment';
import getMonth from './planCalc/getMonth';

const planCalc = (sortedData, paymentPerMonth) => {
  try {
    // params for generating month-by-month array with payments data
    const AllMonthsData = [];
    let isLastMonth = false;
    let isNA = false;

    // FIRST MONTH START
    const firstMonth = getMonth(sortedData, 0, paymentPerMonth);

    if (firstMonth && firstMonth.monthData) {
      if (firstMonth.monthData) {
        AllMonthsData.push(firstMonth.monthData);
      }
      if (firstMonth.isLastMonth) {
        isLastMonth = true;
      }
    }
    // FIRST MONTH END

    // OTHER MONTHS START
    while (AllMonthsData[AllMonthsData.length - 1].length > 0 && !isLastMonth) {
      const anotherMonth = getMonth(
        AllMonthsData[AllMonthsData.length - 1],
        AllMonthsData.length,
        paymentPerMonth
      );

      if (anotherMonth && anotherMonth.monthData) {
        if (anotherMonth.monthData) {
          AllMonthsData.push(anotherMonth.monthData);
        }
        if (anotherMonth.isLastMonth) {
          isLastMonth = true;
        }
      }

      // if process will take more than 20 years stop counting and send data with N/A
      if (AllMonthsData.length > 240) {
        isNA = true;
        break;
      }
    }
    // OTHER MONTHS END

    // Collecting all results to one object
    const calculatedData = {};

    // regroup calculation by cards
    const regByCards = [];

    AllMonthsData.map((month, monthIndex) => {
      month.map(card => {
        if (card.name) {
          // Array
          let curCardIndex = -1;
          if (regByCards.length > 0) {
            curCardIndex = regByCards.findIndex(
              item => Object.keys(item)[0] === card.name
            );
          }

          if (curCardIndex === -1) {
            regByCards.push({
              [card.name]: {
                [moment()
                  .add(monthIndex + 1, 'month')
                  .format('YYYY/MM')]: { ...card }
              }
            });
          } else {
            regByCards[curCardIndex] = {
              [card.name]: {
                ...regByCards[curCardIndex][card.name],
                [moment()
                  .add(monthIndex + 1, 'month')
                  .format('YYYY/MM')]: { ...card }
              }
            };
          }
        }
        return null;
      });
      return null;
    });

    // regroup data as card's total data
    const cards = [];

    regByCards.map(card => {
      const cardName = Object.keys(card)[0];
      const payOffDate = moment(Object.keys(card[cardName]).pop(), 'YYYY/MM');
      const curCardData = sortedData.find(item => item.name === cardName);

      cards.push({
        name: cardName,
        image: curCardData ? curCardData.image : null,
        annualFeeAmount: Number(
          Object.values(card[cardName])
            .map(item => item.annualFeeThisMonth)
            .reduce((a, b) => a + b, 0)
            .toFixed(2)
        ),
        balance: curCardData ? curCardData.balance : null,
        payOffDate: !isNA ? moment(payOffDate).format('MMM YYYY') : 'N/A',
        interest: Object.values(card[cardName])[0].interest,
        interestPaid: Number(
          Object.values(card[cardName])
            .map(item => item.curInterest)
            .reduce((a, b) => a + b, 0)
            .toFixed(2)
        )
      });

      return null;
    });

    calculatedData.cards = cards;

    // get total interest from all cards at first month
    calculatedData.firstMonthInterest = Number(
      AllMonthsData[0]
        .map(item => item.curInterest)
        .reduce((a, b) => a + b, 0)
        .toFixed(0)
    );

    // regroup data for chart
    const principalChart = [];
    const interestChart = [];

    AllMonthsData.map((month, monthIndex) => {
      // Principal chart
      const curMonthPrincipal = {};

      if (principalChart[principalChart.length - 1]) {
        Object.keys(principalChart[principalChart.length - 1]).map(item => {
          if (item !== 'name') {
            curMonthPrincipal[item] = 0;
          }
          return null;
        });
      }

      curMonthPrincipal.name = moment()
        .add(monthIndex + 1, 'month')
        .format('MM/YYYY');

      month.map(item => {
        curMonthPrincipal[item.name] = item.balance > 0 ? item.balance : 0;
        return null;
      });

      principalChart.push(curMonthPrincipal);

      // Interest chart
      const curMonthInterest = interestChart[interestChart.length - 1]
        ? { ...interestChart[interestChart.length - 1] }
        : {};

      curMonthInterest.name = moment()
        .add(monthIndex + 1, 'month')
        .format('MM/YYYY');

      month.map(item => {
        const prevMonthInterest = curMonthInterest[item.name]
          ? curMonthInterest[item.name]
          : 0;
        curMonthInterest[item.name] =
          item.curInterest > 0
            ? prevMonthInterest + item.curInterest
            : prevMonthInterest;
        return null;
      });

      interestChart.push(curMonthInterest);

      return null;
    });

    calculatedData.principalChart = principalChart;
    calculatedData.interestChart = interestChart;

    return calculatedData;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return [];
  }
};

export default planCalc;
