import { useState } from "react";
import { useUpdateProfileMutation } from "../../features/profile/profileApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import './editName.css';

const EditName = ({name, setOpenEdit}) => {
    const [editText, setEditText] = useState(name);
    const [ updateProfile ] = useUpdateProfileMutation();
    const handleSaveEdit = () => {
        try {
            updateProfile({name: editText});
            setOpenEdit(false);
        } catch (e) {
            console.log('error', e);
        }
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <input type="text" className="edit-name-input" value={editText} onChange={(e) => setEditText(e.target.value)}/>
            <button onClick={handleSaveEdit} style={{background:'none', border:"none"}} ><FontAwesomeIcon icon={faPencil} /></button>
        </div>
    )
};

export default EditName;