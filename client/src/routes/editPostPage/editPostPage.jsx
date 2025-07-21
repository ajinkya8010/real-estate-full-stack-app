import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import "../newPostPage/newPostPage.scss";
import localforage from "localforage";
import { checkOnlineStatus } from "../../lib/checkInternet";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest.get(`/posts/${id}`);
        const post = res.data;

        setFormData({
          title: post.title,
          price: post.price,
          address: post.address,
          city: post.city,
          bedroom: post.bedroom,
          bathroom: post.bathroom,
          type: post.type,
          property: post.property,
          latitude: post.latitude,
          longitude: post.longitude,
          utilities: post.postDetail.utilities,
          pet: post.postDetail.pet,
          income: post.postDetail.income,
          size: post.postDetail.size,
          school: post.postDetail.school,
          bus: post.postDetail.bus,
          restaurant: post.postDetail.restaurant,
        });

        setValue(post.postDetail.desc);
        setImages(post.images || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteImage = (indexToDelete) => {
    setImages(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      postData: {
        title: formData.title,
        price: parseInt(formData.price),
        address: formData.address,
        city: formData.city,
        bedroom: parseInt(formData.bedroom),
        bathroom: parseInt(formData.bathroom),
        type: formData.type,
        property: formData.property,
        latitude: formData.latitude,
        longitude: formData.longitude,
        images: images,
      },
      postDetail: {
        desc: value,
        utilities: formData.utilities,
        pet: formData.pet,
        income: formData.income,
        size: parseInt(formData.size),
        school: parseInt(formData.school),
        bus: parseInt(formData.bus),
        restaurant: parseInt(formData.restaurant),
      },
    };

    try {
      const isOnline = await checkOnlineStatus();
      if (!isOnline) {
        console.log("📴 You are offline — queuing the update...");
        // User is offline — save to localForage
        let queued = (await localforage.getItem("queuedUpdates")) || [];
        queued.push({ id, ...payload });
        await localforage.setItem("queuedUpdates", queued);
        alert("🚫 You're offline! Your post update will be saved automatically when you're back online.");
      } else {
        // Online — send update to server
        await apiRequest.put(`/posts/${id}`, payload);
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  if (loading) return <div className="newPostPage"><p>Loading...</p></div>;
  if (!formData) return <div className="newPostPage"><p>Post not found</p></div>;

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Edit Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input 
                id="title" 
                name="title" 
                type="text" 
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input 
                id="price" 
                name="price" 
                type="number" 
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input 
                id="address" 
                name="address" 
                type="text" 
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input 
                id="city" 
                name="city" 
                type="text" 
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input 
                min={1} 
                id="bedroom" 
                name="bedroom" 
                type="number" 
                value={formData.bedroom}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input 
                min={1} 
                id="bathroom" 
                name="bathroom" 
                type="number" 
                value={formData.bathroom}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input 
                id="latitude" 
                name="latitude" 
                type="text" 
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input 
                id="longitude" 
                name="longitude" 
                type="text" 
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" value={formData.property} onChange={handleChange}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" value={formData.utilities} onChange={handleChange}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" value={formData.pet} onChange={handleChange}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                value={formData.income}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input 
                min={0} 
                id="size" 
                name="size" 
                type="number" 
                value={formData.size}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input 
                min={0} 
                id="school" 
                name="school" 
                type="number" 
                value={formData.school}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input 
                min={0} 
                id="bus" 
                name="bus" 
                type="number" 
                value={formData.bus}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input 
                min={0} 
                id="restaurant" 
                name="restaurant" 
                type="number" 
                value={formData.restaurant}
                onChange={handleChange}
              />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', width: '50%' }}>
            <img src={image} alt="" />
            <button 
              type="button"
              onClick={() => handleDeleteImage(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ×
            </button>
          </div>
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default EditPostPage;