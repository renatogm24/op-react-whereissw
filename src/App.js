import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Game from "./pages/Game";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_NnUaALtIib_zl7BJ3g5APEFtYAM1WVw",
  authDomain: "whereissw-ec3bf.firebaseapp.com",
  projectId: "whereissw-ec3bf",
  storageBucket: "whereissw-ec3bf.appspot.com",
  messagingSenderId: "738289517997",
  appId: "1:738289517997:web:79e93e99cdc9339f97cd24",
  measurementId: "G-Z7XPPLE393",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Where'S Wookiee 2",
      details:
        "The exciting sequel to the bestselling Star Wars book of the past 10 years, Where’s the Wookiee. Chewbacca is back and on the loose across the galaxy, and this time he’s brought some Wookiee friends. Find the hairy hero and a host of favourite characters in another search and...",
      category: "Star Wars",
      id: 1,
    },
  ]);

  const [toggleDark, settoggleDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [time, setTime] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [records, setRecords] = useState([]);

  const myTheme = createTheme({
    // Theme settings
    palette: {
      type: toggleDark ? "dark" : "light",
      primary: green,
      secondary: green,
    },
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  async function saveData() {
    //console.log(task);
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(getFirestore(), "scores"), {
        playerName,
        time,
      });
      console.log("Added!");
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  async function loadRecords() {
    const newRecordArray = [];

    const q = query(
      collection(db, "scores"),
      orderBy("time", "asc"),
      limit(10)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      newRecordArray.push(doc.data());
    });

    setRecords(newRecordArray);
    //console.log(tasks);
  }

  useEffect(() => {
    loadRecords();
  }, [records]);

  return (
    <ThemeProvider theme={myTheme}>
      <Router>
        <Layout
          toggleDark={toggleDark}
          settoggleDark={settoggleDark}
          open={open}
          setOpen={setOpen}
          timerIsRunning={timerIsRunning}
          setTimerIsRunning={setTimerIsRunning}
          saveData={saveData}
          setTime={setTime}
        >
          <Switch>
            <Route exact path="/op-react-whereissw">
              <Notes notes={notes} setNotes={setNotes} />
            </Route>
            <Route exact path="/op-react-whereissw/records">
              <Create records={records} />
            </Route>
            <Route exact path="/op-react-whereissw/:gameId">
              <Game
                open={open}
                setTimerIsRunning={setTimerIsRunning}
                saveData={saveData}
                playerName={playerName}
                setPlayerName={setPlayerName}
                time={time}
              />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
