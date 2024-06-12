import { Progress } from "antd";
import axios from "axios";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
    const context = usePageContext();
    console.log(context.urlParsed.search);
    const { code } = context.urlParsed.search;
    return (
        <>
            <div>
                <Progress />
                <h1>Login</h1>
            </div>
        </>
    );
}

export const getData = async (code: string) => {
    axios.post("/api/auth/oauth/github", { code: code }).then((res) => {
        console.log(res);
    });
};
