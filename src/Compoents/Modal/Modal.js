import { React, useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import {
  img_500,
  img_300,
  unavailable,
  unavailableLandscape,
} from "../../config";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Container, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Image from "react-bootstrap/Image";

// import css file
import "./modal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  content_modal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90%",
    height: "auto",
    backgroundColor: "#39445A",
    color: "white",
    boxShadow: "0 0 0 10p #fff",
    borderRadius: "10px",
    height: '90%',
    width:'90%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
  },
}));

export default function ContentModal({ children, id, media_type }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchModal = async () => {

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=8ec65a9de686234cda5ca905a69e7c70&language=en-US`
     );
    setContent(data);
   };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=8ec65a9de686234cda5ca905a69e7c70&language=en-US`
    );
    setVideo(data.results[0]?.key);
    
  };
 
  useEffect(() => {
    fetchModal();
    fetchVideo();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.content_modal}>
            <Container fluid>
              <Row>
                {content && (
                  <>
                    <Col xs={12}  md={12} lg={5}>
                      <div className="poster_path">
                        <Image
                          src={
                            content.poster_path
                              ? `${img_500}/${content.poster_path}`
                              : unavailable
                          }
                          alt={content.name || content.title}
                          thumbnail
                          className="img_poster_500"
                        />

                        <Image
                          src={
                            content.backdrop_path
                              ? `${img_300}/${content.backdrop_path}`
                              : unavailableLandscape
                          }
                          alt={content.name || content.title}
                          className="img_poster_300"
                          thumbnail
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={12} lg={7}>
                      <div className="modal_about">
                        <h1>
                          {content.name || content.title}
                          <span className="modal_data">
                            (
                            {(
                              content.first_air_date ||
                              content.release_date ||
                              "-----"
                            ).substring(0, 4)}
                            )
                          </span>
                        </h1>

                        <p className="modal_tagline">{content.tagline}</p>
                      </div>

                      <div className="overview"> {content.overview}</div>

                      <div className="whtch_at_youtbue">
                        <div>
                          <Carousel id={id} media_type={media_type} />
                        </div>
                          
                        <div className='whtch_trailer'>
                          <Button
                            className='my_btn'
                            variant="contained"
                            color="secondary"
                            href={`https://www.youtube.com/watch?v=${video}`}  target="_blank"
                          >
                             <YouTubeIcon />
                            <span>
                              WATCH THE TRAILER
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </Container>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
 

 