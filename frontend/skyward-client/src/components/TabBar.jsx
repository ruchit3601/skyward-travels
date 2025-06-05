import { NavLink } from "react-router-dom";

const tabs = [
  { path: "/architecture", label: "Architecture" },
  { path: "/booking-flow", label: "Booking Flow" },
  { path: "/loyalty", label: "Loyalty" },
  { path: "/notifications", label: "Notifications" },
  { path: "/reporting", label: "Reporting" },
  { path: "/journey-map", label: "Journey Map" },
];

export default function TabBar() {
  return (
    <nav className="flex flex-wrap justify-center gap-3 text-sm sm:text-base">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full font-medium transition ${
              isActive
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
