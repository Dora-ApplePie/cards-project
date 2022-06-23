import react from 'React';
import SuperInputText from "./c1-SuperInputText/SuperInputText";
import SuperButton from "./c2-SuperButton/SuperButton";
import SuperEditableSpan from "./c4-SuperEditableSpan/SuperEditableSpan";
import SuperCheckbox from "./c3-SuperCheckbox/SuperCheckbox";
import SuperRadio from "./c6-SuperRadio/SuperRadio";
import SuperSelect from "./c5-SuperSelect/SuperSelect";
import SuperRange from "./c7-SuperRange/SuperRange";
import SuperDoubleRange from "./c8-SuperDoubleRange/SuperDoubleRange";

const SuperComponents = () => {
    return (
        <>
            <SuperInputText/>
            <SuperButton/>
            <SuperEditableSpan/>
            <SuperCheckbox/>
            <SuperRadio/>
            <SuperSelect/>
            {/*<SuperRange/>*/}
            {/*<SuperDoubleRange/>*/}
        </>
    )
}

export default SuperComponents