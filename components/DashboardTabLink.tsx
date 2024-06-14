import { usePageContext } from "vike-react/usePageContext";

export function TabLink({ href, children, onClick }: { href?: string; children: string; onClick?: () => void }) {
    const pageContext = usePageContext();
    const { urlPathname } = pageContext;
    let isActive = href === "/" ? urlPathname === href : urlPathname === href;
    //当href是http开头的绝对链接时判断是否是当前页面，截取链接后判断
    if (href) {
        if (href.startsWith("http://")) {
            const hrefPathname = href.split("://")[1].split("/")[1];
            isActive = urlPathname.split("/")[1] === hrefPathname;
        }
    } else isActive = false;
    if (!isActive)
        return (
            <a
                onClick={onClick}
                href={href}
                className="select-none cursor-pointer p-4 px-6 md:flex justify-center items-center text-sm transition-all text-gray-400 hover:bg-gray-600 active:bg-gray-950">
                {children}
            </a>
        );
    else
        return (
            <span
                onClick={onClick}
                className="select-none p-4 px-6 md:flex justify-center items-center text-sm transition-all bg-sky-500 text-white cursor-pointer active:bg-sky-600">
                {children}
            </span>
        );
}
