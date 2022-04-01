import { makeStyles } from '@material-ui/core';

const borderLight = 'rgba(206,212,218, .993)';
const useStyles = makeStyles((theme) => ({
    inputs: {
        position: 'relative',
        fontFamily: 'Segoe UI',
        fontSize: '17px',
        padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
        paddingLeft: '1rem',
        borderRadius: '8px',
        border: '1.4px solid',
        borderColor: borderLight,
        width: '100%',
        marginTop: '-5px'
    },
    passwordEye: {
        color: 'rgba(131,153,167,0.9)',
        opacity: 0.9,
        marginTop: '1rem',
        cursor: 'pointer'
    },
    root: {
        '& .MuiSvgIcon-root': {
            fontSize: '2.5rem'
        }
    },
    input: {
        '& .MuiFilledInput-input': {
            padding: '37px 0px 10px',
            fontSize: '14px',
            background: 'none'
        },
        '& .MuiFilledInput-root': {
            background: 'none'
        },
        '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
            transform: 'translate(0px, 10px)',
            fontSize: '14px'
        },
        marginTop: '20px'
    }
}));

export { useStyles };
