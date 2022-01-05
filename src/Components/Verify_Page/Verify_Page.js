import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import instance from "../../Constants/axiosConstants";
import { toast } from "react-toastify";

function VerifyPage(props) {

    const search = useLocation().search;
    const verificationToken = new URLSearchParams(search).get('token')
    let Role = new URLSearchParams(search).get('role');
    Role = Role.toLowerCase();
    console.log(Role);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        instance.get(`api/${Role}/auths/verify/${verificationToken}`)
        .then(res => {
            setLoading(false);
            props.history.push(`/login/:${Role}`);
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