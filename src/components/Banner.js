import "./Banner.css";
import MenuIcon from '@mui/icons-material/Menu';
import WineBarIcon from '@mui/icons-material/WineBar';

const Banner = ({userName, onClick}) => {
  return (
    <div className="banner-container">
      <div className="banner-items">
        <div>{userName}'s Wine List</div>
        {/* <button onClick={onClick}>click</button> */}
        {/* <WineBarIcon />/ */}
        <MenuIcon />
      </div>
    </div>
  )
}

export default Banner