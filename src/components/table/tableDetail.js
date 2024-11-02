import React, { useState } from 'react';

const column = [
    'เดือน', 'จำนวนการเข้ารับบริการ', 'จำนวนผู้ป่วย', 'จำนวนแพทย์ผู้ใช้งาน'
]

const TableDetail = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;
    console.log("data", data)
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data && data.length > 0 ? data.slice(indexOfFirstRow, indexOfLastRow) : []
    const totalPages = data ? Math.ceil(data.length / rowsPerPage) : 1

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 overflow-y-auto">
            <table className="w-full border rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 xl:text-[16px] lg:text-[15px] md:text-[15px] sm:text-[14px] text-[10px] text-center h-10">
                        {column.map((value, index) => (
                            <th key={index} className="p-2 border-b"> {value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={index} className="xl:text-[16px] lg:text-[15px] md:text-[15px] sm:text-[14px] text-[10px] h-11">
                            <td className="text-start p-2 border-b">{row.name}</td>
                            <td className="text-center p-2 border-b">{new Intl.NumberFormat().format(row.จำนวนการเข้ารับบริการ)}</td>
                            <td className="text-center p-2 border-b">{new Intl.NumberFormat().format(row.จำนวนผู้ป่วย)}</td>
                            <td className="text-center p-2 border-b">{new Intl.NumberFormat().format(row.จำนวนแพทย์ผู้ใช้งาน)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination mt-4 flex justify-end gap-2">
                <a
                    href="#!"
                    onClick={() => paginate(currentPage - 1)}
                    className={`py-1 px-2 rounded-lg bg-[#F1F7FF] text-[#333333] hover:bg-opacity-80 transition ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                >&laquo;</a>
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        href="#!"
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`py-1 px-2 rounded-lg ${currentPage === index + 1 ? 'bg-mainBg text-white font-bold text-sm' : 'bg-[#F1F7FF] text-[#333333] font-thin text-sm'} hover:bg-opacity-80 transition`}
                    >
                        {index + 1}
                    </a>
                ))}
                <a
                    href="#!"
                    onClick={() => paginate(currentPage + 1)}
                    className={`py-1 px-2 rounded-lg bg-[#F1F7FF] text-[#333333] font-thin hover:bg-opacity-80 transition ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                >&raquo;</a>
            </div>
        </div>
    );
}

export default TableDetail;

