import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/auth/actions.auth";

const Layout = ({ children }: any) => {
  const dispatch = useDispatch();
  const { user, getUserError } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // fetches user details from token
  useEffect(() => {
    const token = localStorage.getItem("xt@k#n");

    if (!token) {
      router.push("/login");
    }

    if (!user && token) {
      dispatch(getUser({ token }));
    }
  }, [user, dispatch, router]);

  // redirects to login if token is invalid or the get user API fails
  useEffect(() => {
    if (getUserError && !user) {
      router.push("/login");
    }
  }, [getUserError, router, user]);

  const getInfoForTab = (tab: string) => {
    switch (tab) {
      case "/dashboard":
        return "View active and upcoming reminders. Change, cancel or postpone events";
      case "/lists":
        return "Create, edit, share or delete your playlists";
      default:
        return "";
    }
  };

  return (
    <div>
      <main className="h-screen">
        <div className="backGradient h-1/3 flex flex-col justify-between shadow-lg md:h-1/4">
          <div className="px-4 pt-4">
            <div>
              <div className="text-white italic font-bold text-2xl md:text-3xl">
                iinact
              </div>
              <div className="mt-1 text-xs text-white">
                An engaging progress tracking platform
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="text-lg my-2 text-slate-300">
              <span>Welcome!</span>{" "}
              <span className="italic font-bold tracking-tight">
                {user?.firstName} {user?.lastName}
              </span>
            </div>

            <div className="text-slate-300 text-sm font-semibold h-10">
              {getInfoForTab(router.pathname)}
            </div>
          </div>

          <div className="grid grid-cols-4">
            <button
              className={`${
                router.pathname === "/dashboard"
                  ? "text-slate-200 font-bold shadow-inner-lg"
                  : "text-slate-300"
              }  border-slate-400 p-2 text-xs md:text-sm`}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`${
                router.pathname === "/lists"
                  ? "text-slate-200 font-bold shadow-inner-lg"
                  : "text-slate-300"
              }  border-slate-400 p-2 text-xs md:text-sm`}
              onClick={() => router.push("/lists")}
            >
              Lists
            </button>
            <button
              className={`${
                router.pathname === "/summary"
                  ? "text-slate-200 font-bold shadow-inner-lg"
                  : "text-slate-300"
              }  border-slate-400 p-2 text-xs md:text-sm`}
              onClick={() => router.push("/summary")}
            >
              Summary
            </button>
            <button
              className={`${
                router.pathname === "/contributions"
                  ? "text-slate-200 font-bold shadow-inner-lg"
                  : "text-slate-300"
              } border-slate-400 p-2 text-xs md:text-sm`}
              onClick={() => router.push("/contributions")}
            >
              Contributions
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-100 h-2/3 overflow-y-auto md:h-3/4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
