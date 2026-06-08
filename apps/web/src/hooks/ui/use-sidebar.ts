"use client";

import { useState } from "react";

export function useSidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  return {
    collapsed,
    setCollapsed,
    open,
    setOpen,
  };
}