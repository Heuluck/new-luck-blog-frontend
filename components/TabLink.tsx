import { usePageContext } from "vike-react/usePageContext";

export function TabLink({ href, children }: { href: string; children: string }) {
    const pageContext = usePageContext();
    const { urlPathname } = pageContext;
    let isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
    //当href是http开头的绝对链接时判断是否是当前页面，截取链接后判断
    if (href.startsWith("http://")) {
        const hrefPathname = href.split("://")[1].split("/")[1];
        isActive = urlPathname.split("/")[1] === hrefPathname;
    }
    if (!isActive)
        return (
            <a
                href={href}
                className="select-none hidden p-4 px-6 md:flex justify-center items-center text-base transition-all
                text-gray-600 hover:bg-main-100/75 active:bg-main-600/75 hover:text-gray-950 active:text-gray-100 font-bold">
                {children}
            </a>
        );
    else
        return (
            <span
                className="select-none hidden p-4 px-6 md:flex justify-center items-center text-base transition-all
                bg-main-500/75 text-white cursor-pointer active:bg-main-600/75 font-bold">
                {children}
            </span>
        );
}
