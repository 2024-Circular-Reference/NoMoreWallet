import { useRouter } from '@src/stores/useRouter';
import { Pathname } from '@src/types/router';

export default function Link({
    pathname,
    children,
    className,
}: {
    pathname: Pathname;
    children: React.ReactNode;
    className?: string;
}) {
    const { setPathname } = useRouter();
    return (
        <button onClick={() => setPathname(pathname)} className={className}>
            {children}
        </button>
    );
}
