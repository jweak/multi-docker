import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
    const [index, setIndex] = useState("");

    const [state, setState] = useState({
        seenIndexes: [],
        values: {}
    });

    useEffect(() => {
        if (index === "") {
            const fetchValues = async () => {
                const response = await axios.get("/api/values/current");
                const values  = response.data;
                console.log(values, "values")

                if (values) {
                    setState((state) => ({
                        ...state,
                        values
                    }))
                }
            }

            const fetchIndexes = async () => {
                const response = await axios.get("/api/values/all");
                setState((state) => ({
                    ...state,
                    seenIndexes: response.data
                }))
            }
            fetchValues();
            fetchIndexes();
        }
    }, [index]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post("/api/values", {
            index: index
        });

        setIndex("");
    }

    return (
        <div>
            <h1>Jep</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    />
                <button>Submit</button>
            </form>
            <h3>Indexes I've seen</h3>
            <div>
                {state.seenIndexes.map(({ number }) => number).join(", ")}
            </div>
            <h3>Calculated values:</h3>
            <div>
                {Object.keys(state.values).map((key, i) => (
                    <div key={i}>
                        For index {key} I calculated {state.values[key]}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Fib;