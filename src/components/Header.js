import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom';

const Header = ({title, onAdd, showAdd}) => {
    const onClick = () =>{
        console.log("Click");
    }
    const location = useLocation();
    return(
        <header className='header'>
          <h1>{title}</h1>
          {location.pathname === '/' && (<Button text={showAdd ? 'Close':'Add'} onClick={onAdd} color={showAdd ? 'red' : 'green'}/>)}
        </header> 
    )
}


Header.defaultProps = {
    title:'This this'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headerStyle = {
    color:'red',
    backgroundColor:'black'
}
export default Header