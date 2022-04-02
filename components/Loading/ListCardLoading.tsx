import React from "react";
import Card from "../Atomic/Card";
import BoxLoading from "./TextLoading";

const ListCardLoading = () => {
  return (
    <Card>
      <div className="flex items-center">
        <BoxLoading height="h-5" width="w-1/3" />
        <BoxLoading height="h-5" width="w-12" margin="ml-auto" />
      </div>
      <BoxLoading height="h-4" width="w-3/4" margin="mt-2" />
      <BoxLoading height="h-4" width="w-2/4" margin="mt-2" />
      <div className="shadow-inner mt-2 p-2">
        <BoxLoading height="h-4" width="w-full" margin="mt-4" />
        <BoxLoading height="h-4" width="w-full" margin="mt-4" />
        <BoxLoading height="h-4" width="w-full" margin="mt-4" />
        <BoxLoading height="h-4" width="w-full" margin="mt-4" />
        <BoxLoading height="h-4" width="w-full" margin="mt-4" />
      </div>
    </Card>
  );
};

export default ListCardLoading;
