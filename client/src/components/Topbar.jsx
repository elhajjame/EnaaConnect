import {
  Bell,
  CalendarCheck,
  CalendarX,
  Heart,
  Megaphone,
  MessageCircle,
  UsersRound,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import getInitials from "../utils/getInitials";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { getNotifications } from "../services/notificationsService";
import { getApiErrorMessage } from "../services/api";
import { getStoredToken } from "../services/authStorage";
import SearchBox from "./SearchBox";

const notificationStyles = {
  post_like: { Icon: Heart, iconClass: "bg-brand-green text-white" },
  post_comment: {
    Icon: MessageCircle,
    iconClass: "bg-amber-100 text-amber-700",
  },
  event_comment: {
    Icon: MessageCircle,
    iconClass: "bg-amber-100 text-amber-700",
  },
  event_join: {
    Icon: CalendarCheck,
    iconClass: "bg-[#d9e8f2] text-brand-navy",
  },
  event_approved: {
    Icon: CalendarCheck,
    iconClass: "bg-[#d9e8f2] text-brand-navy",
  },
  event_rejected: { Icon: CalendarX, iconClass: "bg-amber-100 text-amber-700" },
  club_join: { Icon: UsersRound, iconClass: "bg-[#d9eedc] text-brand-green" },
  new_message: {
    Icon: MessageCircle,
    iconClass: "bg-[#d9e8f2] text-brand-navy",
  },
  club_announcement: {
    Icon: Megaphone,
    iconClass: "bg-amber-100 text-amber-700",
  },
};

const pageHeadings = {
  "/": {
    title: "Campus feed",
    subtitle: "A quick look at what is happening today.",
  },
  "/events": {
    title: "Events",
    subtitle: "Learn beyond the classroom.",
  },
  "/profile": {
    title: "My profile",
    subtitle: "Your profile and campus activity.",
  },
  "/profile/:userId": {
    title: "Student profile",
    subtitle: "View this student's profile and activity.",
  },
  "/admin": {
    title: "Admin preview",
    subtitle: "Review event requests, reports, users, and clubs.",
  },
};

function Topbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const currentPage = pathname.startsWith("/profile/")
    ? pageHeadings["/profile/:userId"]
    : pageHeadings[pathname] || pageHeadings["/"];

  const [isNotificationsOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [notificationError, setNotificationError] = useState("");
  useEffect(() => {
    let isCurrent = true;

    async function loadNotifications() {
      if (!user?.id) {
        setIsLoadingNotifications(false);
        return;
      }
      try {
        const result = await getNotifications();
        if (isCurrent) {
          setNotifications(result.notifications);
          setUnreadCount(result.unreadCount);
        }
      } catch (error) {
        if (isCurrent) {
          setNotificationError(getApiErrorMessage(error));
        }
      } finally {
        if (isCurrent) {
          setIsLoadingNotifications(false);
        }
      }
    }

    loadNotifications();

    return () => {
      isCurrent = false;
    };
  }, [user?.id]);

  useEffect(() => {
    const token = getStoredToken();

    if (!user?.id || !token) {
      return;
    }

    socket.auth = { token };

    function handleNewNotification(incomingNotification) {
      const notification = {
        ...incomingNotification,
        id: incomingNotification.id || incomingNotification._id,
      };

      setNotifications((currentNotifications) => [
        notification,
        ...currentNotifications.filter(
          (current) => current.id !== notification.id,
        ),
      ]);

      if (!notification.isRead) {
        setUnreadCount((currentCount) => currentCount + 1);
      }
    }

    socket.on("newNotification", handleNewNotification);
    socket.connect();

    return () => {
      socket.off("newNotification", handleNewNotification);
      socket.disconnect();
    };
  }, [user?.id]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 xl:px-9">
        <div className="hidden min-w-0 lg:block">
          <h1 className="truncate font-display text-xl font-bold tracking-tight text-brand-navy-dark">
            {currentPage.title}
          </h1>

          <p className="truncate text-xs text-muted">
            {currentPage.subtitle}
          </p>
        </div>

        <SearchBox />

        <div className="relative ml-auto">
          <button
            onClick={() => setIsNotificationOpen((open) => !open)}
            type="button"
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand-navy hover:border-green-200 hover:bg-[#eef8ef]"
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
            aria-controls="notification-panel"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2f873e]"
                aria-label={`${unreadCount} unread notifications`}
              />
            )}
          </button>

          <div
            id="notification-panel"
            className={`absolute right-[-3.5rem] top-14 z-50 max-h-[calc(100dvh-10rem)] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card sm:right-0 ${
              isNotificationsOpen ? "" : "hidden"
            }`}
            aria-label="Notifications preview"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-display text-base font-bold text-brand-navy-dark">
                  Notifications
                </h2>
                <p className="text-xs text-slate-400">
                  {unreadCount} new {unreadCount === 1 ? "update" : "updates"}
                </p>
              </div>
              <span className="text-xs font-bold text-brand-green">
                Mark all read
              </span>
            </div>
            <div className="max-h-[calc(100dvh-15rem)] overflow-y-auto divide-y divide-slate-100 overscroll-contain">
              {isLoadingNotifications && (
                <p
                  role="status"
                  className="px-5 py-8 text-center text-sm text-slate-500"
                >
                  Loading notifications...
                </p>
              )}

              {!isLoadingNotifications && notificationError && (
                <p
                  role="alert"
                  className="px-5 py-8 text-center text-sm text-red-700"
                >
                  {notificationError}
                </p>
              )}

              {!isLoadingNotifications &&
                !notificationError &&
                notifications.length === 0 && (
                  <p className="px-5 py-8 text-center text-sm text-slate-500">
                    You have no notifications yet.
                  </p>
                )}

              {!isLoadingNotifications &&
                !notificationError &&
                notifications.map((notification) => {
                  const style = notificationStyles[notification.type] || {
                    Icon: Bell,
                    iconClass: "bg-[#d9e8f2] text-brand-navy",
                  };
                  const NotificationIcon = style.Icon;

                  return (
                    <div
                      key={notification.id}
                      className={`flex gap-3 px-5 py-4 ${
                        notification.isRead ? "" : "bg-[#eef8ef]/70"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${style.iconClass}`}
                      >
                        <NotificationIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </span>

                      <p className="text-sm leading-5 text-slate-600">
                        {notification.message}
                        <span className="mt-1 block text-xs text-slate-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <Link
          to="/profile"
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-lime to-brand-green text-sm font-bold text-brand-navy-dark shadow-sm"
          aria-label="Open my profile"
        >
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.fullName}'s profile`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-lime to-brand-green text-sm font-bold text-brand-navy-dark shadow-sm"
            />
          ) : (
            getInitials(user?.fullName)
          )}
        </Link>
      </div>
    </header>
  );
}

export default Topbar;
