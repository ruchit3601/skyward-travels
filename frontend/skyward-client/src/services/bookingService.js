import { triggerNotification } from './notificationService';
import { addPoints } from './loyaltyService';

export const bookTrip = async () => {
  await new Promise(res => setTimeout(res, 1000)); // mock delay
  triggerNotification("Booking confirmed");
  addPoints(100); // award points
  return { success: true, message: "Booking successful!" };
};
