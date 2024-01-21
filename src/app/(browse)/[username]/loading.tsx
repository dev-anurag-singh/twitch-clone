import { StreamPlayerSkeleton } from "@/components/stream-player/stream-player";

const UserLoading = () => {
  return ( 
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};
 
export default UserLoading;