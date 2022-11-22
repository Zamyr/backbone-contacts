import {useState, useEffect} from "react";
import styles from "../styles/Main.module.css";
import { Container } from "@mui/material";
import TableContact from "../src/components/TableContact";
import { useRouter } from "next/router";
import {clearContact} from '../src/redux/contacts/actions'
import { useDispatch } from "react-redux";
import Alert from '@mui/material/Alert';

interface MsgType {
  msg: {[key: string]: any}
}

export default function Home() {
  
  const router = useRouter()
  const dispatch = useDispatch()
  const [closeAlert, setCloseAlert] = useState<boolean>(!!router.query?.msg)

  useEffect(() => {
    dispatch(clearContact())
  }, [dispatch])
  
  return (
    <div className={styles.content}>
      <Container>
        <h1>Contacts</h1>
        {closeAlert && <Alert severity="error" onClose={() => setCloseAlert(false)}>{router.query?.msg}</Alert>}
        <TableContact />
      </Container>
    </div>
  );
}