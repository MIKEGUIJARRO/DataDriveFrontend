import { useState } from "react"


export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setValues((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }

    const updateBulkValues = (bulkValues) => {
        setValues(bulkValues);
    }

    return { values, handleInputChange, reset, updateBulkValues }
}
