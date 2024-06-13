import { User } from "@server/routes/types/user";

declare global {
    namespace Vike {
        interface PageContext {
            // Type of pageContext.user
            user?: User;
            Page: () => JSX.Element;
        }
    }
}

export {};
