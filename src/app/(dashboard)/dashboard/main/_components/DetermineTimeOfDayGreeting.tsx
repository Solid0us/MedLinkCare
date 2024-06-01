"use client";
export const dynamic = "auto";

interface DetermineTimeOfDayGreetingProps {
  name: string | undefined;
}
const DetermineTimeOfDayGreeting = ({
  name,
}: DetermineTimeOfDayGreetingProps) => {
  const determineGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return "Good morning ";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon ";
    } else {
      return "Good evening ";
    }
  };
  return (
    <>
      {determineGreeting()} {name}
    </>
  );
};

export default DetermineTimeOfDayGreeting;
