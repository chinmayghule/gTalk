import UserAvatar from "@/components/UserAvatar";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import LogoutBtn from "./LogoutBtn";
import ProfileBodyLoading from "./ProfileBodyLoading";

function ProfileBody() {
  const { loading, userInfo, error } = useGetUserInfo();

  if (loading)
    return (
      // <div className="text-center text-lg font-medium p-4">Loading...</div>
      <ProfileBodyLoading />
    );

  if (error)
    return (
      <div className="text-left text-destructive bg-destructive-foreground p-4 rounded-md font-medium">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col gap-8 items-center mt-4 lg:mt-0 overflow-y-scroll no-scrollbar">
      <UserAvatar
        {...{
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          profileImageUrl: userInfo?.profileImageUrl,
        }}
        classes="w-36 h-36 border-none shadow-none"
      />
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p className="text-base font-medium">{userInfo?.email}</p>
        </div>
        <p className="text-sm font-normal">ID: {userInfo?._id}</p>
      </div>
      <LogoutBtn />
    </div>
  );
}

export default ProfileBody;
