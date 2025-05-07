import React, { useState } from "react";

const styles = {
  container: {
    padding: "2rem",
    color: "#fff",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#1e1e2f",
    padding: "2rem",
    borderRadius: "12px",
  },
  label: {
    fontSize: "1rem",
    color: "#ccc",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#2c2c3e",
    color: "#fff",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "10px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
  },
  nftGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    marginTop: "3rem",
  },
  nftCard: {
    width: "250px",
    backgroundColor: "#2a2a3d",
    borderRadius: "12px",
    padding: "1rem",
    color: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  nftImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  nftTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  warningText: {
    color: "#ff7d00",
    fontSize: "1rem",
    marginTop: "1rem",
    fontWeight: "bold",
  },
};

const NftListingPage = () => {
  const [nftName, setNftName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [imageMissing, setImageMissing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageMissing(false);
    }
  };

  const handleSubmit = () => {
    if (!nftName || !description || !price) {
      alert("Please fill out all fields.");
      return;
    }

    const newNFT = {
      name: nftName,
      description,
      price,
      image:
        imagePreview ||
        `https://api.dicebear.com/7.x/pixel-art/svg?seed=${nftName}`,
      id: Date.now(),
    };

    setNfts([...nfts, newNFT]);

    setNftName("");
    setDescription("");
    setPrice("");
    setImageFile(null);
    setImagePreview(null);
    setImageMissing(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create & List Your NFT</h1>

      <div style={styles.form}>
        <label style={styles.label}>NFT Name</label>
        <input
          type="text"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
          placeholder="e.g. Space Ape"
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your NFT"
          style={styles.input}
        />

        <label style={styles.label}>Price (ETH)</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 0.1"
          style={styles.input}
        />

        <label style={styles.label}>Upload Image (Optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />

        {imageMissing && (
          <p style={styles.warningText}>
            No image uploaded. Don't worry, we'll create a default image for you
            based on the NFT name.
          </p>
        )}

        <button style={styles.button} onClick={handleSubmit}>
          List NFT
        </button>
      </div>

      <div style={styles.nftGrid}>
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div key={nft.id} style={styles.nftCard}>
              <img src={nft.image} alt={nft.name} style={styles.nftImage} />
              <h2 style={styles.nftTitle}>{nft.name}</h2>
              <p>{nft.description}</p>
              <p>
                <strong>{nft.price} ETH</strong>
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#ff7d00", textAlign: "center" }}>
            No NFTs listed yet. Add one to see them here!
          </p>
        )}
      </div>
    </div>
  );
};

export default NftListingPage;
