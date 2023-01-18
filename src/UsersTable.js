import React, { useEffect, useState } from 'react';
import './UsersTable.css';

const SearchBar = ({ searchTable }) => {
    const [searchValue, setSearchValue] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        searchTable(searchValue);
    };

    return (
        <div className="search-bar">
            <form onSubmit={(e) => submitForm(e)}>
                <input type="text" placeholder="Search..." value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} />
            </form>
        </div>
    );
};

const HeaderCell = ({ column, sorting, sortTable }) => {
    const isDescSorting = sorting.column === column && sorting.order === 'desc';
    const isAscSorting = sorting.column === column && sorting.order === 'asc';
    const futureSortingOrder = isDescSorting ? 'asc' : 'desc';

    return (
        <th className="users-table-cell" key={column}
            style={{ cursor: 'pointer', background: 'ghostwhite' }}
            onClick={() => sortTable({ column, order: futureSortingOrder })}>
            {column}
            {isDescSorting && <span>&darr;</span>}
            {isAscSorting && <span>&uarr;</span>}
        </th>
    );
};

const Header = ({ columns, sorting, sortTable }) => {
    return (
        <thead>
            <tr>
                {columns.map((col) => {
                    return <HeaderCell column={col} sorting={sorting} key={col} sortTable={sortTable} />;
                })}
            </tr>
        </thead>
    );
};

const Content = ({ entries, columns }) => {
    return (
        <tbody>
            {entries.map((entry) => {
                return (
                    <tr key={entry.id}>
                        <td key={columns[0]} className="users-table-cell">{entry[columns[0]]}</td>
                        <td key={columns[1]} className="users-table-cell">{entry[columns[1]]}</td>
                        <td key={columns[2]} className="users-table-cell">
                            <img src={entry[columns[2]]} />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [sorting, setSorting] = useState({ column: 'id', order: 'asc' });
    const [searchValue, setSearchValue] = useState('');
    const columns = ['id', 'name', 'avatar'];

    const sortTable = (newSorting) => {
        setSorting(newSorting);
    };

    const getData = async () => {
        const api = await fetch(`
            http://localhost:7000/users?_sort=${sorting.column}&_order=${sorting.order}&name_like=${searchValue}
        `);

        const data = await api.json();
        setUsers(data);
    };

    const searchTable = (newSearchValue) => {
        setSearchValue(newSearchValue);
    };

    useEffect(() => {
        getData();
    }, [sorting, searchValue]);

    return (
        <>
            <SearchBar searchTable={searchTable} />
            <table className="UsersTable">
                <Header columns={columns} sorting={sorting} sortTable={sortTable} />
                <Content entries={users} columns={columns} />
            </table>
        </>
    )
}

export default UsersTable