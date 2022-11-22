import styles from "../../../styles/Main.module.css";
import stylesContact from "../../../styles/CreateForm.module.css";
import { useState, useEffect } from "react";
import { Container, Button, FormControl, FormHelperText } from "@mui/material";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler } from "react-hook-form";
import Alerts from "../../../src/components/Alerts";
import { useDispatch, useSelector } from "react-redux";
import { ContactStateType } from "../../../src/types";
import {useRouter} from 'next/router'
import {updateContact} from '../../../src/redux/contacts/actions'

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

interface initialStateType {
  message: string;
  type: string;
  loaded: boolean;
}

const initialState = {
  message: "",
  type: "",
  loaded: false
}

export default function Edit() {
  const [messageError, setMessageError] = useState<initialStateType>(initialState);
  const contacts = useSelector((state: ContactStateType) => state.contacts);
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if(Object.values(contacts).length == 0) {
      router.push('/')
    }
  }, [contacts, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMessageError(initialState);
    await fetch(`https://bkbnchallenge.herokuapp.com/contacts/${contacts.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          setMessageError({
            message: json.message,
            type: 'warning',
            loaded: true
          });
          return;
        }
        setMessageError({
          message: "Contact was updated",
          type: 'success',
          loaded: true
        });
        dispatch(updateContact(json))
      })
      .catch((err) =>
        setMessageError({
          message: "We have a problem, please try again later",
          type: 'error',
          loaded: true
        })
      );
  };

  return Object.values(contacts).length > 0 && (
    <div className={styles.content}>
      <Container>
        <h1>Edit</h1>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {messageError.loaded && (
            <Box className={stylesContact.alertsBox}>
              <Alerts msg={messageError} />
            </Box>
          )}
          <Box className={stylesContact.createBoxContact}>
            <p className={stylesContact.title}>Edit Contact</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth className={stylesContact.inputBox}>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="First Name"
                  {...register("firstName", {
                    value: contacts.firstName,
                    required: "First Name is required",
                    minLength: { value: 6, message: "min 6 letters" },
                  })}
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <FormHelperText error={!!errors.firstName}>
                    {errors.firstName?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className={stylesContact.inputBox}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="Last Name"
                  {...register("lastName", {
                    value: contacts.lastName,
                    required: "Last Name is required",
                    minLength: { value: 6, message: "min 6 letters" },
                  })}
                  error={!!errors.lastName}
                />
                {errors.lastName && (
                  <FormHelperText error={!!errors.lastName}>
                    {errors.lastName?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className={stylesContact.inputBox}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Number Phone"
                  {...register("phone", {
                    value: contacts.phone,
                    required: "Phone Number is required",
                    minLength: { value: 10, message: "min 10 letters" },
                  })}
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <FormHelperText error={!!errors.phone}>
                    {errors.phone?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className={stylesContact.inputBox}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    value: contacts.email,
                    required: "Email Address is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Email Address is invalid",
                    },
                  })}
                  error={!!errors.email}
                />
                {errors.email && (
                  <FormHelperText error={!!errors.email}>
                    {errors.email?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <div className={stylesContact.buttonBox}>
                <Button
                  type="submit"
                  className={stylesContact.button}
                  variant="contained"
                >
                  Edit
                </Button>
              </div>
            </form>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
