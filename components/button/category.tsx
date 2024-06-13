export function CategoryButton({name, url_title}:{name:string,url_title:string}) {
    return (
        <a
            href={`/categories/${url_title}`}
            className="text-gray-800 rounded-md p-2 px-3 text-sm m-1 transition duration-300 ease select-none hover:bg-gray-300
            focus:outline-none focus:shadow-outline border-slate-400 border border-solid">
            {name}
        </a>
    );
}
