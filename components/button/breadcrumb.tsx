interface Props {
    list?: {
        url?: string;
        title: string;
    }[];
    displayBack: boolean;
    className?: string;
}

export function DefaultBreadcrumb({ list, displayBack, className }: Props) {
    return (
        <>
            <div className={`flex flex-row mb-5 ${className}`}>
                {displayBack && (
                    <a
                        className="px-2 py-1 text-gray-500 mx-1 text-sm transition-all duration-200 rounded-lg
                        hover:text-gray-950 hover:bg-gray-300 mr-4 cursor-pointer select-none"
                        onClick={() => window.history.go(-1)}>
                        {"<"} Back
                    </a>
                )}
                {list &&
                    list.map(({ url, title }, index) => (
                        <div key={index}>
                            {url ? (
                                <a
                                    href={url}
                                    className="px-1.5 py-1 text-gray-500 mx-1 transition-all duration-200 rounded-lg
                        text-sm hover:text-gray-950 hover:bg-gray-300 cursor-pointer select-none">
                                    {title}
                                </a>
                            ) : (
                                <span
                                    className="px-1.5 py-1 text-gray-500 mx-1 transition-all duration-200 rounded-lg
                    text-sm select-none">
                                    {title}
                                </span>
                            )}
                            {index !== list.length - 1 && <span className="text-gray-500 text-sm py-1">/</span>}
                        </div>
                    ))}
            </div>
        </>
    );
}

export function SlateBgBreadcrumb({ list, displayBack, className }: Props) {
    return (
        <>
            <div className={`flex flex-row mb-5 ${className}`}>
                {displayBack && (
                    <a
                        className="px-2 py-1 text-gray-500 mx-1 text-sm transition-all duration-200 rounded-lg
                        hover:text-gray-950 hover:bg-gray-400 mr-4 cursor-pointer select-none"
                        onClick={() => window.history.go(-1)}>
                        {"<"} Back
                    </a>
                )}
                {list &&
                    list.map(({ url, title }, index) => (
                        <div key={index}>
                            {url ? (
                                <a
                                    href={url}
                                    className="px-1.5 py-1 text-gray-500 mx-1 transition-all duration-200 rounded-lg
                        text-sm hover:text-gray-950 hover:bg-gray-400 cursor-pointer select-none">
                                    {title}
                                </a>
                            ) : (
                                <span
                                    className="px-1.5 py-1 text-gray-500 mx-1 transition-all duration-200 rounded-lg
                    text-sm select-none">
                                    {title}
                                </span>
                            )}
                            {index !== list.length - 1 && <span className="text-gray-500 text-sm py-1">/</span>}
                        </div>
                    ))}
            </div>
        </>
    );
}