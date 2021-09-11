import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

const ProgressBar = () => {
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} >
          22% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: '20%' }}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
      >
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
export default ProgressBar;