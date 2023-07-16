import React, { Component } from "react";
import axios from "axios";
import Notiflix from "notiflix";

import { BASE_URL, API_KEY, SEARCH_PARAMS } from "./Pixabay/Pixabay";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreButton from "./Button/Button";
import SpinnerLoader from "./Loader/Loader";
import Modal from "./Modal/Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      name: "",
      page: 1,
      showModal: false,
      loading: false,
      largeImageURL: "",
      totalHits: 0,
    };
  }

  componentDidMount() {
   
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.fetchImages();
    }
  }

  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  getValue = ({ name }) => {
    this.setState({
      hits: [],
      name,
      page: 1,
      totalHits: 0,
    });
  };

  fetchImages = () => {
    const { name, page } = this.state;
    this.setState({ loading: true });
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then((response) => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure("No images found!");
          }
          const modifiedHits = response.data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          }));
          this.setState((prevState) => ({
            hits: [...prevState.hits, ...modifiedHits],
            totalHits: response.data.totalHits,
            loading: false,
          }));
        });
    } catch (error) {
      console.error(error.message);
      this.setState({ loading: false });
    }
  };
  
  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const {
      hits,
      showModal,
      loading,
      largeImageURL,
      totalHits,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmitHandler={this.getValue} />

        {hits.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
          </ImageGallery>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} />
        )}

        {loading && <SpinnerLoader />}

        {totalHits > 0 && hits.length < totalHits && (
          <LoadMoreButton onButtonClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
