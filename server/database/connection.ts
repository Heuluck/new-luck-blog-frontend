/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldPacket, QueryError, QueryResult } from "mysql2";
import pool from "./database";
import { SQLError } from "@server/common/Errors";

export default async function dbQuery(
    query: string,
    params: any[],
    onSuccess: (results: QueryResult, fields: FieldPacket[]) => void,
    onError: (err: QueryError | NodeJS.ErrnoException) => void
) {
    pool.getConnection((err, con) => {
        if (err) {
            console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
            onError(err);
            con.release();
            return;
        }
        con.query(query, params, function (err, results, fields) {
            if (err) {
                console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
                onError(err);
                return;
            }
            onSuccess(results, fields);
            con.release();
        });
    });
}

export function dQuery(query: string, params: any[]): Promise<{ results: QueryResult; fields: FieldPacket[] }> {
    return new Promise((resolve, rejects) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
                rejects(new SQLError(err.message));
                con.release();
                return;
            }
            con.query(query, params, function (err, results, fields) {
                if (err) {
                    console.log("\x1B[31m%s\x1B[0m", "[SQL ERROR]", err.message);
                    rejects(new SQLError(err.message));
                    return;
                }
                resolve({ results, fields });
                con.release();
            });
        });
    });
}

export interface InsertResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
    changedRows: number;
}
