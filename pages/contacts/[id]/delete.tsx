import styles from "../../../styles/Main.module.css";
import stylesContact from "../../../styles/CreateForm.module.css";
import { useState, useEffect } from "react";
import { Container, Button, FormControl } from "@mui/material";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { ContactStateType } from "../../../src/types";
import {useRouter} from 'next/router'
import {clearContact} from '../../../src/redux/contacts/actions'

export default function Delete() {
  const [messageError, setMessageError] = useState<string>("");
  const contacts = useSelector((state: ContactStateType) => state.contacts);
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if(Object.values(contacts).length == 0) {
      router.push('/')
    }
  }, [contacts, router])

  const onDelete = async () => {
    setMessageError("");
    await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${contacts.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          setMessageError(json.message);
          return;
        }
        dispatch(clearContact())
        const msg:string = `${contacts.firstName} ${contacts.lastName} was deleted`
        router.push({
          pathname: '/',
          query: { msg },
        })
      })
      .catch((err) =>
        setMessageError("We have a problem, please try again later")
      );
  };

  return Object.values(contacts).length > 0 && (
    <div className={styles.content}>
      <Container>
        <h1>Delete</h1>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box className={stylesContact.createBoxContact}>
            <p className={stylesContact.title}>Delete contact</p>
            {messageError && (
              <div className={stylesContact.messageBox}>
                <span className={stylesContact.msg}>{messageError}</span>
              </div>
            )}
            <FormControl fullWidth className={stylesContact.inputBox}>
              <FormLabel>First Name</FormLabel>
              <Input value={contacts.firstName} disabled />
            </FormControl>
            <FormControl fullWidth className={stylesContact.inputBox}>
              <FormLabel>Last Name</FormLabel>
              <Input value={contacts.lastName} disabled />
            </FormControl>
            <FormControl fullWidth className={stylesContact.inputBox}>
              <FormLabel>Phone Number</FormLabel>
              <Input value={contacts.phone} disabled />
            </FormControl>
            <FormControl fullWidth className={stylesContact.inputBox}>
              <FormLabel>Email</FormLabel>
              <Input value={contacts.email} disabled />
            </FormControl>
            <div className={stylesContact.buttonBox}>
              <Button
                onClick={() => onDelete()}
                className={stylesContact.button}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
