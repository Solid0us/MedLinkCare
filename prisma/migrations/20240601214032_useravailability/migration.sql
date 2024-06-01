-- CreateTable
CREATE TABLE "UserAvailabilityTimes" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "startTimeId" INTEGER NOT NULL,
    "endTimeId" INTEGER NOT NULL,
    "dayOfWeekUtc" INTEGER NOT NULL,

    CONSTRAINT "UserAvailabilityTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOfWeek" (
    "dayOfWeek" SMALLINT NOT NULL,

    CONSTRAINT "DayOfWeek_pkey" PRIMARY KEY ("dayOfWeek")
);

-- CreateTable
CREATE TABLE "TimeSlots" (
    "id" SERIAL NOT NULL,
    "timeUTC" TIME NOT NULL,

    CONSTRAINT "TimeSlots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlots_timeUTC_key" ON "TimeSlots"("timeUTC");

-- AddForeignKey
ALTER TABLE "UserAvailabilityTimes" ADD CONSTRAINT "UserAvailabilityTimes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAvailabilityTimes" ADD CONSTRAINT "UserAvailabilityTimes_startTimeId_fkey" FOREIGN KEY ("startTimeId") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAvailabilityTimes" ADD CONSTRAINT "UserAvailabilityTimes_endTimeId_fkey" FOREIGN KEY ("endTimeId") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAvailabilityTimes" ADD CONSTRAINT "UserAvailabilityTimes_dayOfWeekUtc_fkey" FOREIGN KEY ("dayOfWeekUtc") REFERENCES "DayOfWeek"("dayOfWeek") ON DELETE RESTRICT ON UPDATE CASCADE;
