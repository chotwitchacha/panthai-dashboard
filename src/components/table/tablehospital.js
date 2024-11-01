import { ArrowDropUpRounded} from '@mui/icons-material';
import React, { useState } from 'react';
import SortData from '../sortData';

const column = [
    '#', 'ชื่อโรงพยาบาล', 'จำนวนผู้ป่วย (คน)', 'จำนวนการเข้ารับบริการ (ราย)'
];

const TableHospital = ({ data }) => {
    const { items, requestSort, sortConfig } = SortData(data);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const currentRows = items.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(items.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <table className={`w-full border rounded-lg overflow-hidden mt-2 ${sortConfig?.direction === 'ascending' ? 'table-auto' : ''}`}>
                <thead>
                    <tr className="bg-gray-200 xl:text-[16px] lg:text-[15px] md:text-[15px] sm:text-[14px] text-[10px] text-center h-10">
                        {column.map((value, index) => {
                            const key = index === 0 ? 'index' : index === 1 ? 'name' : index === 2 ? 'patient' : 'service';
                            return (
                                <th key={index} className='p-2 border-b cursor-pointer' onClick={() => requestSort(key)}>
                                    <div className='flex justify-center'>
                                        <p>{value}</p>
                                        <ArrowDropUpRounded className={`ml-1 ${sortConfig?.direction === 'ascending' ? 'transform rotate-180' : ''}`} />
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={index} className="xl:text-[16px] lg:text-[15px] md:text-[15px] sm:text-[14px] text-[10px] h-11">
                            <td className='text-center p-2 border-b'>{row.index}</td>
                            <td className='p-2 border-b'>{row.name}</td>
                            <td className='text-center p-2 border-b'>{new Intl.NumberFormat().format(row.patient)}</td>
                            <td className='text-center p-2 border-b'>{new Intl.NumberFormat().format(row.service)}</td>
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

export default TableHospital;
