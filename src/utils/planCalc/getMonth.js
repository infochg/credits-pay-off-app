import getClosedCard from './getClosedCard';
import getCard from './getCard';

const getMonth = (fullData, monthNum, paymentPerMonth) => {
  try {
    let isLastMonth = false;

    // params for calculating correct extra
    let extraFromCardValue = 0;
    let extraValue = 0;

    // params for collecting monthData
    const monthData = [];
    const monthDataObj = {};

    // calculate minPayment for month
    const minPayment = fullData
      .map(item => {
        // if one of cards was closed at previous month, don't use it's data
        if (item.balance > 0) {
          return item.minimumPayment;
        }
        return null;
      })
      .reduce((a, b) => a + b, 0);

    // if interestPayment from slider is bigger than all balances + interests for 1st month close all cards in 1st month
    // START
    const totalBalance = fullData
      .map(item => {
        if (item.balance && item.balance > 0) {
          return item.balance;
        }
        return null;
      })
      .reduce((a, b) => a + b, 0);

    const totalInterests = fullData
      .map(item => {
        if (item.curInterest && typeof item.curInterest === 'number') {
          return item.curInterest;
        }
        return null;
      })
      .reduce((a, b) => a + b, 0);

    if (paymentPerMonth >= totalBalance + totalInterests) {
      // set parameter isLastMonth to true so WHILE will stop after this month will be counted
      isLastMonth = true;
    }
    // END

    // check all cards one by one
    // START
    const fullDataArray = fullData.slice(0);

    const checkCards = () => {
      // check is there any closed cards
      const closedCardIndex = getClosedCard(
        fullDataArray,
        paymentPerMonth,
        minPayment,
        extraFromCardValue,
        monthNum
      );

      if (closedCardIndex || closedCardIndex === 0) {
        // if there is a closing card in current month

        // if closing card is main card
        if (closedCardIndex === 0) {
          // if user want to pay more, than minimum, add extra
          if (paymentPerMonth > minPayment) {
            extraValue += paymentPerMonth - minPayment;
          }
          // if there is extra payment from closed card at this month, we use it for extra param
          if (extraFromCardValue > 0) {
            extraValue += extraFromCardValue;
            extraFromCardValue = 0;
          }
        }

        const closedCard = getCard(
          fullDataArray[closedCardIndex].balance,
          fullDataArray[closedCardIndex].interest,
          fullDataArray[closedCardIndex].minimumPayment,
          fullDataArray[closedCardIndex].name,
          fullDataArray[closedCardIndex].annualFeeAmount,
          fullDataArray[closedCardIndex].annualFeeDate,
          fullDataArray[closedCardIndex].annualFeeThisMonth || 0,
          monthNum,
          extraValue || 0
        );

        if (closedCard && closedCard.data !== null) {
          const curItemIndex = fullData.findIndex(
            item => item.name === closedCard.data.name
          );
          monthDataObj[curItemIndex] = closedCard.data;
        }

        if (
          closedCard &&
          closedCard.extraFromCard &&
          closedCard.extraFromCard > 0
        ) {
          extraFromCardValue += closedCard.extraFromCard;
        }

        // if closed card is main card
        if (closedCardIndex === 0) {
          extraValue = 0;
        }

        // remove closed card from fullDataArray
        fullDataArray.splice(closedCardIndex, 1);
      } else {
        // if there is no closing card in current month

        // if current card is main card
        if (fullDataArray.length === 1) {
          // if user want to pay more, than minimum, add extra
          if (paymentPerMonth > minPayment) {
            extraValue += paymentPerMonth - minPayment;
          }
          // if there is extra payment from closed card at this month, we use it for extra param
          if (extraFromCardValue > 0) {
            extraValue += extraFromCardValue;
            extraFromCardValue = 0;
          }
        }

        const curCardData = fullDataArray[fullDataArray.length - 1];

        const cardData = getCard(
          curCardData.balance,
          curCardData.interest,
          curCardData.minimumPayment,
          curCardData.name,
          curCardData.annualFeeAmount,
          curCardData.annualFeeDate,
          curCardData.annualFeeThisMonth,
          monthNum,
          extraValue || 0
        );

        if (cardData && cardData.data !== null) {
          const curItemIndex = fullData.findIndex(
            item => item.name === cardData.data.name
          );
          monthDataObj[curItemIndex] = cardData.data;
        }

        // if current card is main card
        if (fullDataArray.length === 1) {
          extraValue = 0;
        }

        // remove card, that we calculated for current month from fullDataArray
        fullDataArray.splice(fullDataArray.length - 1, 1);
      }

      // check all cards, that left in current month, again
      if (fullDataArray.length > 0) {
        checkCards(fullDataArray);
      }
    };

    // check all cards first time in current month
    if (fullDataArray.length > 0) {
      checkCards(fullDataArray);
    }
    // END

    Object.values(monthDataObj).map(item => {
      monthData.push(item);
      return null;
    });

    return { monthData, isLastMonth };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return [];
  }
};

export default getMonth;
