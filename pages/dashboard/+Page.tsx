import { Button } from "@components/button/button";
import { Space } from "antd";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
    const pageContext = usePageContext();
    return (
        <>
            <div>
                <p>Hi~ 别来无恙呀，{pageContext.user?.name}!</p>
                <div className="gap-6 flex">
                    {/* antd的gap：2 4 6 */}
                    <Button
                        size="medium"
                        color="primary"
                        onClick={() => {
                            alert("你好!");
                        }}>
                        你好!
                    </Button>
                    {/* 其他问候语，用不同方式呈现按钮 */}
                    <Button
                        size="medium"
                        color="secondary"
                        onClick={() => {
                            alert("你好!");
                        }}>
                        你好!
                    </Button>
                    <Button
                        size="medium"
                        color="common"
                        onClick={() => {
                            alert("你好!");
                        }}>
                        你好!
                    </Button>
                    <Button
                        size="medium"
                        color="danger"
                        onClick={() => {
                            alert("你好!");
                        }}>
                        你好!
                    </Button>
                </div>
            </div>
        </>
    );
}
