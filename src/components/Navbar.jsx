"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import logo from "@/assets/keypify_app_logo.png";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, User } from "lucide-react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar({ isAuthenticated, userAvatar }) {
  const theme = useTheme();
  const { data: session } = useSession();
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] =
    React.useState(false);
  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src={logo} alt="mind-me logo" width={40} height={40} />
            <span className="text-xl font-bold">pass-pro</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />

            {!isAuthenticated && (
              <>
                <Button
                  className="border border-purple-700 text-purple-700 bg-white hover:text-white 
          hover:bg-purple-700 shadow-lg hover:shadow-xl font-semibold px-6 py-3 
          rounded-md transition duration-300 mx-2"
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  className="bg-purple-700 text-white hover:bg-purple-600 shadow-lg 
          hover:shadow-xl font-semibold px-6 py-3 rounded-md transition 
          duration-300 mx-2"
                  herf="/signup"
                >
                  Signup
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button onClick={() => setShowAddEditNoteDialog(true)}>
                  <Plus size={20} className="mr-2" />
                  Add Note
                </Button>
                <DropdownMenu className="">
                  <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50  rounded-full">
                    <Avatar>
                      {userAvatar ? <AvatarImage src={userAvatar} /> : null}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 font-semibold"
                      onClick={() => signOut()}
                    >
                      <LogOut /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
