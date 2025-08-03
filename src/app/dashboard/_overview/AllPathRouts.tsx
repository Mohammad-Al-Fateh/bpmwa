"use client";
import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  Users,
  Mail,
  LogOut,
  ClipboardPlus,
  Album,
  UserPlus,
  ReceiptText,
  CopyPlus,
  FileSpreadsheet,
  GitBranch,
  FilePlus2,
  ChartBarBig,
  Anvil,
  ChevronRight,
} from "lucide-react";

interface RouteCard {
  name: string;
  icon: React.ReactNode;
  href: string;
  description?: string;
}

const routeCards: RouteCard[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
    description: "Overview of your dashboard",
  },
  {
    name: "Home",
    icon: <Home size={20} />,
    href: "/",
    description: "Return to the home page",
  },
  // Create Information
  {
    name: "Create Contact Data",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/additional",
    description: "Add new contact information",
  },
  {
    name: "Create Branch",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/branch-center",
    description: "Add new branch center",
  },
  {
    name: "Create Class",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/class",
    description: "Add new class",
  },
  {
    name: "Create Exam",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/exam",
    description: "Add new exam",
  },
  {
    name: "Create Group",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/group",
    description: "Add new group",
  },
  {
    name: "Create Institution",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/institution",
    description: "Add new institution",
  },
  {
    name: "Create Suggestion",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/suggestion",
    description: "Add new suggestion",
  },
  {
    name: "Manage Center",
    icon: <ClipboardPlus size={20} />,
    href: "/dashboard/create/menage-center",
    description: "Manage center information",
  },
  // Created Information
  {
    name: "View Contact Data",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/additional",
    description: "View all contact information",
  },
  {
    name: "View Branches",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/branch-center",
    description: "View all branch centers",
  },
  {
    name: "View Classes",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/class",
    description: "View all classes",
  },
  {
    name: "View Exams",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/exam",
    description: "View all exams",
  },
  {
    name: "View Groups",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/group",
    description: "View all groups",
  },
  {
    name: "View Institutions",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/institution",
    description: "View all institutions",
  },
  {
    name: "View Suggestions",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/suggestion",
    description: "View all suggestions",
  },
  {
    name: "View Manage Centers",
    icon: <Album size={20} />,
    href: "/dashboard/created-data/menage-center",
    description: "View all manage centers",
  },
  // User Management
  {
    name: "Add Member",
    icon: <UserPlus size={20} />,
    href: "/dashboard/create-user/menagement",
    description: "Add new management member",
  },
  {
    name: "Add Student",
    icon: <UserPlus size={20} />,
    href: "/dashboard/create-user/student",
    description: "Add new student",
  },
  {
    name: "View Members",
    icon: <Users size={20} />,
    href: "/dashboard/user/menagement",
    description: "View all management members",
  },
  {
    name: "View Students",
    icon: <Users size={20} />,
    href: "/dashboard/user/student",
    description: "View all students",
  },
  {
    name: "View All Users",
    icon: <Users size={20} />,
    href: "/dashboard/user/user",
    description: "View all system users",
  },
  // Results
  {
    name: "View Results",
    icon: <ReceiptText size={20} />,
    href: "/dashboard/result/added",
    description: "View all examination results",
  },
  {
    name: "Add Results",
    icon: <CopyPlus size={20} />,
    href: "/dashboard/result/add",
    description: "Add new examination results",
  },
  // Institution Student
  {
    name: "Add Student",
    icon: <FilePlus2 size={20} />,
    href: "/dashboard/institution/add_student",
    description: "Add student to institution",
  },
  {
    name: "Make Examinee",
    icon: <GitBranch size={20} />,
    href: "/dashboard/institution/make_examinee",
    description: "Convert student to examinee",
  },
  {
    name: "View All Students",
    icon: <FileSpreadsheet size={20} />,
    href: "/dashboard/institution/all_student",
    description: "View all institution students",
  },
  // Rewarded Student
  {
    name: "View Rewarded Students",
    icon: <Anvil size={20} />,
    href: "/dashboard/rewarded/all",
    description: "View all rewarded students",
  },
  // Other
  {
    name: "Messages",
    icon: <Mail size={20} />,
    href: "/dashboard/messages",
    description: "View and send messages",
  },
  {
    name: "Student Count",
    icon: <ChartBarBig size={20} />,
    href: "/dashboard/count-tudent",
    description: "View student statistics",
  },
  {
    name: "Logout",
    icon: <LogOut size={20} />,
    href: "/logout",
    description: "Logout from the system",
  },
];

export default function AllPathRouts() {
  return (
    <div className="px-3 mb-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {routeCards.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            className="group transition-all duration-200 hover:-translate-y-1"
          >
            <div className="h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-emerald-100 overflow-hidden">
              <div className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  {route.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {route.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {route.description}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 group-hover:text-emerald-500 mt-1 transition-colors"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
