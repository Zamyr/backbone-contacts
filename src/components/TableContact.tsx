import styles from "../../styles/Main.module.css";
import { useState, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ContactType } from "../types";
import Link from "next/link";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { updateContact } from "../redux/contacts/actions";
import { TextField, FormGroup, IconButton, Button } from "@mui/material";

interface PropTypes {
  contacts: [];
}

export default function TableContact() {
  const [contacts, setContacts] = useState<PropTypes>([]);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchPhone, setSearchPhone] = useState<string>("");
  const dispatch = useDispatch();

  const handleContact = (row: ContactType) => {
    if (row.id) dispatch(updateContact(row));
  };

  const hadleSearch = useCallback(async () => {
    const res = await fetch(
      `https://bkbnchallenge.herokuapp.com/contacts?phone_contains=${searchPhone}`
    );
    const response = await res.json();
    setContacts(response);
    setSearchPhone('')
  }, [searchPhone]);

  const handlePagination = useCallback(async () => {
    const res = await fetch(
      `https://bkbnchallenge.herokuapp.com/contacts?perPage=${perPage}&page=${
        page > 0 ? page : 1
      }&_sort=createdAt:DESC`
    );
    const response = await res.json();
    setContacts(response);
  }, [perPage, page]);

  useEffect(() => {
    handlePagination();
  }, [perPage, page, handlePagination]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhone(event.target.value);
  };

  return (
    <>
      <div className={styles.searchBox}>
        <TextField
          className={styles.searchInput}
          id="outlined"
          label="Search by Phone Number"
          onChange={handleChange}
          value={searchPhone}
        />
        <IconButton
          aria-label="delete"
          size="large"
          className={styles.searchButton}
          onClick={hadleSearch}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="contacts table"
          className={styles.contactsTable}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {contacts.results && (
            <TableBody>
              {contacts.results.map((row: ContactType) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right" className={styles.linkTable}>
                    <Link
                      href={`/contacts/${row.id}/edit`}
                      onClick={() => handleContact(row)}
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/contacts/${row.id}/delete`}
                      onClick={() => handleContact(row)}
                    >
                      Delete
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )} 
          {!contacts?.results && <caption>We don't have contacts yet</caption>}
        </Table>
        {contacts.results && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={contacts.count}
            rowsPerPage={perPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </>
  );
}
