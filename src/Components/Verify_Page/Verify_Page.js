import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import instance from "../../Constants/axiosConstants";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import CustomModal from "../CustomModal/CustomModal";

function VerifyPage(props) {

    const localRole = localStorage.getItem('role');
    const search = useLocation().search;
    const verificationToken = new URLSearchParams(search).get('token')
    let role = new URLSearchParams(search).get('role');


    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        instance.get(`api/${role}/auths/verify/${verificationToken}`)
            .then(res => {
                if (role !== localRole) {
                    localStorage.clear();
                    cookie.remove("Authorization");
                    localStorage.setItem("role", role);
                }
                if (window.confirm("Congrats you are verified!") === true) {
                    setShowModal(true);
                }
            })
            .catch(err => {
                setShowModal(true);
                props.history.push('/page-not-found');
                setLoading(false);
                toast.error(err);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
         <>{loading &&<Spinner />}
         {showModal && <CustomModal showModal = {showModal} message="Congrats you are verified!" action = {()=>props.history.push(`login/${role}`)} buttonText = "Ok"/>}
         </>
    )
}

export default VerifyPage