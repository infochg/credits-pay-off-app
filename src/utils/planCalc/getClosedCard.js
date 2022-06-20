import moment from 'moment';

const getClosedCard = (
  fullData,
  paymentPerMonth,
  minPayment,
  extraFromCardValue,
  monthNum
) => {
  try {
    let extraValue = 0;

    // check is card closed in current month
    const isCardClosed = (index, item) => {
      // get interest
      const inter = typeof item.interest === 'number' ? item.interest : 20;
      const curInterest = item.balance * (inter / (12 * 100));

      // calculate params for annual fee
      const feeDate = new Date(moment(item.annualFeeDate).format('MMMM YYYY'));
      const currentDate = new Date(
        moment()
          .add(monthNum + 1, 'months')
          .format('MMMM YYYY')
      );

      // calculate afterBalance
      let afterBalance = 0;

      // adding annual fee to balance if it's month to pay it
      if (
        moment(feeDate).format('MMMM') === moment(currentDate).format('MMMM')
      ) {
        afterBalance += Number(item.annualFeeAmount);
      }

      if (
        afterBalance +
          item.balance +
          curInterest -
          item.minimumPayment -
          extraValue <
        0
      ) {
        return index;
      }
      return null;
    };

    // get reversed array of cards to collect all data from NOT main cards first
    const fullDataArrayReversed = fullData.slice(0).reverse();

    let closedCardIndex;

    // eslint-disable-next-line
    fullDataArrayReversed.map((item, index) => {
      // if card is main
      if (index === fullDataArrayReversed.length - 1) {
        // if user want to pay more, than minimum, add extra
        if (paymentPerMonth > minPayment) {
          extraValue += paymentPerMonth - minPayment;
        }
        // if there is extra payment from closed card at this month, we use it for extra param
        if (extraFromCardValue > 0) {
          extraValue += extraFromCardValue;
        }
      }

      // get correct item index from non-reversed array of cards
      const curItemIndex = fullData.findIndex(it => item.name === it.name);
      closedCardIndex = isCardClosed(curItemIndex, item);

      return null;
    });

    return closedCardIndex;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return null;
  }
};

export default getClosedCard;
