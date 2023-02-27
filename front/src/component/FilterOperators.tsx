import {getGridDateOperators, getGridStringOperators} from "@mui/x-data-grid";


const filterOperators = getGridStringOperators()
    .filter(
        (operator) =>
            operator.value === "contain" || operator.value === "equal"
    )
    .map((operator) => {
        return {
            ...operator
        };
    });

export default filterOperators;