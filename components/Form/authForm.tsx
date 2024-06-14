import { ChangeEvent } from "react";

interface prop {
    title?: string;
    description?: string;
    type?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Item(props: prop) {
    const { title, description, type = "text", value, onChange } = props;
    return (
        <div className="my-4 w-9/12">
            {title && <span>{title}：</span>}
            <input
                required
                value={value}
                onChange={onChange}
                type={type}
                placeholder={description}
                className="p-3 border border-solid border-gray-400 bg-gray-50 active:bg-white hover:bg-white transition-all duration-300 px-5 w-full rounded-lg focus-visible:outline-none"
            />
        </div>
    );
}

export default { Item } as const;
