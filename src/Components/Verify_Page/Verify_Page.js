import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import instance from "../../Constants/axiosConstants";
import { toast } from "react-toastify";
import cookie from "react-cookies";

function VerifyPage(props) {

    const localRole = localStorage.getItem('role');
    const search = useLocation().search;
    const verificationToken = new URLSearchParams(search).get('token')
    let role = new URLSearchParams(search).get('role');
    console.log(role);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        instance.get(`api/${role}/auths/verify/${verificationToken}`)
            .then(res => {
                console.log(res);
                if (role !== localRole) {
                    localStorage.clear();
                    cookie.remove("Authorization");
                    localStorage.setItem("role", role);
                }
                if (window.confirm("Congrats you are verified!") == true) {
                    props.history.push(`login/${role}`);
                }
            })
            .catch(err => {
                props.history.push('/page-not-found');
                setLoading(false);
                toast.error(err);
            })
    }, [])

    return (
        loading && <Spinner />
    )
}

export default VerifyPage