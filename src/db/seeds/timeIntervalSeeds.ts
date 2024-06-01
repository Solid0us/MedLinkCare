import { prisma } from "../prisma";

const appendDates = () => {
  let dataEntries: { timeUTC: Date }[] = [];
  let timePrefix = "2024-06-01T";
  let hour = 0;
  for (let i = 0; i < 24; i++) {
    let minutes = 0;
    let stringifiedHour = hour < 10 ? `0${String(hour)}` : String(hour);
    for (let j = 0; j < 2; j++) {
      let stringifiedMinutes =
        minutes < 10 ? `0${String(minutes)}` : String(minutes);
      dataEntries.push({
        timeUTC: new Date(
          timePrefix + stringifiedHour + ":" + stringifiedMinutes + ":00Z"
        ),
      });
      minutes += 30;
    }
    hour += 1;
  }
  return dataEntries;
};
const seedTimeSlots = async () => {
  const data = appendDates();
  const intervals = await prisma.timeSlots.createMany({
    data,
    skipDuplicates: true,
  });
  console.log(`Intervals created: ${intervals.count}`);
};

export default seedTimeSlots;
