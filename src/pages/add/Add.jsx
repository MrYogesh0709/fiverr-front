import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Add.scss";

const Add = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    if (!e.target[0].value) {
      return;
    }
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    if (!singleFile) {
      alert("Please upload cover image");
      return;
    }
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (
      !state.cat ||
      !state.deliveryTime ||
      !state.desc ||
      !state.price ||
      !state.deliveryTime ||
      !state.shortDesc ||
      !state.shortTitle ||
      !state.title ||
      !state.cover
    ) {
      alert("please fill all fields");
      return;
    }
    mutation.mutate(state);
    navigate("/mygigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange} required>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  required
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>

            <label htmlFor="desc">Description</label>
            <textarea
              required
              name="desc"
              id="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="title">Service Title</label>
            <input
              type="text"
              id="title"
              required
              placeholder="e.g. One-page web design"
              onChange={handleChange}
              name="shortTitle"
            />

            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id="shortDesc"
              required
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>

            <label htmlFor="time">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              id="time"
              name="deliveryTime"
              onChange={handleChange}
            />

            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              id="revisionNumber"
              required
              name="revisionNumber"
              onChange={handleChange}
            />

            <label>Add Features</label>
            <form onSubmit={handleFeature} className="add">
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f, index) => (
                <div className="item" key={index}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURES", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
