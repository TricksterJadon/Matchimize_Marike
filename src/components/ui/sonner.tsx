"use client"

import type { ToasterProps } from "sonner"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      theme="light"
      richColors
      closeButton
      duration={3500}
      position="top-center"
      {...props}
    />
  )
}