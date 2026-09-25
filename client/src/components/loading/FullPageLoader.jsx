import { useEffect, useState } from "react";
import "../../style/loader.css";

const loadingSteps = ["Campus feed", "Events", "Messages"];

const progressStates = [
  {
    limit: 38,
    message: "Preparing your space",
    step: 0,
  },
  {
    limit: 72,
    message: "Syncing campus updates",
    step: 1,
  },
  {
    limit: 99,
    message: "Opening conversations",
    step: 2,
  },
  {
    limit: 101,
    message: "Ready to connect",
    step: 3,
  },
];

function FullPageLoader() {
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 100) {
          return 24;
        }

        return Math.min(100, currentProgress + Math.ceil(Math.random() * 5));
      });
    }, 520);

    return () => {
      window.clearInterval(intervalId);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const currentState =
    progressStates.find((state) => progress < state.limit) ??
    progressStates.at(-1);

  return (
    <main
      className="enaa-full-loader"
      aria-labelledby="enaa-full-loader-title"
      aria-busy="true"
    >
      <div className="enaa-full-loader__shell">
        <header className="enaa-full-loader__header">
          <div className="enaa-full-loader__brand" aria-label="EnaaConnect">
            <span className="enaa-full-loader__brand-mark" aria-hidden="true">
              {"</>"}
            </span>

            <span className="enaa-full-loader__brand-name">
              Enaa<span>Connect</span>
            </span>
          </div>

          <div className="enaa-full-loader__status" role="status">
            <span aria-hidden="true" />
            Connecting
          </div>
        </header>

        <section className="enaa-full-loader__content">
          <div className="enaa-full-loader__orbit" aria-hidden="true">
            <span className="enaa-full-loader__ring enaa-full-loader__ring--outer" />
            <span className="enaa-full-loader__ring enaa-full-loader__ring--inner" />
            <span className="enaa-full-loader__dot enaa-full-loader__dot--lime" />
            <span className="enaa-full-loader__dot enaa-full-loader__dot--mist" />
            <span className="enaa-full-loader__core">{"</>"}</span>
          </div>

          <div className="enaa-full-loader__copy">
            <p className="enaa-full-loader__eyebrow">ENAA student network</p>

            <h1 id="enaa-full-loader-title">Connecting your campus.</h1>

            <p>Bringing your feed, events, and conversations together.</p>
          </div>

          <div
            className="enaa-full-loader__progress"
            aria-label="Loading EnaaConnect"
          >
            <div className="enaa-full-loader__progress-labels">
              <span>{currentState.message}</span>
              <span>{progress}%</span>
            </div>

            <div
              className="enaa-full-loader__progress-track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress}
              aria-valuetext={currentState.message}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul
            className="enaa-full-loader__steps"
            aria-label="Content being loaded"
          >
            {loadingSteps.map((step, index) => {
              let stateClassName = "";

              if (index < currentState.step) {
                stateClassName = "is-complete";
              } else if (index === currentState.step) {
                stateClassName = "is-active";
              }

              return (
                <li key={step} className={stateClassName}>
                  <span aria-hidden="true" />
                  {step}
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="enaa-full-loader__footer">
          <p>Made for the ENAA community</p>
          <p>
            connect <span>•</span> learn <span>•</span> build
          </p>
        </footer>
      </div>
    </main>
  );
}

export default FullPageLoader;
