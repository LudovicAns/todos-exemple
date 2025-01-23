import React from 'react';
import {Outlet} from "react-router";

function AuthLayout(props) {
    document.body.classList.add('bg-zinc-900');
    return (
        <main className={`flex items-center justify-center mt-8`}>
            <Outlet/>
        </main>
    );
}

export default AuthLayout;