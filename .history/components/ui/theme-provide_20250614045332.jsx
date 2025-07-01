"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}