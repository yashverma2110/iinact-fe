import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Atomic/Card";
import Layout from "../components/Atomic/layouts";
import LinkItem from "../components/Atomic/LinkItem";
import { getUserSchedules } from "../redux/schedule/actions.schedule";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { daysInAWeek } from "../config/constants";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Button from "../components/Atomic/Button";
import ScheduleCardLoading from "../components/Loading/ScheduleCardLoading";

dayjs.extend(duration);
dayjs.extend(duration);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { loading, schedules } = useSelector((state: any) => state.schedules);

  useEffect(() => {
    dispatch(getUserSchedules());
  }, [dispatch]);

  const getDurationToNextReminder = (schedule: Schedule) => {
    const remindOnDays = schedule.days;
    let dayToFind = dayjs().day() - 1;
    while (true) {
      const nearestDay = daysInAWeek[dayToFind];

      if (remindOnDays.includes(nearestDay)) {
        break;
      }

      dayToFind = (dayToFind + 1) % 7;
    }

    const [hours, minutes] = schedule.remindAt.split(":");

    const minutesToRemindAt = parseInt(hours) * 60 + parseInt(minutes);

    const dateToRemind = dayjs()
      .add(Math.abs(dayToFind + 1 - dayjs().day()), "days")
      .startOf("day")
      .add(minutesToRemindAt, "minutes");

    const diff = dateToRemind.diff(dayjs());

    return dayjs.duration(diff).asSeconds();
  };

  const formatTimerDuration = (remainingTime: number) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      <Head>
        <title>Dashboard - iinact</title>
        <meta
          name="description"
          content="Track, setup and watch upcoming reminders"
        />
      </Head>

      <Layout>
        {loading ? (
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((item, index) => (
              <ScheduleCardLoading key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule: Schedule) => {
              return (
                <Card key={schedule._id}>
                  <div className="font-semibold text-base md:text-lg">
                    {schedule.list.name}
                  </div>
                  <div className="text-slate-500 text-xs md:text-sm">
                    {schedule.list.description}
                  </div>

                  <div className="flex items-center my-2">
                    <div className="text-sm mr-2">Scheduled: </div>
                    <LinkItem classes="my-0" link={schedule.current} />
                  </div>

                  <div className="flex justify-center py-2">
                    <CountdownCircleTimer
                      isPlaying
                      colors="#F77171"
                      duration={getDurationToNextReminder(schedule)}
                      size={110}
                    >
                      {({ remainingTime }) => (
                        <div className="text-xs text-red-400 font-semibold">
                          {formatTimerDuration(remainingTime)}
                        </div>
                      )}
                    </CountdownCircleTimer>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      title="Attempt"
                      onClick={() => console.log("alll")}
                    />
                    <Button
                      title="Postpone"
                      onClick={() => console.log("alll")}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Dashboard;
