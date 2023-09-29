import React, { Component } from "react";
import "./LoadingIndicator.css"; // Import your CSS file for styling

class LoadingIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      paused: false,
    };
  }

  componentDidMount() {
    this.updateProgress();
  }

  componentWillUnmount() {
    clearTimeout(this.progressTimeout);
  }

  updateProgress = () => {
    if (!this.state.paused) {
      const { progress } = this.state;
      if (progress < 100) {
        this.setState({ progress: progress + 1 }, () => {
          this.progressTimeout = setTimeout(this.updateProgress, 100); 
        });
      }
    }
  };

  pauseIndicator = () => {
    this.setState({ paused: true });
  };

  resumeIndicator = () => {
    this.setState({ paused: false }, () => {
      this.updateProgress();
    });
  };

  resetIndicator = () => {
    this.setState({ progress: 0, paused: false });
  };

  render() {
    const { progress, paused } = this.state;

    return (
      <div className={`loading-indicator ${paused ? "paused" : ""}`}>
        <div className="loader"></div>
        <div className="progress-text">{progress}%</div>
        <div className="controls">
          <button onClick={this.pauseIndicator} disabled={paused}>
            Pause
          </button>
          <button onClick={this.resumeIndicator} disabled={!paused}>
            Resume
          </button>
          <button onClick={this.resetIndicator}>Reset</button>
        </div>
      </div>
    );
  }
}

export default LoadingIndicator;
