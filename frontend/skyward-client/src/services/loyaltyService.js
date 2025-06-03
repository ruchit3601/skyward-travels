let points = 0;

export const addPoints = (amount) => {
  points += amount;
  triggerNotification(`You earned ${amount} loyalty points!`);
};

export const getPoints = () => points;
