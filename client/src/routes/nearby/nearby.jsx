import React from 'react'
import List from '../../components/list/List'
import { useLocation } from 'react-router-dom';

const Nearby = () => {
    const location = useLocation();
  const nearbyPosts = location.state?.nearbyPosts;
  console.log(nearbyPosts)
    if (!nearbyPosts || !Array.isArray(nearbyPosts)) {
        return <p>No nearby places data available.</p>;
      }
    
      // Check the length of the array
      if (nearbyPosts.length === 0) {
        return <p>No nearby places found.</p>;
      }
    
      return (
        <div>
          <List posts={nearbyPosts} />
        </div>
      );
}

export default Nearby;