const deleteImage = async (public_id: string, signature: string) => {
  try {
    const response = await fetch("/api/cloudinary/deleteImage", {
        headers: {
          public_id,
          signature,
        },
      }),
      data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }

  // return data;
};

export default deleteImage;
