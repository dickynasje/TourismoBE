// Function to calculate the day difference
function calculateDayDifference(requestedDate) {
    const currentDate = new Date(); // Current date
    
    // Convert both dates to UTC to ensure accurate calculation
    const utcCurrentDate = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    
    const utcRequestedDate = Date.UTC(
      requestedDate.getFullYear(),
      requestedDate.getMonth(),
      requestedDate.getDate()
    );
    
    // Calculate the day difference in milliseconds
    const dayDifferenceInMs = utcRequestedDate - utcCurrentDate;
    
    // Convert the day difference from milliseconds to days
    const dayDifference = Math.floor(dayDifferenceInMs / (1000 * 60 * 60 * 24));
    
    return dayDifference;
  }

module.exports = calculateDayDifference;