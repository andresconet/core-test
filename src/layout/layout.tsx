import { ReactNode } from "react";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
    <div className="h-full mx-auto">
        <header className="w-full bg-black shadow-md">
            <div className="mx-auto px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800">CORE</h1>
            </div>
        </header>

        <div className="p-5">
            {children}
        </div>

    </div>
);

export default DefaultLayout;
