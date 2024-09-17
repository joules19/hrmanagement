import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
  return (
    <main>
      <div className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 ">
          {/* Replace with your content */}
          <Outlet />

          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}
