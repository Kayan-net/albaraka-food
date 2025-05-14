export function isRestaurantOpen() {
  const now = new Date();
  const currentHour = now.getHours();
  return currentHour >= 7 && currentHour < 22; // 7AM to 10PM
}
 
export function getOpeningStatus() {
  return isRestaurantOpen() 
    ? 'Open - Closes at 10:00 PM' 
    : 'Closed - Opens at 7:00 AM';
} 