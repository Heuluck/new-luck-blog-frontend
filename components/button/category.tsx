export function CategoryButton({name, url_title}:{name:string,url_title:string}) {
    return (
        <a
            href={`/categories/${url_title}`}
            className="rounded-md p-2 px-3 text-sm mr-2 transition duration-300 ease select-none hover:bg-gray-200
            focus:outline-none focus:shadow-outline border-orange-400 border border-solid text-orange-600">
            #{name}
        </a>
    );
}

export function CategoryPageButton({name, url_title}:{name:string,url_title:string}) {
    return (
        <a
            href={`/categories/${url_title}`}
            className="rounded-md p-2 px-3 text-sm m-1 transition duration-300 ease select-none hover:bg-gray-200
            focus:outline-none focus:shadow-outline text-orange-600">
            #{name}
        </a>
    );
}