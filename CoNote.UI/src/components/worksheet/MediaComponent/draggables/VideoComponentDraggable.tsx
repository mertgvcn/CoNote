import React from "react";

const VideoComponentDraggable = () => {
  return (
    <img
      src={require(`../../../assets/images/150x150-image-placeholder.jpg`)}
      alt="Image preview"
      width="150"
      height="150"
      style={{
        objectFit: "cover",
        border: "1px solid #ccc",
        borderRadius: 4,
      }}
    />
  );
};

export default VideoComponentDraggable;
