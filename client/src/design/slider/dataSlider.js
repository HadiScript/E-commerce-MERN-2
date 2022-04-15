import { v4 as uuidv4 } from "uuid";
import laptop from '../../images/laptop.jpg'
import mobile from '../../images/mobile.jpg'
import tripod from '../../images/tripod.jpg'
import camera from '../../images/camera.jpg'
import watch from '../../images/watch.jpg'

const dataSlider = [
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    src: laptop
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    src: watch
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    src: mobile
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    src: tripod
  },
  {
    id: uuidv4(),
    title: "Lorem ipsum",
    subTitle: "Lorem",
    src: camera
  },
];

export default dataSlider;