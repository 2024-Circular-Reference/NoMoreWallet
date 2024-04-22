import { Pathname } from '@root/src/types/router';
import Link from './Link';
import { useRouter } from '@root/src/stores/useRouter';
import { cls } from '@root/utils/util';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-black text-white text-base rounded-t-xl">
            <ul className="flex w-full items-center justify-around h-32">
                <LiLink pathname="/">Init</LiLink>
                <LiLink pathname="/login-wallet">Login</LiLink>
                <LiLink pathname="/create-wallet">Create</LiLink>
                <LiLink pathname="/import-wallet">Import</LiLink>
                <LiLink pathname="/home">Home</LiLink>
            </ul>
        </footer>
    );
}

function LiLink({
    pathname,
    children,
}: {
    pathname: Pathname;
    children: React.ReactNode;
}) {
    const { pathname: currentPathname } = useRouter();

    return (
        <li>
            <Link
                pathname={pathname}
                className={cls(
                    'mx-auto w-full',
                    currentPathname === pathname ? 'font-bold' : ''
                )}
            >
                {children}
            </Link>
        </li>
    );
}
