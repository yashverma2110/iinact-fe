import React from "react";
import Card from "../Card";
import TextLoading from "./TextLoading";

const ListCardLoading = () => {
  return (
    <Card>
      <div className="flex items-center">
        <TextLoading height="h-5" width="w-1/3" />
        <TextLoading height="h-5" width="w-12" margin="ml-auto" />
      </div>
      <TextLoading height="h-4" width="w-3/4" margin="mt-2" />
      <TextLoading height="h-4" width="w-2/4" margin="mt-2" />
      <div className="shadow-inner mt-2 p-2">
        <TextLoading height="h-4" width="w-full" margin="mt-4" />
        <TextLoading height="h-4" width="w-full" margin="mt-4" />
        <TextLoading height="h-4" width="w-full" margin="mt-4" />
        <TextLoading height="h-4" width="w-full" margin="mt-4" />
        <TextLoading height="h-4" width="w-full" margin="mt-4" />
      </div>
    </Card>
  );
};

export default ListCardLoading;
