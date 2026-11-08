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
  const [loadingError, setLoadingError] = useState(null);

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
        } catch (err) {
          setLoadingError(err);
        }
      }
    };
    getSubscriptionsData();
  }, [appUser.currentUser]);

  return (
    <div className="mx-auto flex max-w-[1500px] flex-wrap gap-5 sm:flex-nowrap sm:px-6 lg:px-8">
      <div className="sticky top-16 z-30 w-full bg-surface/90 backdrop-blur sm:w-56 sm:shrink-0 sm:self-start">
        <SidebarNav />
      </div>
      <div className="videos-section min-h-[80vh] min-w-0 flex-1 flex-col !items-start !justify-start gap-8 px-3 pb-12 pt-8 sm:px-0">
        <div className="flex flex-col gap-2">
          {!loading && !loadingError && (
            <>
              <div className="text-sm font-semibold uppercase tracking-wide text-brand">Subscribed to</div>
              {subscribedToUsers?.map((user, index) => (
                <div
                  className="flex items-center justify-start gap-4 text-sm font-medium"
                  key={index}
                >
                  <img
                    src={`${user.profilePicture}`}
                    alt="profile pic"
                    className="h-10 w-10 rounded-full bg-surface-sunken object-cover shadow-card"
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
              <div className="text-sm font-semibold uppercase tracking-wide text-brand">Subscribers</div>{" "}
              {subscribers?.map((subscriber, index) => (
                <div
                  className="flex items-center justify-start gap-4 text-sm font-medium"
                  key={index}
                >
                  <img
                    src={`${subscriber.profilePicture}`}
                    alt="profile pic"
                    className="h-10 w-10 rounded-full bg-surface-sunken object-cover shadow-card"
                  />
                  <div>{subscriber?.username}</div>
                </div>
              ))}
            </>
          )}
        </div>
        {loading && !loadingError && <LoadingSpinner />}
        {loadingError && (
          <div className="text-red-900 font-medium !self-center">
            There was an error loading your subscriptions details
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
