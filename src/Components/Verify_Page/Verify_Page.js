import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import instance from "../../Constants/axiosConstants";
import { toast } from "react-toastify";

function VerifyPage(props) {

    const search = useLocation().search;
    const verificationToken = new URLSearchParams(search).get('token')
    const Role = new URLSearchParams(search).get('role');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        instance.get(`api/${Role}/auths/verify/${verificationToken}`)
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            props.history.push(`/login:${Role}`);
            setLoading(false);
            toast.error(err);
        })
    }, [])

    return (
        loading && <Spinner />
    )
}

export default VerifyPage