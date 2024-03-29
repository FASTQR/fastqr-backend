const {
  fetchUserTransactions,
  fetchSingleTransaction,
  generateTransaction,
  sendPayment,
} = require("../utils/transaction.Util");

const getAllUserTransactions = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const transactions = await fetchUserTransactions(userId);

    return res.status(200).json({
      msg: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTransaction = async (req, res, next) => {
  const { userId, transactionId } = req.params;
  try {
    const transaction = await fetchSingleTransaction(transactionId);

    return res.status(200).json({
      msg: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// generate payment request
const generatePaymentRequest = async (req, res, next) => {
  const { userId } = req.params;
  const { amount, narration } = req.body;
  try {
    const transaction = await generateTransaction(userId, amount, narration);

    return res.status(200).json({
      msg: "Payment request generated successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const processPayment = async (req, res, next) => {
  const { userId } = req.params;
  const { base64String } = req.body;
  try {
    const transaction = await sendPayment(userId, base64String);

    return res.status(200).json({
      msg: "Payment request generated successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUserTransactions,
  getSingleTransaction,
  generatePaymentRequest,
  processPayment,
};
