import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding:'16px',
        backgroundColor: "#292437",
    },
    pagination: {
        borderRadius: 6,
        marginTop: '1rem',
        padding: '5px',
        backgroundColor: 'white',
    },
    text: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginBottom: '10px',
      },
    color: {
        backgroundColor: "white",
    },
    gridContainer: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
        },
    
    },
}));