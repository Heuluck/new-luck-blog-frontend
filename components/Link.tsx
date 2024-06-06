import { usePageContext } from "vike-react/usePageContext";

export function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return (
    <a href={href} className={`hidden p-4 px-6 md:flex justify-center items-center text-sm ${isActive ? "bg-sky-500 text-white" : "text-gray-400"} `}>
      {children}
    </a>
  );
}
