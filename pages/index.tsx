import {useState, useEffect} from "react";
import styles from "../styles/Main.module.css";
import { Container } from "@mui/material";
import TableContact from "../src/components/TableContact";
import { useRouter } from "next/router";
import {clearContact} from '../src/redux/contacts/actions'
import { useDispatch } from "react-redux";
import Alert from '@mui/material/Alert';

interface MsgType {
  msg: {}
}

export default function Home() {
  
  const router = useRouter()
  const dispatch = useDispatch()
  const [closeAlert, setCloseAlert] = useState<{}>(router.query)
  
  useEffect(() => {
    dispatch(clearContact())
  }, [dispatch])
  
  return (
    <div className={styles.content}>
      <Container>
        <h1>Contacts</h1>
        {!!closeAlert?.msg && <Alert severity="error" onClose={() => setCloseAlert({})}>{closeAlert?.msg}</Alert>}
        <TableContact />
      </Container>
    </div>
  );
}