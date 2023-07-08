import React, { ComponentProps, PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
        <Navbar />
        {children}
        </>
    )
}