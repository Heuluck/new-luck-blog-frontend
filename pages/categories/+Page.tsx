import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { CategoryPageButton } from "@components/button/category";
import { SlateBgBreadcrumb } from "@components/button/breadcrumb";

export default function Page() {
    const items = useData<Data>();
    return (
        <div className="flex flex-col w-full">
            <SlateBgBreadcrumb
                list={[
                    { url: "/", title: "首页" },
                    { title: "标签" }
                ]}
                displayBack
            />
            <h1 className="block w-full text-center text-3xl font-bold">全部标签</h1>
            <div className="w-full">
                <div className="flex p-8 bg-white flex-row flex-wrap rounded-lg my-5 group w-full group border-dashed border border-gray-500">
                    {items.map(({ id, name, url_title, description }) => (
                        <CategoryPageButton key={id} name={name} url_title={url_title} />
                    ))}
                </div>
            </div>
        </div>
    );
}
