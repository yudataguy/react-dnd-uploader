import React from "react";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    imgPreviews: {},
    files: undefined,
    uploading: false
  };

  setContext = (newState, done) => {
    this.setState(newState, () => {
      if (done) done();
    });
  };

  render() {
    const value = {
      ...this.state,
      setContext: this.setContext
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
