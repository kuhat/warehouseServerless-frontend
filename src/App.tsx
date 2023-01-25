import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, MY_BU_ID, TOKEN} from "./globals";
import {Grade, IUniversityClass} from "./types/api_types";
import {GradeTable} from "./components/GradeTable";

function App() {
    // You will need to use more of these!
    const [currClassId, setCurrClassId] = useState<string>("");
    const [curClassName, setCurClassName] = useState<string>("");
    const [classList, setClassList] = useState<IUniversityClass[]>([]);
    const [students, setStudents] = useState<string[]>([]);
    const [grades, setGrades] = useState<Grade[]>([])

    /**
     * This is JUST an example of how you might fetch some data(with a different API).
     * As you might notice, this does not show up in your console right now.
     * This is because the function isn't called by anything!
     *
     * You will need to lookup how to fetch data from an API using React.js
     * Something you might want to look at is the useEffect hook.
     *
     * The useEffect hook will be useful for populating the data in the dropdown box.
     * You will want to make sure that the effect is only called once at component mount.
     *
     * You will also need to explore the use of async/await.
     *
     */
    const fetchSomeData = async () => {
        const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
            method: "GET",
        });
        const json = await res.json();
        console.log(json);
    };

    const fetchClasses = async () => {
        const res = await fetch(BASE_API_URL + "/class/listBySemester/fall2022/?buid=" + MY_BU_ID, {
            method: "GET",
            headers: {
                'x-functions-key': TOKEN
            }
        });
        return await res.json()
    }

    const fetchStudents = async (classID: String) => {
        console.log("fetching class: " + classID)
        console.log("current class Name: " + curClassName)

        const res = await fetch(BASE_API_URL + "/class/listStudents/" + classID + "?buid=" + MY_BU_ID, {
            method: "GET",
            headers: {
                'x-functions-key': TOKEN
            }
        })
        return await res.json()
    }

    const fetchGrade = async (studentId: string | undefined) => {
        console.log("fetching students of class: " + currClassId)
        const res = await fetch(BASE_API_URL + "/student/listGrades/" + studentId + "/" + currClassId + "/"
            + "?buid=" + MY_BU_ID, {
            method: "GET",
            headers: {
                'x-functions-key': TOKEN
            }
        })
        return await res.json()
    }

    useEffect(() => {
        fetchClasses().then(r => setClassList(r))
    }, [])

    useEffect(() => {
        console.log("enrolled students: ", students)
        // setGrades([])
        console.log("init grades: ", grades)
        if (students.length !== 0) {
            while (students.length !== 0) {
                const studentId = students.pop()
                fetchGrade(studentId).then(r => {
                    grades.push(r)
                    // console.log(grades)
                    setGrades(grades)
                })
            }
        }
    }, [students])

    useEffect(() => {
        fetchStudents(currClassId).then(r => setStudents(r))
    }, [currClassId])

    const handleSelectChange = (event: SelectChangeEvent) => {
        console.log("Selected course: ", event.target)
        const classId = event.target.value  // get selected class ID
        const cName = getClassName(classId)
        console.log("Selected cName: " + cName)
        if (grades.length > 100) setGrades([])
        setCurClassName(cName)
        setCurrClassId(classId)  // set the current class ID
        // fetchStudents(classId).then(r => setStudents(r))  // fetch students id and set students ID
    }

    const getClassName = (classId: string) => {
        let cname: string = ""
        classList.map((item) => {
            if (item.classId == classId) {
                cname = item.title
            }
        })
        return cname
    }

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <Grid container spacing={2} style={{padding: "1rem"}}>
                <Grid xs={12} container alignItems="center" justifyContent="center">
                    <Typography variant="h2" gutterBottom>
                        Spark Assessment
                    </Typography>
                </Grid>
                <Grid xs={12} md={4}>
                    <Typography variant="h4" gutterBottom>
                        Select a class
                    </Typography>
                    <div style={{width: "100%"}}>
                        <Select
                            fullWidth={true}
                            label="Class"
                            onChange={handleSelectChange}
                        >
                            {/* You'll need to place some code here to generate the list of items in the selection */}
                            {classList.map((ele) => {
                                return (
                                    <MenuItem
                                        value={ele.classId}
                                    >
                                        {ele.title}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </Grid>
                <Grid xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        Final Grades
                    </Typography>
                    <div>
                        <GradeTable
                            grades={grades}
                            className={curClassName}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
