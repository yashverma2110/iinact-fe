import React from "react";
import Card from "../Atomic/Card";
import CountdownLoading from "./CountdownLoading";
import BoxLoading from "./TextLoading";

const ScheduleCardLoading = () => {
  return (
    <Card>
      <BoxLoading height="h-6" width="w-1/3" />
      <BoxLoading margin="my-2" height="h-4" width="w-1/2" />
      <div className="flex my-4">
        <BoxLoading height="h-6" width="w-1/3" />
        <BoxLoading margin="ml-2" height="h-6" width="w-2/3" />
      </div>

      <div className="flex justify-center">
        <CountdownLoading size={100} />
      </div>

      <div className="grid grid-cols-2 mt-4">
        <BoxLoading height="h-10" width="w-full" />
        <BoxLoading margin="ml-2" height="h-10" width="w-full" />
      </div>
    </Card>
  );
};

export default ScheduleCardLoading;
