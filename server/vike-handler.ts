import { renderPage } from "vike/server";

export async function vikeHandler<Context extends Record<string | number | symbol, unknown>>(
    request: Request,
    context?: Context,
    rawRequest?: Record<string, unknown>
): Promise<Response> {
    const pageContextInit = {
        ...(context ?? {}),
        urlOriginal: request.url,
        /** @ts-expect-error 真的包含user我不骗你 */
        user: rawRequest.user,
    };
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;

    return new Response(response?.getReadableWebStream(), {
        status: response?.statusCode,
        headers: response?.headers,
    });
}
