import {CircularProgress} from "@heroui/react";

export default function CircularLoading() {
  return (
    <div className="flex justify-center w-full gap-4">
      <CircularProgress aria-label="Loading..." size="lg" />
    </div>
  );
}
