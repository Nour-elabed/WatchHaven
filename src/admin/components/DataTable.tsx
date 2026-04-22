import type { ReactNode } from "react";

type Column<T> = {
    key: string;
    header: string;
    render: (row: T) => ReactNode;
};

interface DataTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    emptyText: string;
}

const DataTable = <T,>({ columns, rows, emptyText }: DataTableProps<T>) => {
    if (!rows.length) {
        return <p className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">{emptyText}</p>;
    }

    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="px-4 py-3 text-left font-semibold text-gray-700">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.key} className="px-4 py-3 align-top">
                                    {column.render(row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export type { Column };
export default DataTable;
