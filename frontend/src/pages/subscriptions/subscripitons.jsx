import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SidebarNav from "../../Components/sidebarNav/sidebarNav";
import { getUser } from "../../services/userService";
import { countFormatter } from "../../utils/countFormatter";
import LoadingSpinner from "../../Components/loadingSpinner/spinner";

const Subscriptions = () => {
  const appUser = useSelector((state) => state.appUser);
  const [subscribedToUsers, setSubscribedToUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getSubscriptionsData = async () => {
      if (appUser?.currentUser?.id) {
        try {
          const userData = await getUser(appUser?.currentUser?.id);

          const subscribedTo = await Promise.all(
            userData?.subscribedToUsers?.map(
              async (userId) => await getUser(userId)
            )
          );

          const subscribers =
            userData?.subscribers &&
            (await Promise.all(
              userData?.subscribers?.map((subscriberId) =>
                getUser(subscriberId).then((res) => res)
              )
            ));

          setSubscribedToUsers(subscribedTo);
          setSubscribers(subscribers);
          setLoading(false);
          console.log(subscribedTo, subscribers);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getSubscriptionsData();
  }, [appUser.currentUser]);

  return (
    <div className="flex gap-[20px] flex-wrap sm:flex-nowrap">
      <div className="sticky top-16 left-0 z-50 sm:h-[80vh]">
        <SidebarNav />
      </div>
      <div className="videos-section pl-5 min-h-[92vh] flex flex-col gap-8 pt-6 w-[100%]">
        <div className="flex flex-col gap-2">
          {!loading && (
            <>
              <div className="font-medium">Subscribed to</div>
              {subscribedToUsers?.map((user, index) => (
                <div
                  className="flex items-center gap-5 justify-start font"
                  key={index}
                >
                  <img
                    src={`${user.profilePicture}`}
                    alt="profile pic"
                    className="h-[3.2rem] w-[3.2rem] rounded-full shadow-lg"
                  />
                  <div>{user?.username}</div>
                  <div>
                    {countFormatter(user?.subscribers?.length)} subscribers
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {!loading && (
            <>
              <div className="font-medium">Subscribers</div>{" "}
              {subscribers?.map((subscriber, index) => (
                <div
                  className="flex items-center gap-5 justify-start"
                  key={index}
                >
                  <img
                    src={`${subscriber.profilePicture}`}
                    alt="profile pic"
                    className="h-[3.2rem] w-[3.2rem] rounded-full shadow-lg"
                  />
                  <div>{subscriber?.username}</div>
                </div>
              ))}
            </>
          )}
        </div>
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Subscriptions;
