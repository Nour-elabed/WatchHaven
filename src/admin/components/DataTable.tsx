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
        return <p className="rounded-lg border border-dashed dark:border-gray-700 p-6 text-center text-sm text-gray-500 dark:text-gray-400">{emptyText}</p>;
    }

    return (
        <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-card">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                            {columns.map((column) => (
                                <td key={column.key} className="px-4 py-3 align-top text-gray-900 dark:text-gray-100">
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
