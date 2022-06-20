import moment from 'moment';

const getCard = (
  balance,
  interest,
  minimumPayment,
  name,
  annualFeeAmount,
  annualFeeDate,
  annualFeeThisMonth,
  monthNum,
  extra
) => {
  try {
    // get interest
    const inter = typeof interest === 'number' ? interest : 20;
    const curInterest = balance * (inter / (12 * 100));
    let extraFromCard = 0;

    // if card is already closed before adding to system just return it as it as to show it in system
    if (monthNum === 0 && balance === 0) {
      return {
        data: {
          name,
          interest: interest || '~20',
          minimumPayment,
          annualFeeAmount,
          annualFeeDate,
          annualFeeThisMonth,
          extra,
          curInterest: 0,
          balance
        },
        extraFromCard
      };
    }

    // calculating card data
    if (balance && balance > 0) {
      // calculate params for annual fee
      const feeDate = new Date(moment(annualFeeDate).format('MMMM YYYY'));
      const currentDate = new Date(
        moment()
          .add(monthNum + 1, 'months')
          .format('MMMM YYYY')
      );
      let annualFeeThisMonthVal = 0;

      // param for balance of the card at the end of current month
      let afterBalance = 0;

      // adding annual fee to balance if it's month to pay it
      if (
        moment(feeDate).format('MMMM') === moment(currentDate).format('MMMM')
      ) {
        afterBalance += Number(annualFeeAmount);
        annualFeeThisMonthVal += Number(annualFeeAmount);
      }

      if (afterBalance + balance + curInterest - minimumPayment - extra > 0) {
        // if current month is NOT last for current card
        afterBalance += balance + curInterest - minimumPayment - extra;
      } else {
        // if current month is last for current card and we have overpayment, we send overpayment to extra param
        extraFromCard += -(balance + curInterest - minimumPayment - extra);
        // subtract annual fee from extraFromCardValue in case if it's annual fee payment month
        if (
          moment(feeDate).format('MMMM') === moment(currentDate).format('MMMM')
        ) {
          extraFromCard -= Number(annualFeeAmount);
        }
      }

      // if (name === 'Virgin Atlantic') {
      //   console.log(name, monthNum, afterBalance.toFixed(), curInterest);
      // }

      return {
        data: {
          name,
          interest: interest || '~20',
          minimumPayment,
          annualFeeAmount,
          annualFeeDate,
          annualFeeThisMonth: annualFeeThisMonthVal,
          extra: 0,
          curInterest: Number(curInterest),
          balance: Number(afterBalance.toFixed())
        },
        extraFromCard
      };
    }

    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return [];
  }
};

export default getCard;
