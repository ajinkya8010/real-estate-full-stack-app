import { Link } from "react-router-dom";
import "./card.scss";
import { useContext ,useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
function Card({ item }) {
  const { currentUser } = useContext(AuthContext);
  const [ownerMobile, setOwnerMobile] = useState("");

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const res = await apiRequest.get(`/users/${item.userId}`);
        const data = await res.data;
        setOwnerMobile(data.mobile_number);
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };

    fetchOwnerDetails();
  }, [item.userId]);

  const handleClick = async() =>{
    try {
      const response = await apiRequest.delete(`/posts/${item.id}`);
      if (response.status === 200) {
        console.log("Post and related records deleted successfully");
        window.location.reload(); 
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  } 

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link className="title-in" to={`/${item.id}`}>{item.title}</Link>
          <div className="icons">
          {currentUser && item.userId === currentUser.id && (
              <div className="icon">
                <img onClick={handleClick} src="/delete.png" alt="" />
              </div>
            )}
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
          </div>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">Rs {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
           {/* <span>Contact: {ownerMobile}</span>  */}
           {currentUser ? (
              <span>Contact: {ownerMobile}</span> 
            ) : (
              <span>Contact: Login to contact</span> 
            )} 
        </div>
      </div>
    </div>
  );
}

export default Card;
